const router = require('express').Router();

router.use(require('./auth'));

router.use('^/$|index(.html)?', async (req, res) => {
  res.render('home');
});

module.exports = router;
