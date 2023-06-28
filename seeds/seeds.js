const sequelize = require('../config/connection');
const UserSeed = require('../seeds/userData.json');
const AccountSeed = require('../seeds/accountData.json');
const BudgetSeed = require('../seeds/budgetData.json');
const CategorySeed = require('../seeds/categoryData.json');
const ExpensesSeed = require('../seeds/expensesData.json');
const GoalSeed = require('../seeds/goalData.json');
const TransactionSeed = require('../seeds/transactionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    // Seed each model separately
    await UserSeed();
    await AccountSeed();
    await BudgetSeed();
    await CategorySeed();
    await ExpensesSeed();
    await GoalSeed();
    await TransactionSeed();

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }

  process.exit(0);
};

seedDatabase();