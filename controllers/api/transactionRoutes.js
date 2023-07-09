const router = require('express').Router();

const sequelize = require('../../config/connection');
const devRouteBlocker = require('../../middleware/devRouteBlocker');
const { Transaction, User, Item, Account } = require('../../models');

router.get('/reccuring', async (req, res) => {
  try {
    const data = await User.findByPk(req?.session?.user?.id, {
      include: [
        {
          model: Item,
          include: [
            {
              model: Account,
              include: [{ model: Transaction, where: { reccuring: true } }],
            },
          ],
        },
      ],
    });

    const user = data.get({ plain: true });

    const reccuringTransactions = [];

    user.items.forEach((item) => {
      item.accounts.forEach((account) => {
        account.transactions.forEach((transaction) => {
          if (transaction.reccuring) reccuringTransactions.push(transaction);
        });
      });
    });

    res.status(200).json(reccuringTransactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Routes For Testing

router.get('/', devRouteBlocker, async (req, res) => {
  try {
    const transactionData = await Transaction.findAll();
    res.status(200).json(transactionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
