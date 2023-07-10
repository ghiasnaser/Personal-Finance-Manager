const router = require('express').Router();
const plaidClient = require('../../config/plaid');
const { Account, User, Item, Transaction, Category } = require('../../models');
const { Products, CountryCode } = require('plaid');
const plaidHelpers = require('../../utils/plaid');

router.post('/set-transactions', async (req, res) => {
  if (!req?.session?.loggedIn) return res.status(401).json('Not logged in');

  const transactions = await plaidHelpers.setTransactions(
    req?.session?.user?.id
  );
  if (!transactions)
    return res.status(500).json({ message: 'Error setting transactions' });

  res.json(transactions);
});

router.post('/set-recurring-transactions', async (req, res) => {
  const { itemId } = req.body;
  const { id } = req?.session?.user;

  const setReccuringTransactions = await plaidHelpers.setReccuringTransactions(
    id,
    itemId
  );

  if (!setReccuringTransactions)
    return res.status(500).json({ message: 'Error setting transactions' });

  res.json('Reccuring transactions created');
});

router.put('/update-accounts', async (req, res) => {
  try {
    const itemData = await Item.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const accountsData = await plaidClient.accountsGet({
      access_token: itemData[0].dataValues.access_token,
    });

    const accounts = accountsData.data.accounts;

    accounts.forEach(async (account) => {
      const updateAccount = await Account.update(
        {
          available: account.balances.available,
          current: account.balances.current,
          limit: account.balances.limit,
          iso_currency_code: account.balances.iso_currency_code,
          unofficial_currency_code: account.balances.unofficial_currency_code,
          name: account.name,
          mask: account.mask,
          official_name: account.official_name,
          item_id: itemData[0].dataValues.id,
          type: account.subtype,
        },
        {
          where: {
            account_id: account.account_id,
          },
        }
      );
    });

    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/set-accounts', async (req, res) => {
  try {
    const itemData = await Item.findAll({
      where: {
        user_id: req?.session?.user?.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const accountsData = await plaidClient.accountsGet({
      access_token: itemData[0].dataValues.access_token,
    });

    const accounts = accountsData.data.accounts;

    accounts.forEach(async (account) => {
      const createAccount = await Account.create({
        account_id: account?.account_id,
        available: account?.balances?.available,
        current: account?.balances?.current,
        limit: account?.balances?.limit,
        iso_currency_code: account?.balances?.iso_currency_code,
        unofficial_currency_code: account?.balances?.unofficial_currency_code,
        name: account?.name,
        mask: account?.mask,
        official_name: account?.official_name,
        item_id: itemData[0].dataValues.id,
        type: account?.subtype,
      });
    });

    res.json(accounts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/exchange-public-token', async (req, res) => {
  const { public_token, metadata } = req.body;
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const { access_token, item_id } = response.data;

    await Item.create({
      access_token: access_token,
      item_id: item_id,
      user_id: req?.session?.user?.id,
      institution_id: metadata.institution.institution_id,
      institution_name: metadata.institution.name,
    });

    res.json({ public_token_exchange: 'complete', item_id });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/get-link-token', async (req, res) => {
  const request = {
    user: {
      client_user_id: req?.session?.user?.id + '',
    },
    client_name: 'Fi-Glance',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
    redirect_uri: `https://secret-wave-14791-042522c892db.herokuapp.com`,
  };
  try {
    const response = await plaidClient.linkTokenCreate(request);
    console.log(response);
    const linkToken = response.data.link_token;
    res.json({ linkToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
