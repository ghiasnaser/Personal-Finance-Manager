const router = require('express').Router();
const plaidClient = require('../../config/plaid');
const { Account, User, Item, Transaction, Category } = require('../../models');
const { Products, CountryCode } = require('plaid');

router.post('/set-transactions', async (req, res) => {
  if (!req?.session?.loggedIn) return res.status(401).json('Not logged in');

  const today = new Date();

  try {
    const itemData = await Item.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const transactionsData = await plaidClient.transactionsGet(
      {
        access_token: itemData[0].dataValues.access_token,
        start_date: `${today.getFullYear() - 1}-${today
          .getMonth()
          .toString()
          .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
        end_date: `${today.getFullYear()}-${(today.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
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

    res.json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/set-recurring-transactions', async (req, res) => {
  const { itemId } = req.body;

  const user = (
    await User.findByPk(req?.session?.user?.id, {
      include: [
        {
          model: Item,
          include: [{ model: Account }],
          where: {
            item_id: itemId,
          },
        },
      ],
    })
  )?.get({ plain: true });

  if (!user)
    return res.status(404).json({ message: 'No user found', data: null });

  const access_token = user.items[0].access_token;

  const account_ids = user.items[0].accounts.map(
    (account) => account.account_id
  );

  const recurringTransactions = await plaidClient.transactionsRecurringGet({
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
      // console.log(transactionData);
      return transactionData;
    }
  );
  formatedTransactions.forEach(async (transaction) => {
    await Transaction.create(await transaction);
  });

  res.json('Reccuring transactions created');
});

router.put('/update-accounts', async (req, res) => {
  try {
    const itemData = await Item.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const accountsData = await plaidClient.accountsGet({
      access_token: itemData[0].dataValues.access_token,
    });

    const accounts = accountsData.data.accounts;

    accounts.forEach(async (account) => {
      const updateAccount = await Account.update(
        {
          available: account.balances.available,
          current: account.balances.current,
          limit: account.balances.limit,
          iso_currency_code: account.balances.iso_currency_code,
          unofficial_currency_code: account.balances.unofficial_currency_code,
          name: account.name,
          mask: account.mask,
          official_name: account.official_name,
          item_id: itemData[0].dataValues.id,
          type: account.subtype,
        },
        {
          where: {
            account_id: account.account_id,
          },
        }
      );
      console.log(updateAccount);
    });

    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/set-accounts', async (req, res) => {
  try {
    const itemData = await Item.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
      order: [['createdAt', 'DESC']],
    });

    console.log(itemData[0].dataValues);

    const accountsData = await plaidClient.accountsGet({
      access_token: itemData[0].dataValues.access_token,
    });

    const accounts = accountsData.data.accounts;

    accounts.forEach(async (account) => {
      const createAccount = await Account.create({
        account_id: account?.account_id,
        available: account?.balances?.available,
        current: account?.balances?.current,
        limit: account?.balances?.limit,
        iso_currency_code: account?.balances?.iso_currency_code,
        unofficial_currency_code: account?.balances?.unofficial_currency_code,
        name: account?.name,
        mask: account?.mask,
        official_name: account?.official_name,
        item_id: itemData[0].dataValues.id,
        type: account?.subtype,
      });
      console.log(createAccount);
    });

    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/exchange-public-token', async (req, res) => {
  const { public_token, metadata } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const { access_token, item_id } = response.data;

    await Item.create({
      access_token: access_token,
      item_id: item_id,
      user_id: req?.session?.user?.id,
      institution_id: metadata.institution.institution_id,
      institution_name: metadata.institution.name,
    });

    res.json({ public_token_exchange: 'complete', item_id });
  } catch (error) {
    // handle error
    console.error(error);
  }
});

router.post('/get-link-token', async (req, res) => {
  console.log(req.session);
  const request = {
    user: {
      client_user_id: req?.session?.user?.id + '',
    },
    client_name: 'Fi-Glance',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
    redirect_uri: `https://google.com`,
  };
  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    console.log(response);
    res.json({ linkToken });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
