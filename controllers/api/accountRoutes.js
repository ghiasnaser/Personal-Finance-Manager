const accountRouter = require('express').Router();
const { Account, Transactions } = require('../../models');
const withAuth = require('../../middleware/auth');

accountRouter
  .route('/')
  // Getting all accounts for a user
  .get(withAuth, async (req, res) => {
    const user = req.session.user;
    const accounts = await Account.findAll({
      where: { user_id: user.id },
      include: { model: Transactions },
      attributes: { exclude: [''] },
    });
    const plainAccounts = accounts.map((account) =>
      account.get({ plain: true })
    );
    res.json(plainAccounts);
  })
  // Creating a new account
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
accountRouter
  .route('/:id')
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