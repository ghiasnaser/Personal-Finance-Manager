const router = require('express').Router();
const { authWall } = require('../middleware/auth');
const { Account } = require('../models');
const { Products, CountryCode } = require('plaid');
const plaidClient = require('../config/plaid');

// Use authWall middleware to prevent access to route and renders a page that requests the user to login or sign up

// router.use(authWall); // Comment this out to disable authWall and test out pages

// Dashboard subpages

const testAccounts = [
  {
    id: 1,
    account_id: 'zQbAqdjkg5UmBznj9nd6i4ZMKn8Q4EUv1KN3V',
    balances: {
      available: 77.03,
      current: 100.42,
      iso_currency_code: 'USD',
      limit: null,
      unofficial_currency_code: null,
    },
    mask: '3027',
    name: 'EVERYDAY CHECKING ...3027',
    official_name: 'EVERYDAY CHECKING ...3027',
    subtype: 'checking',
    type: 'depository',
  },
];

router.get('/', async (req, res) => {
  res.render('dashboard');
});

// accounts page for adding and viewing accounts
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.findAll({
      where: {
        user_id: req?.session?.user?.id || 0,
      },
    });
    res.render('dashboard/accounts', { accounts: testAccounts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


// transactions page for viewing transactions (By category / date range)
router.use('/payments', (req, res) => {
  res.render('dashboard/payments');
});

// recurring page for viewing recurring transactions
router.use('/recurring', (req, res) => {
  res.render('dashboard/recurring');
});

// goals page for viewing goals
router.use('/goals', (req, res) => {
  res.render('dashboard/goals');
});

module.exports = router;
