const authRouter = require('express').Router();

authRouter.get('/login', async (req, res) => {
  res.render('form', { layout: 'form', login: true });
});

authRouter.get('/register', async (req, res) => {
  res.render('form', { layout: 'form', register: true });
});

module.exports = authRouter;
