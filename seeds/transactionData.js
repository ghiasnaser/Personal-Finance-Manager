const { Transaction } = require('../models');

const transactionData = [
  {
    date: '2023-06-01',
    amount: 100.5,
    description: 'Grocery shopping',
    merchant: "Trader Joe's",
    account_id: 1,
    category_id: 5,
  },
  {
    date: '2023-06-05',
    amount: 50.75,
    description: 'Dinner at a restaurant',
    merchant: 'PF Changs',
    account_id: 2,
    category_id: 1,
  },
  {
    date: '2023-06-10',
    amount: 200.0,
    description: 'Online shopping',
    merchant: 'Amazon',
    account_id: 3,
    category_id: 3,
  },
  {
    date: '2023-07-10',
    amount: 20.0,
    description: 'coffee drive thru',
    merchant: 'Starbucks',
    account_id: 4,
    category_id: 6,
  },
  {
    date: '2023-07-05',
    amount: 35.0,
    description: 'yoga class',
    merchant: 'Orange theory fitness',
    account_id: 5,
    category_id: 3,
  },
  {
    date: '2023-07-03',
    amount: 800.0,
    description: 'Rent',
    merchant: 'Brittan Property Management',
    account_id: 6,
    category_id: 2,
  },
];

const seedTransactions = async () =>
  await Transaction.bulkCreate(transactionData);


module.exports = seedTransactions;