const User = require('./User');
const Account = require('./Accounts');
const Budget = require('./Budgets');
const Category = require('./Categories');
const Expenses = require('./Expenses');
const Goal = require('./Goals');
const Transaction = require('./Transactions');

// User - Account relation is one to many
User.hasMany(Account, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Account.belongsTo(User, {
  foreignKey: 'user_id',
});

// Account - Transaction relation is one to many
Account.hasMany(Transaction, {
  foreignKey: 'account_id',
  onDelete: 'CASCADE',
});

Transaction.belongsTo(Account, {
  foreignKey: 'account_id',
});

// Category - Transaction relation is one to many
Category.hasMany(Transaction, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

Transaction.belongsTo(Category, {
  foreignKey: 'category_id',
});

// User - Budget relation is one to many
User.hasMany(Budget, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Budget.belongsTo(User, {
  foreignKey: 'user_id',
});

// Budget - Transaction relation is many to many
Budget.belongsToMany(Transaction, {
  through: Expenses,
  foreignKey: 'budget_id',
});
Transaction.belongsToMany(Budget, {
  through: Expenses,
  foreignKey: 'transaction_id',
});

// User - Budget relation is one to many
User.hasMany(Goal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Goal.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Account,
  Budget,
  Category,
  Expenses,
  Goal,
  Transaction,
};
