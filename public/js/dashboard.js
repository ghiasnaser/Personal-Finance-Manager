
// Get references to the buttons
const budgetingBtn = document.getElementById("Budgeting");
//const expenseTrackingBtn = document.getElementById("Expense_Tracking");
const goalSettingBtn = document.getElementById("Goal_Setting");
//const incomeTrackingBtn = document.getElementById("Income_Tracking");
//const reportsAndAnalyticsBtn = document.getElementById("Reports_and_Analytics");
//const remindersAndNotificationsBtn = document.getElementById("Reminders_and_Notifications");
const addBudgetBtn=document.getElementById("add_budget");
// Get references to the sections
const budgetingSection = document.getElementById("Budgeting_Section");
//const expenseTrackingSection = document.getElementById("Expense_Tracking_Section");
const goalSettingSection = document.getElementById("Goal_Setting_Section");
//const incomeTrackingSection = document.getElementById("Income_Tracking_Section");
//const reportsAnalyticsSection = document.getElementById("Reports_Analytics_Section");
//const remindersNotificationsSection = document.getElementById("Reminders_Notifications_Section");

function showbudget(){
  budgetingSection.classList.remove("hidden");
  //expenseTrackingSection.classList.add("hidden");
  goalSettingSection.classList.add("hidden");
  //incomeTrackingSection.classList.add("hidden");
  //reportsAnalyticsSection.classList.add("hidden");
  //remindersNotificationsSection.classList.add("hidden");

}
/*function showexpenses(){
  budgetingSection.classList.add("hidden");
  expenseTrackingSection.classList.remove("hidden");
  goalSettingSection.classList.add("hidden");
  incomeTrackingSection.classList.add("hidden");
  reportsAnalyticsSection.classList.add("hidden");
  remindersNotificationsSection.classList.add("hidden");

}*/
function showgoals(){
  budgetingSection.classList.add("hidden");
  //expenseTrackingSection.classList.add("hidden");
  goalSettingSection.classList.remove("hidden");
  //incomeTrackingSection.classList.add("hidden");
  //reportsAnalyticsSection.classList.add("hidden");
  //remindersNotificationsSection.classList.add("hidden");

}
/*function showincome(){
  budgetingSection.classList.add("hidden");
  expenseTrackingSection.classList.add("hidden");
  goalSettingSection.classList.add("hidden");
  incomeTrackingSection.classList.remove("hidden");
  reportsAnalyticsSection.classList.add("hidden");
  remindersNotificationsSection.classList.add("hidden");

}
function showreport(){
  budgetingSection.classList.add("hidden");
  expenseTrackingSection.classList.add("hidden");
  goalSettingSection.classList.add("hidden");
  incomeTrackingSection.classList.add("hidden");
  reportsAnalyticsSection.classList.remove("hidden");
  remindersNotificationsSection.classList.add("hidden");

}
function showreminder(){
  budgetingSection.classList.add("hidden");
  expenseTrackingSection.classList.add("hidden");
  goalSettingSection.classList.add("hidden");
  incomeTrackingSection.classList.add("hidden");
  reportsAnalyticsSection.classList.add("hidden");
  remindersNotificationsSection.classList.remove("hidden");

}*/

// Add click event listeners to the buttons
budgetingBtn.addEventListener("click", () => {
  showbudget();
  // Save the active section to local storage
  localStorage.setItem("activeSection", "budgetingSection");
});
/*
expenseTrackingBtn.addEventListener("click", () => {
  showexpenses();
  // Save the active section to local storage
  localStorage.setItem("activeSection", "expenseTrackingSection");
});*/

goalSettingBtn.addEventListener("click", () => {
  showgoals();
  // Save the active section to local storage
  localStorage.setItem("activeSection", "goalSettingSection");
});
/*
incomeTrackingBtn.addEventListener("click", () => {
  showincome();
  // Save the active section to local storage
  localStorage.setItem("activeSection", "incomeTrackingSection");
});

reportsAndAnalyticsBtn.addEventListener("click", () => {
  showreport();
  // Save the active section to local storage
  localStorage.setItem("activeSection", "reportsAnalyticsSection");
});

remindersAndNotificationsBtn.addEventListener("click", () => {
  showreminder();
  // Save the active section to local storage
  localStorage.setItem("activeSection", "remindersNotificationsSection");
});
*/
const activeSection = localStorage.getItem("activeSection");
window.addEventListener('load', function(){
if (activeSection) {
  switch (activeSection) {
    case "budgetingSection":
      showbudget();
      break;
    //case "expenseTrackingSection":
      //showexpenses();
      //break;
    case "goalSettingSection":
      showgoals();
      break;
 //   case "incomeTrackingSection":
   //   showincome();
     // break;
//    case "reportsAnalyticsSection":
  //    showreport();
    //  break;
//    case "remindersNotificationsSection":
  //    showreminder();
    //  break;
    default:
  }
}

});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


// adding goal to the user goals
// Function to handle form submission
async function addGoal(event) {
  event.preventDefault();
  // Get form values
  const goalName = document.getElementById('goalName').value;
  const targetAmount = document.getElementById('targetAmount').value;
  const deadline = document.getElementById('goal-deadline').value;

  // Create a new goal object
  const newGoal = {
    deadline: new Date(deadline),
    target_amount: targetAmount,
    goal_name: goalName,
  };
  newGoal.deadline.setDate(newGoal.deadline.getDate()+1);
  try {
    // Send a POST request to the server to add the new goal
    const response = await fetch('/dashboard/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    });

    if (response.ok) {
      // Reload the page after adding the goal
      location.reload();
    } else {
      console.error('Failed to add goal');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Add an event listener to the form submit event
const form = document.getElementById('addGoalForm');
form.addEventListener('submit', addGoal);

// function for deleting a goal
async function deleteGoal(goalId) {
  // Perform the delete request to the server using the goalId
  try {
    const response = await fetch(`/api/goals/${goalId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Handle the success response
      console.log('Goal deleted successfully');
      location.reload();
      // Perform any additional actions, such as updating the UI
    } else {
      // Handle the error response
      console.error('Failed to delete goal');
    }
  } catch (error) {
    console.error('Error deleting goal:', error);
  }
}

document.addEventListener('click', async (event) => {
  if (event.target.matches('.delete-goal-btn')) {
    const goalId = event.target.dataset.goalId;
    deleteGoal(goalId);
  }
  else if (event.target.matches('.edit-goal-btn')) {
    const goalId = event.target.dataset.goalId;
    editGoal(goalId);
  }
});

async function fetchGoalData(goalId) {
  const response = await fetch(`/api/goals/${goalId}`);
  if (response.ok) {
    console.log(response);
    console.log(typeof response);
    const goalData = await response.json();
    const updatedGoalData = {
      ...goalData,
    };
    return updatedGoalData;
  } else {
    throw new Error('Failed to fetch goal data');
  }
}

async function updateGoal(goalId, updatedGoalData) {
  try {
    const response = await fetch(`/api/goals/${goalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGoalData),
    });
    if (response.ok) {
      location.reload();
    } else {
      console.error('Failed to update goal');
    }
  } catch (error) {
    console.error('Error updating goal:', error);
  }
}

function createInpute(id, label, value) {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.value = value; 
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  const container = document.createElement('div');
  container.appendChild(labelElement);
  container.appendChild(input);
  return container;
}

function createInpute(id, label, value) {
  const container = document.createElement('div');
  container.className = 'mb-4';
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.className = 'block text-gray-700 font-bold mb-2';
  labelElement.textContent = label;
  container.appendChild(labelElement);
  const input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.value = value;
  input.className = 'border border-gray-300 rounded px-4 py-2 w-full';
  container.appendChild(input);

  return container;
}


function displayEditForm(goalData) {
  // Get the existing goal data
  const { id, goal_name, target_amount, deadline } = goalData;

  // Create the form element
  const form = document.createElement('form');
  form.id = 'editGoalForm';
  form.className = 'bg-white rounded p-4';
 
  // Create and append the Goal Name input
  const goalNameLabel = document.createElement('label');
  goalNameLabel.textContent = 'Goal Name:';
  const goalNameInput = document.createElement('input');
  goalNameInput.type = 'text';
  goalNameInput.value = goal_name;
  goalNameInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(goalNameLabel);
  form.appendChild(goalNameInput);

  // Create and append the Target Amount input
  const targetAmountLabel = document.createElement('label');
  targetAmountLabel.textContent = 'Target Amount:';
  const targetAmountInput = document.createElement('input');
  targetAmountInput.type = 'text';
  targetAmountInput.value = target_amount;
  targetAmountInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(targetAmountLabel);
  form.appendChild(targetAmountInput);

  // Create and append the Deadline input
  const deadlineLabel = document.createElement('label');
  deadlineLabel.textContent = 'Deadline:';
  const deadlineInput = document.createElement('input');
  deadlineInput.type = 'date';
  const formattedDeadline = formatDate(new Date(deadline));
  deadlineInput.value = formattedDeadline;
  deadlineInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(deadlineLabel);
  form.appendChild(deadlineInput);

  // Create the submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Update Goal';
  submitButton.className = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2'; // Add `mr-2` for right margin
  form.appendChild(submitButton);

  // Create the cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.className = 'bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4'; // Adjust the class based on your desired styling
  form.appendChild(cancelButton);

  // Append form to the popup window
  const popupWindow = document.getElementById('editGoalpopupWindow');
  popupWindow.innerHTML = '';
  popupWindow.appendChild(form);
  // Show the popup window
  popupWindow.classList.remove('hidden');
  // Set up event listener for form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Get the updated goal data from the form inputs
    const updatedGoalData = {
      Deadline: new Date(deadlineInput.value),
      target_amount: targetAmountInput.value,
      goal_name: goalNameInput.value,
    };
    updatedGoalData.Deadline.setDate(updatedGoalData.Deadline.getDate()+1);
    // Call a function to update the goal data on the server
    await updateGoal(id, updatedGoalData);

    // Close the popup window
    popupWindow.classList.add('hidden');
  });
  // Add event listener to the cancel button
  cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Hide the form
    popupWindow.classList.add('hidden');
  });
}

// function for editing a goal
async function editGoal(goalId) {
  const goalData = await fetchGoalData(goalId);
  displayEditForm(goalData);
}

function addBudgetForm() {
  
  // Create the form element
  const form = document.createElement('form');
  form.id = 'addBudgetForm';
  form.className = 'bg-white rounded p-4';

  // Create and append the Goal Name input
  const budgetNameLabel = document.createElement('label');
  budgetNameLabel.textContent = 'Budget Name:';
  const budgetNameInput = document.createElement('input');
  budgetNameInput.type = 'text';
  budgetNameInput.value = "";
  budgetNameInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(budgetNameLabel);
  form.appendChild(budgetNameInput);

  // Create and append the Start Date input
  const startDateLabel = document.createElement('label');
  startDateLabel.textContent = 'Start Date:';
  const startDateInput = document.createElement('input');
  startDateInput.type = 'date';
  startDateInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(startDateLabel);
  form.appendChild(startDateInput);

  // Create and append the End Date input
  const endDateLabel = document.createElement('label');
  endDateLabel.textContent = 'End Date:';
  const endDateInput = document.createElement('input');
  endDateInput.type = 'date';
  endDateInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(endDateLabel);
  form.appendChild(endDateInput);
  
  // Create and append the Amount input
  const amountLabel = document.createElement('label');
  amountLabel.textContent = 'Amount:';
  const amountInput = document.createElement('input');
  amountInput.type = 'text';
  amountInput.value = '';
  amountInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(amountLabel);
  form.appendChild(amountInput);

  // Create the submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Add Budget';
  submitButton.className = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4';
  form.appendChild(submitButton);

  // Create the cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.className = 'bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4'; // Adjust the class based on your desired styling
  form.appendChild(cancelButton);

  // Append form to the popup window
  const popupWindow = document.getElementById('BudgetpopupWindow');
  popupWindow.innerHTML = '';
  popupWindow.appendChild(form);
  // Show the popup window
  popupWindow.classList.remove('hidden');
  // Set up event listener for form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Get the updated goal data from the form inputs
    const budgetData = {
      name: budgetNameInput.value,
      start_date: new Date(startDateInput.value),
      end_date: new Date(endDateInput.value),
      amount: amountInput.value,
    };
    budgetData.start_date.setDate(budgetData.start_date.getDate() + 1);
    budgetData.end_date.setDate(budgetData.end_date.getDate()+1);
    // Call a function to update the goal data on the server
    await addBudget(budgetData);

    // Close the popup window
    popupWindow.classList.add('hidden');
  });
   // Add event listener to the cancel button
   cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Hide the form
    popupWindow.classList.add('hidden');
  });
}


async function addBudget(budgetData){
  try {
    const response = await fetch(`/api/budgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(budgetData),
    });
    if (response.ok) {
      location.reload();
    } else {
      console.error('Failed to update goal');
    }
  } catch (error) {
    console.error('Error updating goal:', error);
  }
}

async function deleteBudget(budgetID){
    // Perform the delete request to the server using the goalId
    try {
      const response = await fetch(`/api/budgets/${budgetID}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        // Handle the success response
        console.log('Goal deleted successfully');
        location.reload();
        // Perform any additional actions, such as updating the UI
      } else {
        // Handle the error response
        console.error('Failed to delete goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }  
}

async function updateBudget(budgetId, updatedBudgetData){
  try {
    const response = await fetch(`/api/budgets/${budgetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBudgetData),
    });
    if (response.ok) {
      location.reload();
    } else {
      console.error('Failed to update Budget');
    }
  } catch (error) {
    console.error('Error updating Budget:', error);
  }
}

async function fetchBudgetData(budgetID) {
  const response = await fetch(`/api/budgets/${budgetID}`);
  if (response.ok) {
    const budgetData = await response.json();
    const updatedBudgetData = {
      ...budgetData,
    };
    return updatedBudgetData;
  } else {
    throw new Error('Failed to fetch goal data');
  }
}

async function editBudgetForm(budgetData){
  // Get the existing goal data
  const { id, name, start_date, end_date ,amount  } = budgetData;

  // Create the form element
  const form = document.createElement('form');
  form.id = 'editBudgetForm';
  form.className = 'bg-white rounded p-4';

  // Create and append the Goal Name input
  const budgetNameLabel = document.createElement('label');
  budgetNameLabel.textContent = 'Budget Name:';
  const budgetNameInput = document.createElement('input');
  budgetNameInput.type = 'text';
  budgetNameInput.value = name;
  budgetNameInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(budgetNameLabel);
  form.appendChild(budgetNameInput);

  // Create and append the Deadline input
  const startDateLabel = document.createElement('label');
startDateLabel.textContent = 'Start Date:';
const startDateInput = document.createElement('input');
startDateInput.type = 'date';
const formattedStartDate = formatDate(new Date(start_date)); // Format the start_date value
startDateInput.value = formattedStartDate;
startDateInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
form.appendChild(startDateLabel);
form.appendChild(startDateInput);


   // Create and append the Deadline input
   const endDateLabel = document.createElement('label');
   endDateLabel.textContent = 'End Date:';
   const endDateInput = document.createElement('input');
   endDateInput.type = 'date';
   const formattedEndDate = formatDate(new Date(end_date));
   endDateInput.value = formattedEndDate;
   endDateInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
   form.appendChild(endDateLabel);
   form.appendChild(endDateInput);

  // Create and append the Target Amount input
  const amountLabel = document.createElement('label');
  amountLabel.textContent = 'Amount:';
  const amountInput = document.createElement('input');
  amountInput.type = 'text';
  amountInput.value = amount;
  amountInput.className = 'border border-gray-300 rounded px-4 py-2 w-full mb-4';
  form.appendChild(amountLabel);
  form.appendChild(amountInput);

  // Create the submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Update Goal';
  submitButton.className = 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4';
  form.appendChild(submitButton);

  // Create the cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.className = 'bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4'; // Adjust the class based on your desired styling
  form.appendChild(cancelButton);

  // Append form to the popup window
  const popupWindow = document.getElementById('BudgetpopupWindow');
  popupWindow.innerHTML = '';
  popupWindow.appendChild(form);
  // Show the popup window
  popupWindow.classList.remove('hidden');
  // Set up event listener for form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Get the updated goal data from the form inputs
    const updatedBudgetData = {
      name: budgetNameInput.value,
      start_date: new Date(startDateInput.value),
      end_date: new Date(endDateInput.value),
      amount: amountInput.value,
    };
    updatedBudgetData.start_date.setDate(updatedBudgetData.start_date.getDate() + 1);
    updatedBudgetData.end_date.setDate(updatedBudgetData.end_date.getDate()+1);
    // Call a function to update the goal data on the server
    await updateBudget(id, updatedBudgetData);

    // Close the popup window
    popupWindow.classList.add('hidden');
  });
   // Add event listener to the cancel button
   cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    // Hide the form
    popupWindow.classList.add('hidden');
  });
}


async function editBudget(budgetID){
  const budgetData = await fetchBudgetData(budgetID);
  console.log('2 edit');
  editBudgetForm(budgetData);
  console.log('3 edit');
}

document.addEventListener('click', async (event) => {
  if (event.target.matches('.delete-budget-btn')) {
    console.log(event.target.dataset.budgetId);
    const budgetID = event.target.dataset.budgetId;
    deleteBudget(budgetID);
  }
  else if (event.target.matches('.edit-budget-btn')) {
    const budgetID = event.target.dataset.budgetId;
    editBudget(budgetID);
  }
});

// event lisnet on click add budget button
addBudgetBtn.addEventListener('click', addBudgetForm);


