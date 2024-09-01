const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

if (loginForm) {
    loginForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            window.location.href = 'dashboard.html';
        } else {
            alert('Login failed');
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', async() => {
        await fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
        window.location.href = 'login.html';
    });
}