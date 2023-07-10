const { User, Item, Account, Transaction, Category } = require('../models');

class PlaidHelpers {
  constructor() {
    this.plaid = require('../config/plaid.js');
  }

  async setTransactions(user_id) {
    const today = new Date();
    try {
      const itemData = await Item.findAll({
        where: {
          user_id: user_id,
        },
        order: [['createdAt', 'DESC']],
      });

      const transactionsData = await this.plaid.transactionsGet(
        {
          access_token: itemData[0].dataValues.access_token,
          start_date: this.formatDate(today, -1),
          end_date: this.formatDate(today),
        },
        {
          count: 250,
          offset: 0,
        }
      );

      const transactions = transactionsData.data.transactions;

      transactions.forEach(async (transaction) => {
        const account = (
          await Account.findOne({
            where: {
              account_id: transaction.account_id,
            },
          })
        ).get({ plain: true });

        const category = (
          await Category.findOne({
            where: {
              category_id: transaction.category_id,
            },
          })
        )?.get({ plain: true });

        await Transaction.create({
          account_id: account.id,
          date: transaction?.date,
          amount: transaction?.amount,
          name: transaction?.name,
          merchant: transaction?.merchant_name,
          category_id: category?.id,
          transaction_id: transaction?.transaction_id,
        });
      });

      return transactions;
    } catch (error) {
      return;
    }
  }

  async getBalance(user_id) {
    try {
      const user = (
        await User.findByPk(user_id, {
          include: [{ model: Item, include: [{ model: Account }] }],
        })
      )?.get({ plain: true });

      let balance = 0;
      user.items.forEach((item) => {
        item.accounts.forEach((account) => {
          const accountBalance = parseInt(account.balance);
          balance += accountBalance;
        });
      });
      return balance;
    } catch (error) {
      return false;
    }
  }

  async setReccuringTransactions(user_id, item_id) {
    const user = await User.findByPk(user_id, {
      include: [
        {
          model: Item,
          where: { item_id: item_id },
          include: [{ model: Account }],
        },
      ],
    });

    if (!user) return false;

    const access_token = user?.items[0]?.access_token;

    const account_ids = user.items[0].accounts.map(
      (account) => account.account_id
    );
    try {
      const recurringTransactions = await this.plaid.transactionsRecurringGet({
        access_token,
        account_ids,
      });

      const { data } = recurringTransactions;

      const formatedTransactions = data?.outflow_streams.map(
        async (transaction) => {
          const account = (
            await Account.findOne({
              where: {
                account_id: transaction.account_id,
              },
            })
          )?.get({ plain: true });

          const category = (
            await Category.findOne({
              where: {
                category_id: transaction.category_id,
              },
            })
          )?.get({ plain: true });

          const transactionData = {
            transaction_id: transaction.transaction_ids[0],
            account_id: account.id,
            amount: transaction.average_amount.amount,
            category_id: category.id,
            date: transaction.last_date,
            name: transaction.description,
            merchant: transaction.merchant_name || transaction.description,
            reccuring: true,
          };
          return transactionData;
        }
      );
      formatedTransactions.forEach(async (transaction) => {
        await Transaction.create(await transaction);
      });

      return true;
    } catch (err) {
      return false;
    }
  }

  formatDate(date, offset = 1) {
    return `${date.getFullYear()}-${(date.getMonth() + offset)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
}

module.exports = new PlaidHelpers();
