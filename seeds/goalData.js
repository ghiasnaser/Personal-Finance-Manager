const { Goal } = require('../models');

const goalSeeds = [
  {
    Deadline: '2023-06-01',
    target_amount: 5000,
    goal_name: 'Vacation Fund',
    current_progress: 2500,
    user_id: 1,
  },
  {
    Deadline: '2023-07-01',
    target_amount: 10000,
    goal_name: 'Education Fund',
    current_progress: 500,
    user_id: 2,
  },
  {
    Deadline: '2023-07-04',
    target_amount: 8000,
    goal_name: 'Emergency Fund',
    current_progress: 2500,
    user_id: 3,
  },
  {
    Deadline: '2023-03-13',
    target_amount: 1500,
    goal_name: 'Christmas Fund',
    current_progress: 8,
    user_id: 4,
  },
  {
    Deadline: '2023-04-16',
    target_amount: 1000,
    goal_name: 'Birthday Gifts Fund',
    current_progress: 200,
    user_id: 5,
  },
  {
    Deadline: '2023-01-01',
    target_amount: 200000,
    goal_name: 'Investment Property Fund',
    current_progress: 25000,
    user_id: 6,
  },
];

const seedGoals = async () => await Goal.bulkCreate(goalSeeds);

module.exports = seedGoals;
