const router = require('express').Router();
const { authWall } = require('../middleware/auth');
const { Account, Item, Transaction } = require('../models');

// Use authWall middleware to prevent access to route and renders a page that requests the user to login or sign up

router.use(authWall); // Comment this out to disable authWall and test out pages

// Dashboard subpages
router.get('/', async (req, res) => {
  res.render('dashboard');
});

// accounts page for adding and viewing accounts
router.get('/accounts', async (req, res) => {
  try {
    // Get all items for the user
    const itemsData = await Item.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
      include: [{ model: Account, include: [{ model: Transaction }] }],
    });
    // Serialize data so the template can read it
    const items = itemsData.map((item) => item.get({ plain: true }));

    res.render('dashboard/accounts', { items });
  } catch (err) {
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
