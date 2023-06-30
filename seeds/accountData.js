const { Account } = require('../models');

const accountData = [
    {
        "account_name": "Bank of America",
        "account_type": "Checking",
        "user_id": 1
    },
    {
        "account_name": "Wells Fargo",
        "account_type": "Savings",
        "user_id": 2
    },
    {
        "account_name": "School Financial Credit Union",
        "account_type": "Investment",
        "user_id": 3
    },
    {
        "account_name": "Chase Bank",
        "account_type": "Savings",
        "user_id": 4
    },
    {
        "account_name": "Citibank",
        "account_type": "Investment",
        "user_id": 5
    },
    {
        "account_name": "U.S. Bank",
        "account_type": "Checking",
        "user_id": 6
    }

]

const seedAccounts = async () => await Account.bulkCreate(accountData);

module.exports = seedAccounts;