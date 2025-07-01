// TODO
// 1. Remaining can't be -ve.
// 2. Deal with submmitting empty inputs.
// 3. Bin position in expense list

// i/p field setBudget button, total, remaining, 
const budgetInput = document.getElementById('budget-input');
const setBudget = document.getElementById('set-budget-btn');
const totalBudget = document.getElementById('total-budget');
const totalSpent = document.getElementById('total-spent');
const remainingBudget = document.querySelector('#remaining-budget');
const expenseAmount = document.querySelector('#expense-amount');
const addExpenseButton = document.querySelector('#add-expense-btn');
const recentExpensesList = document.querySelector('#expenses');


let budget = 0;
let spent = 0;
let remaining = budget;

setBudget.addEventListener('click', () => {
    budget = parseInt(budgetInput.value);
    totalBudget.innerHTML = budget;
    budgetInput.value = '';

});

function addTheExpense(amount, desc, category) {
    // spend = amount :)
    // reset i/p fields (Not the purpose of the func) :) 
    // display in recent expenses as creating a div having common class (will help in resetting);
    // amount, desc, category => store!!
    
    spent += amount;
    remaining = budget - spent;
    
    totalSpent.innerHTML = spent;
    remainingBudget.innerHTML = remaining;

    const expense = document.createElement('li');

    expense.className = "expense-item";
    expense.innerHTML = `<div class="expense-header">
    <span class="category">${category}</span>
    <span class="amount">₹${amount}</span>
  </div>
  <div class="description">${desc}</div>
  <button class="delete-btn" title="Delete">🗑</button>`

    recentExpensesList.appendChild(expense);
}

addExpenseButton.addEventListener('click', () => {
    const expenseAmount = parseInt(document.querySelector('#expense-amount').value);
    
    
    const expenseDesc = document.querySelector('#expense-desc').value;
    const expenseCategory = document.querySelector('#expense-category').value;

    addTheExpense(expenseAmount, expenseDesc, expenseCategory);
    
    document.querySelectorAll('input, select').forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else input.value = '';
        }
    );
});

// At the end