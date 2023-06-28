const authRouter = require('express').Router();

authRouter.get('/login', async (req, res) => {
  res.render('form', { layout: 'solo', login: true });
});

authRouter.get('/register', async (req, res) => {
  res.render('form', { layout: 'solo', register: true });
});

module.exports = authRouter;
