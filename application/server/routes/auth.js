const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const account = require('../models/Account');

// '/api/auth/login'
router.post('/login', async (req, res) => {
    let credentials = req.body
    user = await account.getAccountFromEmail(credentials.email);
    user = user[0];
    console.log(user);

    if (bcrypt.compare(user.password, credentials.password)) {

    }
    res.cookie('account_id', user.accountId);
    res.status(200).json({ msg: 'Logged in' });
});

module.exports = router;
