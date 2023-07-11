const router = require('express').Router();
const { Budget,Expenses,Transaction,Category,sequelize  } = require('../../models');


  // Route to get all transactions related to a budget for the current user
router.get('/budgets/:budgetId/transactions', async (req, res) => {
  try {
    // Get the current user ID from the session or authentication middleware
    const userId = req.session.user.id; // Adjust this based on your authentication setup

    // Get the budget ID from the request parameters
    const budgetId = req.params.budgetId;

    // Find the budget belonging to the current user
   /* const budget = await Budget.findAll({
      where: { id: budgetId, user_id: userId },
      include: {
        model: Transaction,
        through: Expenses,
        include: Category,
      },
    });*/
    const transactions = await Transaction.findAll({
      include: [
        {
          model: Budget,
          through: { attributes: [] }, // Exclude join table attributes
          where: { id: budgetId }, // Filter by current budget ID
          required: true, // Perform an inner join
        },
      ],
    });
    if (!transactions) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.json(transactions);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
  
router.get('/', async (req, res) => {
    try {
        const userData = await Expenses.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await Expenses.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No expenses with this id!' });
            return;
          }
          res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => {
    try {
        const userData = await Expenses.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const userData = await Expenses.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No expenses with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const userData = await Expenses.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: 'No expenses with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;