const bugetsLengthEL =document.getElementById('budget_length');
const length=bugetsLengthEL.innerHTML;
async function fetchExpenses(id){
    const response= await fetch(`/api/expense/budget/${id}/amount-spent`,{
    method: 'GET',
    });
    const data= await response.json()
    const transactions=data.transactions;
    console.log(transactions);   
    var spending=[];
    for (var j=0;j<transactions.length;j++){
        spending.push(transactions[j].amount);
    }
    console.log(spending);
    return spending;
}

for (var i=1 ; i<=length;i++){
    const spending=fetchExpenses(i);
    console.log(spending);
    const ctx = document.getElementById(`myChart-${i}`);
    const startDateParts = document.getElementById(`start-${i}`).textContent.replace('Starting Date:', '').trim().split('/');
    const startDate = new Date(`${startDateParts[2]}-${startDateParts[0]}-${startDateParts[1]}`);
    const endDateParts = document.getElementById(`end-${i}`).textContent.replace('Ending Date:', '').trim().split('/');
    const endDate = new Date(`${endDateParts[2]}-${endDateParts[0]}-${endDateParts[1]}`);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const amount = document.getElementById(`amount-${i}`).textContent.replace('Budget Amount: $', '').trim();
    const budgetLeft=amount-spending;
    // Generate labels array representing each day within the date range
    const start=1;
    const end=duration;
    const labels = Array.from({ length: end - start+1 }, (_, index) => start + index);
    let stepSize;
    if ((amount/100000)>1 && (amount/100000)<10) {
        stepSize = 100000;
    } else if ((amount/10000)>1 && (amount/10000)<10) {
        stepSize = 10000;
    } else if ((amount/1000)>1 && (amount/1000)<10) {
        stepSize = 1000;
    } else if ((amount/100)>1 && (amount/100)<10) {
        stepSize = 100;
    } else if ((amount/10)>1 && (amount/10)<10) {
        stepSize = 10;
    } else {
        stepSize = 1;
    }

    new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
        label: 'Budget Amount',
        data: [{ x: duration, y: amount }],
        borderWidth: 1,
        fill: false
        },
        {
            label: 'Budget Left',
            data: [{ x: duration, y: budgetLeft }],
            borderWidth: 1,
            fill: false,
        }
    ]
    },
    options: {
        scales: {
        x: {
            type: 'linear',
            beginAtZero: true,
            title: {
            display: true,
            text: `Duration (in days): ${duration} days`
            },
            ticks: {
            stepSize: 1,
            precision: 0
            }
        },
        y: {
            beginAtZero: true,
            title: {
            display: true,
            text: `Budget Amount (${amount})`
            },
            ticks: {
                stepSize: stepSize,
                precision: 0
            }
        }
        }
    }
    });

}




const ctx = document.getElementById(`myChart`);


 new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        type: 'bar',
        label: '# of Votes',
        data: [12, 40, 3, 5, 2, 3],
        borderWidth: 1
      }, {
        type: 'line',
        label: '# of Points',
        data: [12, 40, 3, 5, 2, 3],
        tension: 0.3,
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });