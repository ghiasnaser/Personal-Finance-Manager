const apiRouter = require('express').Router();

// Setting up the API routes

apiRouter.use('/plaid', require('./plaid.js'));

// Adding User Routes to : /api/users
apiRouter.use('/users', require('./userRoutes.js'));

// Adding Account Routes to : /api/accounts
apiRouter.use('/accounts', require('./accountRoutes.js'));

apiRouter.use('/categories', require('./categoriesRoutes.js'));

apiRouter.use('/transactions', require('./transactionRoutes.js'));

apiRouter.use('/items', require('./itemRoutes.js'));

apiRouter.use('/budgets', require('./budgetRoutes.js'));
apiRouter.use('/goals', require('./goalRoutes.js'));
apiRouter.use('/expense', require('./expensesRoute.js'));


module.exports = apiRouter;
