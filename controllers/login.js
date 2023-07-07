const router = require('express').Router();

router.get('/login', async (req, res) => {
  res.render('form', { layout: 'solo', login: true });
});

module.exports = router;
