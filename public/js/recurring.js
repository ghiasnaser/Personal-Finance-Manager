(async () => {
  const transactions = await api.setReccuringTransactions(
    'rnejDXy4NzfqlPJv7k1lc4voGRdbLjilBAeWq'
  );
  console.log(transactions);
})();
