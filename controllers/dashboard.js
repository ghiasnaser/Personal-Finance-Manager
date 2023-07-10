const router = require('express').Router();
const { authWall } = require('../middleware/auth');
const {
  Account,
  Item,
  Transaction,
  User,
  Budget,
  Goal,
  Category,
} = require('../models');
const plaidHelpers = require('../utils/plaid');

const calculateGoalProgress = async (userId) => {
  // Get the user's saving accounts
  const accounts = await Account.findAll({
    where: {},
    include: [
      {
        model: Item,
        where: { user_id: userId },
        include: [{ model: User }],
      },
    ],
  });
  // Calculate the total amounts in the saving accounts
  var totalAmounts = 0;
  for (var i = 0; i < accounts.length; i++) {
    if (accounts[i].available) {
      var amount = parseFloat(accounts[i].available);
      totalAmounts += amount;
    }
  }
  // Fetch all the goals for the user
  const goals = await Goal.findAll({
    where: { user_id: userId },
    order: [['Deadline', 'ASC']], // Sort the goals by deadline in ascending order
  });
  console.log(goals);
  // Calculate the progress for each goal based on the total amounts
  goals.forEach((goal) => {
    if (totalAmounts > 0 && totalAmounts / goal.target_amount > 1) {
      goal.current_progress = 100;
      totalAmounts -= goal.target_amount;
    } else if (totalAmounts > 0 && totalAmounts / goal.target_amount < 1) {
      goal.current_progress = (totalAmounts / goal.target_amount) * 100;
      totalAmounts = 0;
    } else {
      goal.current_progress = 0;
    }
    // Save the updated progress for the goal
    goal.save();
  });
};

// Use authWall middleware to prevent access to route and renders a page that requests the user to login or sign up

router.use(authWall); // Comment this out to disable authWall and test out pages

// Dashboard subpages
router.get('/', async (req, res) => {
  try {
    // get the budgets of the user
    const currentUser = req.session.user;
    const data1 = await User.findAll({
      where: {
        id: currentUser.id,
      },
      include: { model: Budget },
    });

    const userData = data1.map((user) => {
      return user.get({ plain: true });
    });

    const budegetData = userData[0].budgets;

    // get the goals of the user
    const data2 = await Goal.findAll({
      where: {
        user_id: currentUser.id,
      },
    });
    const goalData = data2.map((goal) => {
      return goal.get({ plain: true });
    });

    // rendering the data
    res.render('dashboard/index', {
      budgets: budegetData,
      goals: goalData,
    });
  } catch (error) {
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
router.use('/transactions', async (req, res) => {
  const user = await User.findByPk(req?.session?.user?.id, {
    include: [
      {
        model: Item,
        include: [
          {
            model: Account,
            include: [{ model: Transaction, include: [{ model: Category }] }],
          },
        ],
      },
    ],
  });

  const transactions = user.items
    .map((item) => {
      return item.accounts.map((account) => {
        return account.transactions.map((transaction) => {
          return transaction.get({ plain: true });
        });
      });
    })
    .flat(2);

  const ordered = transactions.sort((a, b) => a.date - b.date);

  ordered.forEach((transaction) => {
    transaction.date = new Date(transaction.date)
      .toLocaleDateString()
      .slice(0, -5);
  });

  const groupByDate = {};

  ordered.forEach((transaction) => {
    if (!groupByDate[transaction.date]) {
      groupByDate[transaction.date] = [];
    }
    groupByDate[transaction.date].push(transaction);
  });

  const groupByCategory = {};

  ordered.forEach((transaction) => {
    const hierarchy = transaction.category?.hierarchy
      ? JSON.parse(transaction.category?.hierarchy)
      : ['Uncategorized'];
    if (!groupByCategory[hierarchy[0]]) {
      groupByCategory[hierarchy[0]] = [];
    }
    groupByCategory[hierarchy[0]].push(transaction);
  });

  const categoryLabels = Object.keys(groupByCategory);

  const categoryGroups = Object.values(groupByCategory).map((category, i) => {
    return {
      title: categoryLabels[i],
      transactions: category,
      precentage: category.length / transactions.length,
    };
  });

  const dates = Object.keys(groupByDate);
  const amounts = Object.values(groupByDate).map(
    (transactions) => transactions.length
  );
  const amountsCash = Object.values(groupByDate).map(
    (transactions) =>
      transactions.reduce((a, b) => a + parseInt(b.amount), 0) / 100
  );

  res.render('dashboard/transactions', {
    transactions: ordered,
    dates,
    amounts,
    amountsCash,
    categoryGroups,
  });
});

// recurring page for viewing recurring transactions
router.use('/recurring', async (req, res) => {
  try {
    const data = await User.findByPk(req?.session?.user?.id, {
      include: [
        {
          model: Item,
          include: [
            {
              model: Account,
              include: [
                {
                  model: Transaction,
                  where: { reccuring: true },
                  include: [{ model: Category }],
                },
              ],
            },
          ],
        },
      ],
    });

    const user = data.get({ plain: true });

    user.items.forEach((item) => {
      item.accounts.forEach((account) => {
        account.transactions.forEach((transaction) => {
          transaction.categories = JSON.parse(transaction.category.hierarchy);
        });
      });
    });

    res.render('dashboard/recurring', { user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// goals page for viewing goals
router.post('/goals', async (req, res) => {
  try {
    const currentUser = req.session.user;
    const { goal_name, deadline } = req.body;
    const targetAmount = parseFloat(req.body.target_amount);
    // Create a new goal with the provided data and associate it with the current user
    const newGoal = await Goal.create({
      Deadline: deadline,
      target_amount: targetAmount,
      goal_name: goal_name,
      current_progress: 0,
      user_id: currentUser.id,
    });
    await calculateGoalProgress(currentUser.id);
    // Send a success response
    res.status(200).json({ message: 'New goal created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create a new goal' });
  }
});

module.exports = router;
