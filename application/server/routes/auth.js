const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const account = require('../models/Account');

// '/api/auth/login'
router.post('/login', async (req, res) => {
    let credentials = req.body
    let user = await account.getAccountFromEmail(credentials.email);
    user = user[0];

    if (user === undefined) {
        res.status(404).json({ msg: 'User not found' });
    }
    try {
        bcrypt.compare(credentials.password, user.password,
            (err, passwordsMatch) => {
                if (passwordsMatch) {
                    res.cookie('account_id', user.accountId);
                    res.status(200).json({ msg: 'Logged in' });
                } else {
                    console.log("wrong password!");
                    res.status(403).json({ msg: 'Invalid credentials' });
                }
            });
    } catch (error) {
        //console.log('Something went wrong with the server');
        console.log("You have an error!", error);
        if (!res.headersSent) {
            res.status(500).json({ msg: 'Internal error' });
        }
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('account_id');
    res.status(200).json({ msg: 'Logged out.' });
});

module.exports = router;
