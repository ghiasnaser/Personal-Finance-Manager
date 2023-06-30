const router = require('express').Router();
const plaidClient = require('../../config/plaid');
const { Products, CountryCode } = require('plaid');

router.get('/get-access-token', async (req, res) => {
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  // FOR DEMO PURPOSES ONLY
  // Store access_token in DB instead of session storage
  req.session.save(() => {
    req.session.access_token = exchangeResponse.data.access_token;

    res.status(200).json(true);
  });
});

router.post('/get-link-token', async (req, res) => {
  const request = {
    user: {
      client_user_id: req?.session?.user?.id || 'NateAyye',
    },
    client_name: 'Fi-Glance',
    products: [Products.Transactions],
    country_codes: [CountryCode.Us],
    language: 'en',
    redirect_uri: `https://google.com`,
  };
  try {
    const response = await plaidClient.linkTokenCreate(request);
    console.log(response);
    const linkToken = response.data.link_token;
    res.json({ linkToken });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
