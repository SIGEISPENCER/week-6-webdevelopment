const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path'); // Add this

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5500', credentials: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Define routes
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});