const { Expenses } = require('../models');
const expenseData = [
  {
    budget_id: 1,
    transaction_id: 1,
  },
  {
    budget_id: 2,
    transaction_id: 2,
  },
  {
    budget_id: 3,
    transaction_id: 3,
  },
  {
    budget_id: 4,
    transaction_id: 4,
  },
  {
    budget_id: 5,
    transaction_id: 5,
  },
  {
    budget_id: 6,
    transaction_id: 6,
  },
];

const seedExpenses = async () => await Expenses.bulkCreate(expenseData);

module.exports = seedExpenses;
