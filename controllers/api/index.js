const apiRouter = require('express').Router();

apiRouter.use('/users',require('./userRoutes.js'));

module.exports = apiRouter;