const router = require('express').Router();

// Setting up the auth routes (login, sign-up)
router.use(require('./auth'));

// Setting up the API routes
router.use('/api', require('./api'));

// Setting up the dashboard routes
router.use('/dashboard', require('./dashboard'));

// Setting up the home route
router.use('^/$|index(.html)?', async (req, res) => {
  console.log(req.session);
  res.render('home');
});

// Setting up the Catch-All route
router.use('*', async (req, res) => {
  res.render('404', { layout: 'solo' });
});

module.exports = router;
