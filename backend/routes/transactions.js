const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

router.get('/', isAuthenticated, (req, res) => {
    const userId = req.session.user.id;
    db.query('SELECT * FROM transactions WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).send('Error fetching transactions');
        res.json(results);
    });
});

router.post('/', isAuthenticated, (req, res) => {
    const { amount, category, date, description } = req.body;
    const userId = req.session.user.id;

    db.query('INSERT INTO transactions (user_id, amount, category, date, description) VALUES (?, ?, ?, ?, ?)', [userId, amount, category, date, description],
        (err, result) => {
            if (err) return res.status(500).send('Error adding transaction');
            res.status(201).send('Transaction added');
        });
});

module.exports = router;