require('dotenv').config();
const { Configuration, PlaidEnvironments, PlaidApi } = require('plaid');

module.exports = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET_SANDBOX,
        'Plaid-Version': '2020-09-14',
      },
    },
  })
);
