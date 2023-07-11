const router = require('express').Router();
const Budget = require('../../models/Budgets');
const User =require('../../models/User');

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

    res.json(budegetData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});


// GET route for retrieving a specific budget
router.get('/:id', async (req, res) => {
    try {
      const budgetId = req.params.id;
      const user_id = req.session.user.id;
  
      // Find the budget by ID and user ID
      const budget = await Budget.findOne({
        where: {
          id: budgetId,
          user_id: user_id,
        },
      });
  
      // Check if the budget exists
      if (!budget) {
        return res.status(404).json({ error: 'Budget not found' });
      }
  
      // Send the budget as the response
      res.json(budget);
    } catch (error) {
      console.error('Error retrieving budget:', error);
      res.status(500).json({ error: 'Failed to retrieve budget' });
    }
  });
  

router.post('/', async (req, res) => {
    try {
        // Extract the budget data from the request body
        const { name,start_date, end_date, amount } = req.body;
       // const currentUser = req.session.user;
       const user_id = req.session.user.id;
        // Create a new budget object
        const newBudget = await Budget.create({
          name,
          start_date,
          end_date,
          amount,
          user_id,
        });
        // Send the newly created budget as the response
        res.status(201).json(newBudget);
      } catch (error) {
        console.error('Error adding budget:', error);
        res.status(500).json({ error: 'Failed to add budget' });
      }
});

// PUT route for deleting a budget
router.put('/:id', async (req, res) => {
    try {
      const budgetId = req.params.id;
      const user_id = req.session.user.id;
      const updatedBudgetData = req.body;
  
      // Find the budget by ID and user ID
      const budget = await Budget.findOne({
        where: {
          id: budgetId,
          user_id: user_id,
        },
      });
  
      // Check if the budget exists
      if (!budget) {
        return res.status(404).json({ error: 'Budget not found' });
      }
  
      // Update the budget with the new data
      await budget.update(updatedBudgetData);
  
      // Send the updated budget as the response
      res.json(budget);
    } catch (error) {
      console.error('Error updating budget:', error);
      res.status(500).json({ error: 'Failed to update budget' });
    }
  });

// DELETE route for deleting a budget
router.delete('/:id', async (req, res) => {
    try {
      const budgetId = req.params.id;
      const user_id = req.session.user.id;
  
      // Find the budget by ID and user ID
      const budget = await Budget.findOne({
        where: {
          id: budgetId,
          user_id: user_id,
        },
      });
  
      // Check if the budget exists
      if (!budget) {
        return res.status(404).json({ error: 'Budget not found' });
      }
  
      // Delete the budget
      await budget.destroy();
  
      // Send a success message as the response
      res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
      console.error('Error deleting budget:', error);
      res.status(500).json({ error: 'Failed to delete budget' });
    }
  });
  

module.exports = router;