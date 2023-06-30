const { Category } = require('../models');

const categoryData = [
    {
        "name": "Dining out"
    },
    {
        "name": "Rent"
    }, 
    {
        "name": "Entertainment"
    }, 
    {
        "name": "Savings"
    },
    {
        "name": "Groceries"
    },
    {
        "name": "Coffee Takeout"
    }
]

const seedCategories = async () => await Category.bulkCreate(categoryData);

module.exports = seedCategories;