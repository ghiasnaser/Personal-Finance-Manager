const apiRouter = require('express').Router();

// Setting up the API routes

apiRouter.use('/plaid', require('./plaid.js'));

// Adding User Routes to : /api/users
apiRouter.use('/users', require('./userRoutes.js'));

// Adding Account Routes to : /api/accounts
apiRouter.use('/accounts', require('./accountRoutes.js'));

apiRouter.use('/categories', require('./categoriesRoutes.js'));

apiRouter.use('/transactions', require('./transactionRoutes.js'));


apiRouter.use('/categories', require('./categoriesRoutes.js'));

apiRouter.use('/transactions', require('./transactionRoutes.js'));

apiRouter.use('/items', require('./itemRoutes.js'));

module.exports = apiRouter;
