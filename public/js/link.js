// Retrieves balance information
const getBalance = async function () {
  const response = await fetch('/api/plaid/get-accounts', {
    method: 'POST',
  });

  const data = await response.json();

  //Render response data
  const pre = document.getElementById('response');
  pre.textContent = JSON.stringify(data, null, 2);
  pre.style.background = '#F6F6F6';
};

const initLink = async () => {
  const handler = Plaid.create({
    token: (await api.getLinkToken()).linkToken,
    onLoad: function () {},
    onSuccess: async (publicToken, metadata) => {
      // console.log('Success:', publicToken, metadata);
      const { item_id } = await api.exchangePublicToken(publicToken, metadata);

      await api.setAccounts(item_id);

      await api.setTransactions(item_id);

      try {
        await api.setReccuringTransactions(item_id);
      } catch (err) {
        alert('Error setting recurring transactions. try again later');
        // console.log(err);
      }
      // await api.setReccuringTransactions(item_id)

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
    console.log(response);
    if (response) {
      window.location.reload();
    }
  });

  document
    .getElementById('new-account-button')
    .addEventListener('click', initLink);

  document.querySelectorAll('.remove-account-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      const itemId = e.target.dataset.itemId;
      document.querySelector('#remove-bank').dataset.itemId = itemId;
      dialog.showModal();
    });
  });
});
