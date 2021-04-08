const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../models/Account');

// '/api/auth/login'
router.post('/login', async (req, res) => {
    let credentials = req.body
    user = await account.getAccountFromEmail(credentials.email);
    user = user[0];
    //console.log(user);

    try {
        if (bcrypt.compare(user.password, credentials.password)) {
            res.cookie('account_id', user.accountId);
            res.status(200).json({ msg: 'Logged in' });
        } else {
            console.log("wrong password!");
            res.status(403).json({ msg: 'Invalid credentials' });
        }
    } catch (error) {
        console.log('Something went wrong, is the request correct');
        console.log(error);
        res.status(500).json({ msg: 'Internal error' });
    }
        
});

module.exports = router;
