const router = require('express').Router();

// Routes for rendering the login and sign-up forms
router.get('/sign-up', async (req, res) => {
  res.render('form', { layout: 'solo', signUp: true });
});

module.exports = router;
