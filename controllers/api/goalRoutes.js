const router = require('express').Router();
const { Goal,Account ,Item,User} = require('../../models');
const moment = require('moment');

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
  var totalAmounts=0;
  for (var i=0;i<accounts.length;i++){
    if(accounts[i].available){
      var amount=parseFloat(accounts[i].available);
      totalAmounts+=amount;
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
    if (totalAmounts>0 && (totalAmounts / goal.target_amount)>1){
      goal.current_progress=100;
      totalAmounts-=goal.target_amount;
    }
    else if (totalAmounts>0 && (totalAmounts / goal.target_amount)<1){
      goal.current_progress=(totalAmounts / goal.target_amount)*100;
      totalAmounts=0;
    }
    else{
      goal.current_progress=0;
    }
    // Save the updated progress for the goal
    goal.save();
  });
};

router.delete('/:id', async (req, res) => {
try {
    const goalId = req.params.id;
    const userId = req.session.user.id;
    // Find the goal by ID
    const goal = await Goal.findByPk(goalId);

    // Check if the goal exists
    if (!goal) {
    return res.status(404).json({ error: 'Goal not found' });
    }
    //console.log(goal);
    // Delete the goal
    await goal.destroy();
    await calculateGoalProgress(userId);
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
    const userId = req.session.user.id;
    // Find the goal by ID
    const goal = await Goal.findByPk(goalId);
    // Check if the goal exists
    if (!goal) {
    return res.status(404).json({ error: 'Goal not found' });
    }

    // Update the goal with the new data
    await goal.update(updatedGoalData);
    // Calculate the goal progress
    await calculateGoalProgress(userId);
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
      console.log(goal);
      // Check if the goal exists
      if (!goal) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      // Format the deadline date
    const formattedDeadline = moment(goal.Deadline).format('MM/DD/YYYY');
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
