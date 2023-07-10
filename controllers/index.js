const router = require('express').Router();
const { isLoggedIn } = require('../middleware/auth');

// Setting up the API routes
router.use('/api', require('./api'));

// Setting up the dashboard routes
router.use('/dashboard', require('./dashboard'));

// Routes for rendering the login and sign-up forms
router.get('/login', isLoggedIn, async (req, res) => {
  res.render('form', { layout: 'solo', login: true });
});

router.get('/sign-up', isLoggedIn, async (req, res) => {
  res.render('form', { layout: 'solo', signUp: true });
});
router.use('/about', async (req, res) => {
  res.render('about');
});

// Setting up the home route
router.use('^/$|index(.html)?', async (req, res) => {
  res.render('home');
});

// Setting up the Catch-All route
router.use('*', async (req, res) => {
  res.render('404', { layout: 'solo' });
});

module.exports = router;
