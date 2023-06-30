const router = require('express').Router();
const { authWall } = require('../middleware/auth');

// Use authWall middleware to prevent access to route and renders a page that requests the user to login or sign up
router.use(authWall);

// Main dashboard page
router.use('/', async (req, res) => {
  res.render('dashboard');
});

// Dashboard subpages

// accounts page for adding and viewing accounts
router.use('/accounts', (req, res) => {
  res.render('dashboard/accounts');
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
