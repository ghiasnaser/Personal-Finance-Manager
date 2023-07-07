// Get references to the buttons
const budgetingBtn = document.getElementById("Budgeting");
const expenseTrackingBtn = document.getElementById("Expense_Tracking");
const goalSettingBtn = document.getElementById("Goal_Setting");
const incomeTrackingBtn = document.getElementById("Income_Tracking");
const reportsAndAnalyticsBtn = document.getElementById("Reports_and_Analytics");
const remindersAndNotificationsBtn = document.getElementById("Reminders_and_Notifications");
// Get references to the sections
const budgetingSection = document.getElementById("Budgeting_Section");
const expenseTrackingSection = document.getElementById("Expense_Tracking_Section");
const goalSettingSection = document.getElementById("Goal_Setting_Section");
const incomeTrackingSection = document.getElementById("Income_Tracking_Section");
const reportsAnalyticsSection = document.getElementById("Reports_Analytics_Section");
const remindersNotificationsSection = document.getElementById("Reminders_Notifications_Section");

// Add click event listeners to the buttons
budgetingBtn.addEventListener("click", () => {
  // Hide all sections
  budgetingSection.classList.remove("hidden");
  expenseTrackingSection.classList.add("hidden");
  goalSettingSection.classList.add("hidden");
  incomeTrackingSection.classList.add("hidden");
  reportsAnalyticsSection.classList.add("hidden");
  remindersNotificationsSection.classList.add("hidden");
});

expenseTrackingBtn.addEventListener("click", () => {
  // Hide all sections
  budgetingSection.classList.add("hidden");
  expenseTrackingSection.classList.remove("hidden");
  goalSettingSection.classList.add("hidden");
  incomeTrackingSection.classList.add("hidden");
  reportsAnalyticsSection.classList.add("hidden");
  remindersNotificationsSection.classList.add("hidden");
});

goalSettingBtn.addEventListener("click", () => {
    // Hide all sections
    budgetingSection.classList.add("hidden");
    expenseTrackingSection.classList.add("hidden");
    goalSettingSection.classList.remove("hidden");
    incomeTrackingSection.classList.add("hidden");
    reportsAnalyticsSection.classList.add("hidden");
    remindersNotificationsSection.classList.add("hidden");
  });

  incomeTrackingBtn.addEventListener("click", () => {
    // Hide all sections
    budgetingSection.classList.add("hidden");
    expenseTrackingSection.classList.add("hidden");
    goalSettingSection.classList.add("hidden");
    incomeTrackingSection.classList.remove("hidden");
    reportsAnalyticsSection.classList.add("hidden");
    remindersNotificationsSection.classList.add("hidden");
  });

  reportsAndAnalyticsBtn.addEventListener("click", () => {
    // Hide all sections
    budgetingSection.classList.add("hidden");
    expenseTrackingSection.classList.add("hidden");
    goalSettingSection.classList.add("hidden");
    incomeTrackingSection.classList.add("hidden");
    reportsAnalyticsSection.classList.remove("hidden");
    remindersNotificationsSection.classList.add("hidden");
  });

  remindersAndNotificationsBtn.addEventListener("click", () => {
    // Hide all sections
    budgetingSection.classList.add("hidden");
    expenseTrackingSection.classList.add("hidden");
    goalSettingSection.classList.add("hidden");
    incomeTrackingSection.classList.add("hidden");
    reportsAnalyticsSection.classList.add("hidden");
    remindersNotificationsSection.classList.remove("hidden");
  });

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
    goal_name: goalName,
    target_amount: targetAmount,
    deadline: deadline,
  };
  console.log(newGoal);
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
      //goalSettingBtn.click();
      setTimeout(() => {
        goalSettingBtn.click();
      }, 5000);
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


/*
const deleteButtons = document.querySelectorAll('.delete-goal-btn');
deleteButtons.forEach((button) => {
  button.addEventListener('click', deleteGoal);
});

// Add event listeners to edit buttons
const editButtons = document.querySelectorAll('.edit-goal-btn');
editButtons.forEach((button) => {
  button.addEventListener('click', editGoal);
});*/

async function fetchGoalData(goalId) {
  const response = await fetch(`/api/goals/${goalId}`);
  if (response.ok) {
    const goalData = await response.json();
    return goalData;
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
      // Goal updated successfully
      console.log('Goal updated successfully');
      location.reload();
    } else {
      // Error updating goal
      console.error('Failed to update goal');
    }
  } catch (error) {
    console.error('Error updating goal:', error);
  }
}


function createInput(id, label, value) {
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


function displayEditForm(goalData) {
  // Get the existing goal data
  const { id, goal_name, target_amount, deadline } = goalData;

  // Create the form elements
  const form = document.createElement('form');
  form.id = 'editGoalForm';
  form.className = 'bg-white rounded p-4';
  const goalNameInput = createInput('goalName', 'Goal Name', goal_name);
  const targetAmountInput = createInput('targetAmount', 'Target Amount', target_amount);
  const deadlineInput = createInput('goalDeadline', 'Goal Deadline', deadline);
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Update Goal';
  // Add form inputs and other elements as needed

  // Append form to the popup window
  const popupWindow = document.getElementById('popupWindow');
  popupWindow.innerHTML = '';
  popupWindow.appendChild(form);

  // Show the popup window
  popupWindow.style.display = 'flex';

  // Set up event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Get the updated goal data from the form inputs
    const updatedGoalData = {
      goal_name: goalNameInput.value,
      target_amount: targetAmountInput.value,
      deadline: deadlineInput.value,
    };
    // Call a function to update the goal data on the server
    updateGoal(id, updatedGoalData);
    // Close the popup window
    popupWindow.style.display = 'none';
  });
}

// Add event listener to edit buttons
document.addEventListener('click', async (event) => {
  if (event.target.matches('.edit-goal-btn')) {
    const goalId = event.target.dataset.goalId;
    const goalData = await fetchGoalData(goalId);
    displayEditForm(goalData);
  }
});


// function for editing a goal
async function editGoal(goalId) {
  const goalData = await fetchGoalData(goalId);
  console.log(goalData);
  displayEditForm(goalData);
}