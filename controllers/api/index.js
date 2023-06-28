const apiRouter = require('express').Router();

apiRouter.use('/users', require('./userRoutes.js'));
apiRouter.use('/accounts', require('./accountRoutes.js'));

module.exports = apiRouter;
