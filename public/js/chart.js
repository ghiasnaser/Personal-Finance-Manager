//const bugetsLengthEL =document.getElementById('budget_length');
//const length=bugetsLengthEL.innerHTML;
async function fetchBudgets() {
  const budgets = await fetch(`api/budgets`);
  const budgetArr = await budgets.json();
  return budgetArr;
}

async function fetchExpenses(id) {
  try {
    const response = await fetch(`/api/expense/budgets/${id}/transactions`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }

    const transactions = await response.json();
    //const transactions = data.transactions;

    var spending = [];
    for (var j = 0; j < transactions.length; j++) {
      spending.push(transactions[j].amount);
    }

    return spending;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

async function drawChart() {
  var budegts = await fetchBudgets();
  for (var i = 0; i < budegts.length; i++) {
    budgetID = budegts[i].id;
    const spending = await fetchExpenses(budgetID);
    const ctx = document.getElementById(`myChart-${budgetID}`);
    const startDateParts = document
      .getElementById(`start-${budgetID}`)
      .textContent.replace('Starting Date:', '')
      .trim()
      .split('/');
    const startDate = new Date(
      `${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`
    );
    const endDateParts = document
      .getElementById(`end-${budgetID}`)
      .textContent.replace('Ending Date:', '')
      .trim()
      .split('/');
    const endDate = new Date(
      `${endDateParts[2]}-${endDateParts[0]}-${endDateParts[1]}`
    );
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const amount = document
      .getElementById(`amount-${budgetID}`)
      .textContent.replace('Budget Amount: $', '')
      .trim();
    const budgetLeft = amount - spending;
    // Generate labels array representing each day within the date range
    const start = 1;
    const end = duration;
    const labels = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    let stepSize;
    if (amount / 100000 > 1 && amount / 100000 < 10) {
      stepSize = 100000;
    } else if (amount / 10000 > 1 && amount / 10000 < 10) {
      stepSize = 10000;
    } else if (amount / 1000 > 1 && amount / 1000 < 10) {
      stepSize = 1000;
    } else if (amount / 100 > 1 && amount / 100 < 10) {
      stepSize = 100;
    } else if (amount / 10 > 1 && amount / 10 < 10) {
      stepSize = 10;
    } else {
      stepSize = 1;
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Budget Amount',
            data: [{ x: duration, y: amount }],
            borderWidth: 1,
            fill: false,
          },
          {
            type: 'line',
            label: 'Budget Left',
            data: [{ x: duration, y: budgetLeft }],
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            beginAtZero: true,
            title: {
              display: true,
              text: `Duration (in days): ${duration} days`,
            },
            ticks: {
              stepSize: 1,
              precision: 0,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: `Budget Amount (${amount})`,
            },
            ticks: {
              stepSize: stepSize,
              precision: 0,
            },
          },
        },
      },
    });
  }
}

drawChart();
