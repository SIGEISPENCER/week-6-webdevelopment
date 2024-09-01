const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

router.post('/register', async(req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword],
        (err, result) => {
            if (err) return res.status(500).send('Error registering user');
            res.status(200).send('User registered');
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async(err, results) => {
        if (err || results.length === 0) return res.status(400).send('Invalid email or password');

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password');

        req.session.user = user;
        res.status(200).send('User logged in');
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('User logged out');
});

module.exports = router;