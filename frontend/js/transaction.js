const transactionForm = document.getElementById('transactionForm');
const transactionsList = document.getElementById('transactionsList');

async function fetchTransactions() {
    const response = await fetch('http://localhost:3000/api/transactions');
    const transactions = await response.json();

    transactionsList.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.textContent = `${transaction.date}: ${transaction.category} - $${transaction.amount}`;
        transactionsList.appendChild(li);
    });
}

if (transactionForm) {
    transactionForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const amount = document.getElementById('amount').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;

        await fetch('http://localhost:3000/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, category, date, description })
        });

        fetchTransactions();
    });
}

window.onload = fetchTransactions;