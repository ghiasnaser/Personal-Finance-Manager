const apiRouter = require('express').Router();

// Setting up the API routes

// Adding User Routes to : /api/users
apiRouter.use('/users', require('./userRoutes.js'));

// Adding Account Routes to : /api/accounts
apiRouter.use('/accounts', require('./accountRoutes.js'));

module.exports = apiRouter;
