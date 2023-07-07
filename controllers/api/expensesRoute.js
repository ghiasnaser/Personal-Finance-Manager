const router = require('express').Router();
const { Budget,Expenses,Transaction,sequelize  } = require('../../models');


// Route to get the amount spent on a specific budget
router.get('/budget/:id/amount-spent', async (req, res) => {
  try {
    const budgetId = req.params.id;
    console.log(budgetId);

    // Find the budget by ID
    const budget = await Budget.findByPk(budgetId, {
      include: [
        {
          model: Transaction,
          through: Expenses,
        },
      ],
    });
    const sanitizedBudget = {
      ...budget.dataValues,
      transactions: budget.transactions.map(transaction => transaction.dataValues)
    };
    console.log(sanitizedBudget);
    if (!budget) {
      return res.status(404).json({ error: 'no transcation founded under this budget' });
    }
    return res.json(budget);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to calculate amount spent on budget' });
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