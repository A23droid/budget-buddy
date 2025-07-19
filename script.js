
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

let expenses = [];

// Setting budget
setBudget.addEventListener('click', () => {

    budget = parseInt(budgetInput.value);
    if (isNaN(budget) || budget <= 0) {
        showPopUp("Set a proper budget 😭");
        // alert("Set a proper budget 😭");
        return;
    }

    budget = Math.max(budget, 0);
    totalBudget.innerHTML = budget;
    budgetInput.value = '';
    remaining = budget;
    remainingBudget.innerHTML = remaining;

    saveToLocalStorage();

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


    recentExpensesList.prepend(expense);
}

// Add expenses
addExpenseButton.addEventListener('click', () => {
    const expenseAmount = parseInt(document.querySelector('#expense-amount').value);
    
    
    const expenseDesc = document.querySelector('#expense-desc').value;
    const expenseCategory = document.querySelector('#expense-category').value;
    if (isNaN(expenseAmount) || expenseAmount <= 0 || !expenseDesc || expenseCategory === '') {
        showPopUp("Fill the expense properly 😭");
        // alert("Fill the expense properly 😭");
        return;
    }

    addTheExpense(expenseAmount, expenseDesc, expenseCategory, binId);

    expenses.push({
        id: binId,
        amount: expenseAmount,
        desc: expenseDesc,
        category: expenseCategory
    });

    saveToLocalStorage();

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
        
        spent -= Math.max(parseInt(listToBeDeleted.querySelector('.amount')
                .textContent 
                .replace('₹', '')), 0);
        

        remaining = Math.max(budget - spent, 0);
        
        expenses = expenses.filter((expense) => expense.id != requiredId) // string & int comparision
        
        saveToLocalStorage();

        totalSpent.innerHTML = spent;
        remainingBudget.innerHTML = remaining;

        // Delete
        listToBeDeleted.remove();
    }
})

// Reset button functionality
resetButton.addEventListener('click', () => {

    // Reset budget, spent, remaining
    budget = 0; 
    remaining = 0; 
    spent = 0; 
    binId = 0;

    totalBudget.innerHTML = budget;
    totalSpent.innerHTML = spent;
    remainingBudget.innerHTML = remaining;

    // Unlock the setBudget
    setBudget.disabled = false;
    budgetInput.disabled = false;
    
    if (document.querySelector('.lock-note')) {
        document.querySelector('.lock-note').remove();
    }
    // Delete all recent expenses
    recentExpensesList.innerHTML = '';

    // Clean the UI => Clear all the i/p fields
    document.querySelectorAll('input, select').forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else input.value = '';
        }
    );

    // Forget everything from localStorage
    localStorage.removeItem('budgetBuddy');
    expenses = [];
})


// localStorage
// what to store: balance, spent, remaining, binId, expenses = [{data-id, amount, desc, category}]
// Obj -stringify- => string -parse- => Obj

function saveToLocalStorage(){
    const data = {
        budget,
        binId,
        expenses
    }

    localStorage.setItem('budgetBuddy', JSON.stringify(data));
}

window.addEventListener('DOMContentLoaded', () => {
    const savedData = JSON.parse(localStorage.getItem('budgetBuddy'));
    if (!savedData) return;

    // Restore the var
    budget = savedData.budget;
    // spent = savedData.spent;
    // remaining = savedData.remaining;
    spent = 0;
    remaining = budget;
    
    binId = savedData.binId;
    expenses = savedData.expenses || []; // if no expenses made, then go with empty array

    // Update the UI
    remainingBudget.innerHTML = remaining;
    totalSpent.innerHTML = spent;
    totalBudget.innerHTML = budget;

    expenses.forEach((expense) => {
        addTheExpense(expense.amount, expense.desc, expense.category, expense.id);
    })

    // Disable the budget input
    setBudget.disabled = true;
    budgetInput.disabled = true;

})

function showPopUp(message, duration = 2500) {
    const popup = document.querySelector('#popup');
    popup.textContent = message;
    popup.classList.remove('hidden')
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, duration);
}