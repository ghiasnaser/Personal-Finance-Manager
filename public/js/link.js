const initLink = async () => {
  const handler = Plaid.create({
    token: (await api.getLinkToken()).linkToken,
    onLoad: function () {},
    onSuccess: async (publicToken, metadata) => {
      const { item_id } = await api.exchangePublicToken(publicToken, metadata);

      // Set All Accounts to the database
      await api.setAccounts(item_id);

      // Set All Transactions to the database
      await api.setTransactions(item_id);

      try {
        await api.setReccuringTransactions(item_id);
      } catch (err) {
        localStorage.setItem(
          'recurringError',
          JSON.stringify({ value: true, item_id: item_id })
        );
        // alert('Error setting recurring transactions. try again later');
      }

      document.location.reload();
    },
    onEvent: (eventName, metadata) => {},
    onExit: (error, metadata) => {},
  });
  handler.open();
};

document.addEventListener('DOMContentLoaded', function () {
  const dialog = document.querySelector('#remove-bank-dialog');
  const cancelButton = dialog.querySelector('#cancel-dialog');
  const removeButton = dialog.querySelector('#remove-bank');

  cancelButton.addEventListener('click', () => {
    dialog.close();
  });

  removeButton.addEventListener('click', async (e) => {
    const itemId = e.target.dataset.itemId;
    const response = await api.removeItem(itemId);

    if (response) {
      window.location.reload();
    }
  });

  document.querySelectorAll('.remove-account-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const itemId = e.target.dataset.itemId;
      document.querySelector('#remove-bank').dataset.itemId = itemId;
      dialog.showModal();
    });
  });

  document
    .getElementById('new-account-button')
    .addEventListener('click', initLink);
});
