const accountRouter = require('express').Router();
const { Account, Transaction } = require('../../models');
const { withAuth } = require('../../middleware/auth');

// Account Router for the base URL: /api/accounts
accountRouter
  .route('/')
  // Getting all accounts for a user
  .get(withAuth, async (req, res) => {
    try{
    const user = req.session.user;
    const accounts = await Account.findAll({
      where: { user_id: user.id },
      include: { model: Transaction },
      attributes: { exclude: [''] },
      //group: ['account_name'],
    });
    const plainAccounts = accounts.map((account) =>
      account.get({ plain: true })
    );
    console.log(plainAccounts);
   /* res.render('dashboard/index', {
      ...plainAccounts,
      logged_in: true
    });*/
   res.json(plainAccounts);
  }catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to fetch accounts' });
    }
  })
  // Creating a new account for a user
  .post(withAuth, async (req, res) => {
    try {
      const newAccount = await Account.create({
        ...req.body,
        user_id: req.session.user.id,
      });
      res
        .status(200)
        .json({ message: 'New Account Created', data: newAccount });
    } catch (err) {
      res.status(400).json({ message: 'Could Not Create Account', error: err });
    }
  });

// Account Router for the base URL: /api/accounts/:id
accountRouter
  .route('/:id')
  // Getting a single account
  .get(withAuth, async (req, res) => {
    try {
      const account = await Account.findByPk(req.params.id, {
        include: { model: Transactions },
      });
      res.status(200).json({ message: 'Account Found', data: account });
    } catch (err) {
      res.status(400).json({ message: 'Could Not Find Account', error: err });
    }
  })
  // Updating a single account for a user
  .put(withAuth, async (req, res) => {
    try {
      const updatedAccount = await Account.update(req.body, {
        where: { id: req.params.id },
      });
      res
        .status(200)
        .json({ message: 'Account Updated', data: updatedAccount });
    } catch (err) {
      res.status(400).json({ message: 'Could Not Update Account', error: err });
    }
  })
  // Deleting a single account for a user
  .delete(withAuth, async (req, res) => {
    try {
      const deletedAccount = await Account.destroy({
        where: { id: req.params.id },
      });
      res
        .status(200)
        .json({ message: 'Account Deleted', data: deletedAccount });
    } catch (err) {
      res.status(400).json({ message: 'Could Not Delete Account', error: err });
    }
  });

module.exports = accountRouter;
