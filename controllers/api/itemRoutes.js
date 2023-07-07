const itemRouter = require('express').Router();
const plaidClient = require('../../config/plaid');
const { Item } = require('../../models');

itemRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const items = await Item.findAll();
      res.json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(async (req, res) => {
    try {
      const { publicToken, metadata } = req.body;

      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });

      const { access_token, item_id } = response.data;

      const newItem = await Item.create({
        institution_id: metadata.institution.institution_id,
        institution_name: metadata.institution.name,
        access_token: access_token,
        item_id: item_id,
        user_id: req.session.user.id,
      });

      res.json(newItem);
    } catch (err) {
      res.status(500).json(err);
    }
  });

itemRouter.route('/:id').get(async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
}).delete(async (req, res) => {
  try {
    const item = await Item.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(item);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = itemRouter;
