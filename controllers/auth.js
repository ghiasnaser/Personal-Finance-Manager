const authRouter = require('express').Router();

// Routes for rendering the login and sign-up forms
authRouter.get('/sign-up', async (req, res) => {
  console.log(req.session);
  res.render('form', { layout: 'solo', signUp: true });
});

authRouter.get('/login', async (req, res) => {
  console.log(req.session);
  res.render('form', { layout: 'solo', login: true });
});

module.exports = authRouter;
