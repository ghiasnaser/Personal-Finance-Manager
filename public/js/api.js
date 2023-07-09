class ApiFunctions {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3003/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getTransactions() {
    const { data } = await this.api.get('/transactions');
    return data;
  }

  async getAccounts() {
    const { data } = await this.api.get('/accounts');
    return data;
  }

  async getCategories() {
    const { data } = await this.api.get('/categories');
    return data;
  }

  async getItems() {
    const { data } = await this.api.get('/items');
    return data;
  }

  async loginUser({email, password}) {
    const data = await this.api.post('/users/login', { email, password });
    return data;
  }

  async signupUser({ name, email, password }) {
    const data = await this.api.post('/users/sign-up', {
      name,
      email,
      password,
    });
    return data;
  }

  async logoutUser() {
    const data = await this.api.post('/users/logout');
    return data;
  }

  async getLinkToken() {
    const { data } = await this.api.post('/plaid/get-link-token');
    return data;
  }

  async exchangePublicToken(publicToken, metadata) {
    const { data } = await this.api.post('/plaid/exchange-public-token', {
      public_token: publicToken,
      metadata,
    });
    return data;
  }

  async setAccounts(itemId) {
    const { data } = await this.api.post('/plaid/set-accounts', { itemId });
    return data;
  }

  async setTransactions(itemId) {
    const { data } = await this.api.post('/plaid/set-transactions', { itemId });
    return data;
  }

  async setReccuringTransactions(itemId) {
    const { data } = await this.api.post('/plaid/set-recurring-transactions', {
      itemId,
    });
    return data;
  }

  async getReccuringTransactions() {
    const { data } = await this.api.get('/transactions/reccuring');
    return data;
  }

  async removeItem(itemId) {
    const data = await this.api.delete(`/items/${itemId}`);
    return data;
  }
}

const api = new ApiFunctions();
