const router = require('express').Router();

router.use('^/$|index(.html)?', async (req, res) => {
  res.render('home');
});

module.exports = router;
