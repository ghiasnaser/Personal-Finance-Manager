const apiRouter = require('express').Router();

// Setting up the API routes

apiRouter.use('/plaid', require('./plaid.js'))

// Adding User Routes to : /api/users
apiRouter.use('/users', require('./userRoutes.js'));

// Adding Account Routes to : /api/accounts
apiRouter.use('/accounts', require('./accountRoutes.js'));

// Adding Expenses Routes to : /api/expenses
apiRouter.use('/expense', require('./expensesRoute.js'));

apiRouter.use('/goals', require('./goalRoutes.js'));

module.exports = apiRouter;
