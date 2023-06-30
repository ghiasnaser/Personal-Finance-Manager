const { Budget } = require('../models');
const budgetData = [
  {
    start_date: '2023-07-01',
    end_date: '2023-07-31',
    amount: 500,
    user_id: 1,
  },
  {
    start_date: '2023-07-01',
    end_date: '2023-07-31',
    amount: 800,
    user_id: 2,
  },
  {
    start_date: '2023-07-01',
    end_date: '2023-09-01',
    amount: 1000,
    user_id: 3,
  },
  {
    start_date: '2023-07-01',
    end_date: '2023-012-31',
    amount: 2000,
    user_id: 4,
  },
  {
    start_date: '2023-07-01',
    end_date: '2023-07-31',
    amount: 100,
    user_id: 5,
  },
  {
    start_date: '2023-07-01',
    end_date: '2023-07-15',
    amount: 50,
    user_id: 6,
  },
];

const seedBudgets = async () => await Budget.bulkCreate(budgetData);

module.exports = seedBudgets;