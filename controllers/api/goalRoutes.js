const router = require('express').Router();
const { Goal } = require('../../models');
const moment = require('moment');

router.delete('/:id', async (req, res) => {
try {
    const goalId = req.params.id;
console.log('goal id');
console.log(goalId);
    // Find the goal by ID
    const goal = await Goal.findByPk(goalId);

    // Check if the goal exists
    if (!goal) {
    return res.status(404).json({ error: 'Goal not found' });
    }
    //console.log(goal);
    // Delete the goal
    await goal.destroy();
    
    // Send a success response
    res.sendStatus(204);
} catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ error: 'Failed to delete goal' });
}
});

router.put('/:id', async (req, res) => {
try {
    const goalId = req.params.id;
    const updatedGoalData = req.body;
    // Find the goal by ID
    const goal = await Goal.findByPk(goalId);
    // Check if the goal exists
    if (!goal) {
    return res.status(404).json({ error: 'Goal not found' });
    }

    // Update the goal with the new data
    await goal.update(updatedGoalData);
    // Send the updated goal as the response
    res.json(goal);
} catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Failed to update goal' });
}
});

router.get('/:id', async (req, res) => {
    try {
      const goalId = req.params.id;
  
      // Find the goal by ID
      const goal = await Goal.findByPk(goalId);
  
      // Check if the goal exists
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      // Format the deadline date
    const formattedDeadline = moment(goal.deadline).format('MM/DD/YYYY');
    console.log(formattedDeadline);
    console.log('formattedDeadline');

    // Update the goal object with the formatted deadline
    const formattedGoal = {
      ...goal.toJSON(),
      deadline: formattedDeadline,
    };

    res.json(formattedGoal);
      // Send the goal as the response
      //res.json(goal);
    } catch (error) {
      console.error('Error fetching goal:', error);
      res.status(500).json({ error: 'Failed to fetch goal' });
    }
});

module.exports = router;
