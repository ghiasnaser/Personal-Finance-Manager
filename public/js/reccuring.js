document.addEventListener('DOMContentLoaded', async () => {
  const data = JSON.parse(localStorage.getItem('recurringError'));
  if (data) {
    try {
      await api.setReccuringTransactions(data.item_id);
      localStorage.removeItem('recurringError');
      location.reload();
    } catch (err) {
      localStorage.setItem(
        'recurringError',
        JSON.stringify({ value: true, item_id: data.item_id })
      );
    }
  }
});
