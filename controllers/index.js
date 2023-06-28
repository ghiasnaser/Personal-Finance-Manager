const router = require('express').Router();

router.use(require('./auth'));

router.use('/dashboard', async (req, res) => {
  res.render('dashboard')
});

router.use('^/$|index(.html)?', async (req, res) => {
  res.render('home');
});

router.use('*', async (req, res) => {
  res.render('404', { layout: 'solo' });
});

module.exports = router;
