const router = require('express').Router();
const Transactions = require('../../models/Transactions');

router.get('/', async (req, res) => {
    try {
        const userData = await Transactions.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await Transactions.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'No transactions with this id!' });
            return;
          }
          res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', async (req, res) => {
    try {
        const userData = await Transactions.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const userData = await Transactions.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No transactions with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const userData = await Transactions.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: 'No transactions with this id!' });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;