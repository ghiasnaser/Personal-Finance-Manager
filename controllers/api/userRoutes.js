const userRouter = require('express').Router();
const { User,Goal,Account,Item } = require('../../models');
const plaidHelpers = require('../../utils/plaid');
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


userRouter.route('/login').post(async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect Email. Please Sign Up' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    calculateGoalProgress(userData.id);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect Password' });
      return;
    }

    try {
      const updateAccounts = await plaidHelpers.updateAccounts(
        userData.dataValues.id
      );
    } catch (error) {
    }

    req.session.save((err) => {
      if (err) {
        res.status(500).json({ message: 'Error Saving Session' });
        return;
      }
      const user = userData.get({ plain: true });
      delete user.password;
      req.session.user = user;
      req.session.loggedIn = true;
      res.status(200).json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'Incorrect Email or Password' });
  }
});

userRouter.route('/logout').post(async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

userRouter.route('/sign-up').post(async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      const user = newUser.get({ plain: true });
      delete user.password;
      req.session.user = user;
      req.session.loggedIn = true;
      res.status(200).json({ message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'Could Not Create User', error: err });
  }
});

userRouter
  .route('/')
  .get(async (req, res) => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    const usersPlain = users.map((user) => user.get({ plain: true }));
    res
      .status(200)
      .json({ message: 'Collection of all Users', data: usersPlain });
  })
  .post(async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      const usersPlain = newUser.get({ plain: true });
      res.status(200).json({ message: 'New User Created!!', data: usersPlain });
    } catch (err) {
      res.status(400).json({ message: 'Could Not Create User', error: err });
    }
  });

userRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      // Find a user by its `id` value
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
      });
      // If no user is found, return an error
      if (!user) {
        res.status(404).json({ message: 'No User Found With This ID' });
        return;
      }
      // Otherwise, return the data for the requested user
      const userPlain = user.get({ plain: true });
      res.status(200).json({ message: 'User Found!!', data: userPlain });
    } catch (err) {
      // If there is an error, return the error
      res.status(400).json({ message: 'Could Not Create User', error: err });
    }
  })
  .put(async (req, res) => {
    try {
      // Update a user by its `id` value
      const updatedUser = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      // If no user is found, return an error
      if (!updatedUser) {
        res.status(404).json({ message: 'No User Found With This ID' });
        return;
      }
      // Otherwise, return the data for the updated user
      const userPlain = updatedUser.get({ plain: true });
      res.status(200).json({ message: 'User Updated!!', data: userPlain });
    } catch (err) {
      // If there is an error, return the error
      res.status(400).json({ message: 'Could Not Update User', error: err });
    }
  })
  .delete(async (req, res) => {
    try {
      // Delete a user by its `id` value
      const deletedUser = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      // If no user is found, return an error
      if (!deletedUser) {
        res.status(404).json({ message: 'No User Found With This ID' });
        return;
      }
      // Otherwise, return the data for the deleted user
      const userPlain = deletedUser.get({ plain: true });
      res.status(200).json({ message: 'User Deleted!!', data: userPlain });
    } catch (err) {
      // If there is an error, return the error
      res.status(400).json({ message: 'Could Not Delete User', error: err });
    }
  });

module.exports = userRouter;
