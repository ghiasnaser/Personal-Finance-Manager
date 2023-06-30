const router = require('express').Router();
const { authWall } = require('../middleware/auth');
const { Account } = require('../models');
const { Products, CountryCode } = require('plaid');
const plaidClient = require('../config/plaid');

// Use authWall middleware to prevent access to route and renders a page that requests the user to login or sign up

router.use(authWall); // Comment this out to disable authWall and test out pages

// Dashboard subpages
router.get('/', async (req, res) => {
  res.render('dashboard');
});

// accounts page for adding and viewing accounts
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
    });
    res.render('dashboard/accounts', { accounts });
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
