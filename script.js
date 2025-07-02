// TODO: 
// 1. Remaining, spent, budget can't be -ve. :)
// 2. Deal with submmitting empty inputs. :)
// 3. Bin position in expense list :)
// 4. Deal with NaN in budget, total spent, remaining (Alert/popup) :)
// 5. Remaining = budget at start :)
// 6. Deleting 'x' li deletes 'x-1' li (Imp. Bug) :)
// 7. Lock the budget after using, only resetting unlocks it :)

// MOST IMP. TODO: localStorage

// i/p field setBudget button, total, remaining, 
const budgetInput = document.getElementById('budget-input');
const setBudget = document.getElementById('set-budget-btn');
const totalBudget = document.getElementById('total-budget');
const totalSpent = document.getElementById('total-spent');
const remainingBudget = document.querySelector('#remaining-budget');
const expenseAmount = document.querySelector('#expense-amount');
const addExpenseButton = document.querySelector('#add-expense-btn');
const recentExpensesList = document.querySelector('#expenses');
const resetButton = document.querySelector('#reset-btn');

let budget = 0;
let spent = 0;
let remaining = budget;
let binId = 0;

// Setting budget
setBudget.addEventListener('click', () => {

    budget = parseInt(budgetInput.value);
    if (isNaN(budget) || budget <= 0) {
        alert("Set a proper budget 😭");
        return;
    }

    budget = Math.max(budget, 0);
    totalBudget.innerHTML = budget;
    budgetInput.value = '';
    remaining = budget;
    remainingBudget.innerHTML = remaining;

    setBudget.disabled = true;
    budgetInput.disabled = true;

    const lockNote = document.createElement('small');
    lockNote.textContent = '🔒 Budget locked. Reset to edit.';
    lockNote.classList.add('lock-note');
    setBudget.parentNode.appendChild(lockNote);
});

function addTheExpense(amount, desc, category, id) {
    // spend = amount :)
    // reset i/p fields (Not the purpose of the func) :) 
    // display in recent expenses as creating a div having common class (will help in resetting);
    // amount, desc, category => store!!
    
    spent += Math.max(amount, 0);
    remaining = Math.max(budget - spent, 0);
    
    totalSpent.innerHTML = spent;
    remainingBudget.innerHTML = remaining;

    const expense = document.createElement('li');
    expense.id = `${id}`;
    
    expense.innerHTML = `<div class="expense-main">
                            <div class="left">
                            <span class="category-tag">${category}</span>
                            <p class="description">${desc}</p>
                            </div>
                            <div class="right">
                            <span class="amount">₹${amount}</span>
                            <button class="delete-btn" data-id = "${id}" title="Delete">🗑</button>
                            </div>
                        </div>`;


    recentExpensesList.appendChild(expense);
}

// Add expenses
addExpenseButton.addEventListener('click', () => {
    const expenseAmount = parseInt(document.querySelector('#expense-amount').value);
    
    
    const expenseDesc = document.querySelector('#expense-desc').value;
    const expenseCategory = document.querySelector('#expense-category').value;
    if (isNaN(expenseAmount) || expenseAmount <= 0 || !expenseDesc || expenseCategory === '') {
        alert("Fill the expense properly 😭");
        return;
    }

    addTheExpense(expenseAmount, expenseDesc, expenseCategory, binId);
    binId++;
    
    document.querySelectorAll('input, select').forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else input.value = '';
        }
    );
});

// Delete button
recentExpensesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {

        // Retrieve ID
        const requiredId = e.target.dataset.id;
        // data-xyz = "abc" => e.target.dataset.xyz = "abc"

        // Retrieve the list to be deleted
        const listToBeDeleted = document.getElementById(requiredId);

        // Calculation
        console.log(listToBeDeleted.querySelector('.amount').textContent.replace('₹', ''));
        
        spent -= Math.max(parseInt(listToBeDeleted.querySelector('.amount')
                .textContent 
                .replace('₹', '')), 0);
        

        remaining = Math.max(budget - spent, 0);

        totalSpent.innerHTML = spent;
        remainingBudget.innerHTML = remaining;

        // Delete
        listToBeDeleted.remove();
    }
})

// Reset button functionality
resetButton.addEventListener('click', () => {

    // Reset budget, spent, remaining
    budget = 0; remaining = 0; spent= 0;

    totalBudget.innerHTML = budget;
    totalSpent.innerHTML = spent;
    remainingBudget.innerHTML = remaining;

    // Unlock the setBudget
    setBudget.disabled = false;
    budgetInput.disabled = false;
    // console.log(lockNote);
    
    document.querySelector('.lock-note').remove();

    // Delete all recent expenses
    recentExpensesList.innerHTML = '';

    // Clean the UI => Clear all the i/p fields
    document.querySelectorAll('input, select').forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else input.value = '';
        }
    );
})