// TODO
// 1: Give an id to all expenses, and a global event listener
        // to listen for any clicks on delete-btn class, also
        // handle the remaining and spent calc.

// 2: Give functionality to the Reset Button

// TODO: Global
// 1. Remaining can't be -ve.
// 2. Deal with submmitting empty inputs.
// 3. Bin position in expense list :)
// 4. Deal with NaN in budget, total spent, remaining (Alert/popup)

// i/p field setBudget button, total, remaining, 
const budgetInput = document.getElementById('budget-input');
const setBudget = document.getElementById('set-budget-btn');
const totalBudget = document.getElementById('total-budget');
const totalSpent = document.getElementById('total-spent');
const remainingBudget = document.querySelector('#remaining-budget');
const expenseAmount = document.querySelector('#expense-amount');
const addExpenseButton = document.querySelector('#add-expense-btn');
const recentExpensesList = document.querySelector('#expenses');
// const deleteButton = document.querySelector()

let budget = 0;
let spent = 0;
let remaining = budget;
let id = 0;

setBudget.addEventListener('click', () => {
    budget = parseInt(budgetInput.value);
    totalBudget.innerHTML = budget;
    budgetInput.value = '';

});

function addTheExpense(amount, desc, category, id) {
    // spend = amount :)
    // reset i/p fields (Not the purpose of the func) :) 
    // display in recent expenses as creating a div having common class (will help in resetting);
    // amount, desc, category => store!!
    
    spent += amount;
    remaining = budget - spent;
    
    totalSpent.innerHTML = spent;
    remainingBudget.innerHTML = remaining;

    const expense = document.createElement('li');

    expense.innerHTML = `<div class="expense-main">
                            <div class="left">
                            <span class="category-tag">${category}</span>
                            <p class="description">${desc}</p>
                            </div>
                            <div class="right">
                            <span class="amount">₹${amount}</span>
                            <button class="delete-btn" title="Delete">🗑</button>
                            </div>
                        </div>`;


    recentExpensesList.appendChild(expense);
    id++;
}

addExpenseButton.addEventListener('click', () => {
    const expenseAmount = parseInt(document.querySelector('#expense-amount').value);
    
    
    const expenseDesc = document.querySelector('#expense-desc').value;
    const expenseCategory = document.querySelector('#expense-category').value;

    addTheExpense(expenseAmount, expenseDesc, expenseCategory, id);
    
    document.querySelectorAll('input, select').forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else input.value = '';
        }
    );
});

document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
        button.closest('li').remove();
    })
})




// At the end