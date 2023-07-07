const { Category } = require('../models');
const plaidClient = require('../config/plaid');

const getPlaidCategories = async () => {
  const categories = await plaidClient.categoriesGet({});
  const categoryData = categories.data.categories.map((category) => {
    category.type = category.group;
    delete category.group;
    category.hierarchy = JSON.stringify(category.hierarchy);
    return category;
  });
  return categoryData;
};

const seedCategories = async () =>
  await Category.bulkCreate(await getPlaidCategories());

module.exports = seedCategories;
