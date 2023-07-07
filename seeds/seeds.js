const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedCategories = require('./categoryData');
const seedExpenses = require('./expensesData');
const seedBudgets = require('./budgetData');
const seedTransactions = require('./transactionData');
const seedGoals = require('./goalData');
const seedAccounts = require('./accountData');
const seedItems = require('./itemsData');

(async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedItems();
  await seedAccounts();
  await seedCategories();
  await seedBudgets();
  await seedTransactions();
  await seedExpenses();
  await seedGoals();
  process.exit(0);
})();
