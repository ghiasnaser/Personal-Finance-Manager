const router = require('express').Router();
const { authWall } = require('../middleware/auth');
const { Account, Item, Transaction, User, Budget, Goal } = require('../models');
const { Products, CountryCode } = require('plaid');
const plaidClient = require('../config/plaid');

// Use authWall middleware to prevent access to route and renders a page that requests the user to login or sign up

router.use(authWall); // Comment this out to disable authWall and test out pages

// Dashboard subpages
router.get('/', async (req, res) => {
  try{
    // get the budgets of the user
    const currentUser = req.session.user;
    const data1=await User.findAll({
      where:{
        id: currentUser.id
      },
      include:{model:Budget},
    });
    const userData= data1.map((user)=>{
      return user.get({plain:true})
    });
    const budegetData=userData[0].budgets;

    // get the goals of the user
    const data2=await Goal.findAll({
      where:{
        user_id: currentUser.id
      },
    });
    const goalData= data2.map((goal)=>{
      return goal.get({plain:true})
    });

    // rendering the data
    res.render('dashboard/index',{
      budgets: budegetData,
      goals:goalData,
    });
  }
  catch (error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
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
router.post('/goals', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const { goal_name, deadline } = req.body;
    console.log(req.body);
    console.log('-----------------------------------------');
    console.log(goal_name);
    const targetAmount = parseFloat(req.body.target_amount);
    // Create a new goal with the provided data and associate it with the current user
    const newGoal = await Goal.create({
      deadline: deadline,
      target_amount: targetAmount,
      goal_name: goal_name,
      current_progress:0,
      user_id: currentUser.id,
    });

    // Send a success response
    res.status(200).json({ message: 'New goal created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create a new goal' });
  }
});


module.exports = router;
