const Item = require('../models/Items');

const itemData = [
  {
    user_id: 1,
    access_token: 'access-sandbox-9f0b7b6e-1b9e-4f2e-9e1e-1b0e7e7e7e7e',
    item_id: 'zQbAqdjkg5UmBznj9nd6i4ZMKn8Q4EUv1KN3V',
    institution_id: 'ins_109508',
  },
  {
    user_id: 2,
    access_token: 'access-sandbox-9f0b7b6e-1b9e-4f2e-9e1e-2b0e7e7e7e7e',
    item_id: 'zQbAqdjkg5UmBznj9nd6i4ZMKn8Q2l3k4j43',
    institution_id: 'ins_109508',
  },
  {
    user_id: 3,
    access_token: 'access-sandbox-9f0b7b6e-1b9e-4f2e-9e1e-3b0e7e7e7e7e',
    item_id: 'zQbAqdjkg5UmBznj9nd6i4ZMKn82341234kdf',
    institution_id: 'ins_109508',
  },
  {
    user_id: 4,
    access_token: 'access-sandbox-9f0b7b6e-1b9e-4f2e-9e1e-4b0e7e7e7e7e',
    item_id: 'zQbAqdjkg5UmBznj9nd6i4ZM1234qwe4rfisdu',
    institution_id: 'ins_109508',
  },
];

const seedItems = async () => await Item.bulkCreate(itemData);

module.exports = seedItems;
