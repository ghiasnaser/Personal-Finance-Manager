const { Transaction } = require('../models');

const transactionData = [
  {
    date: '2023-06-01',
    amount: 100.5,
    name: 'Grocery shopping',
    transaction_id: '1234567890',
    merchant: "Trader Joe's",
    account_id: 1,
    category_id: 5,
  },
  {
    date: '2023-06-05',
    amount: 50.75,
    name: 'Dinner at a restaurant',
    transaction_id: '123456780',
    merchant: 'PF Changs',
    account_id: 2,
    category_id: 1,
  },
  {
    date: '2023-06-10',
    amount: 200.0,
    name: 'Online shopping',
    merchant: 'Amazon',
    transaction_id: '12345670',
    account_id: 3,
    category_id: 3,
  },
  {
    date: '2023-07-10',
    amount: 20.0,
    name: 'coffee drive thru',
    transaction_id: '1234560',
    merchant: 'Starbucks',
    account_id: 4,
    category_id: 6,
  },
  {
    date: '2023-07-05',
    transaction_id: '123450',
    amount: 35.0,
    name: 'yoga class',
    merchant: 'Orange theory fitness',
    account_id: 5,
    category_id: 3,
  },
  {
    date: '2023-07-03',
    amount: 800.0,
    transaction_id: '12340',
    name: 'Rent',
    merchant: 'Brittan Property Management',
    account_id: 6,
    category_id: 2,
  },
];

const seedTransactions = async () =>
  await Transaction.bulkCreate(transactionData);

module.exports = seedTransactions;
