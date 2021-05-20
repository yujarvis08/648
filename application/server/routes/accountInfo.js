const express = require('express');
const router = express.Router();
const {
    changeEmail,
    changePassword,
    deleteAccountByEmail,
    getUserType,
    getEmail,
    getPassword
} = require('../models/Account');
const bcrypt = require('bcrypt-nodejs');

/* get usertype */
router.get('/getUserType', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    if (accountId) {
        let response = await getUserType(accountId);
        console.log('accountId:', accountId, 'user type:', response);
        res.status(200).json({ userType: response[0].userType });
    } else {
        res.status(200).json({ userType: "" });
    }
});

/* accepts email and new email in req.body */
router.post('/changeEmail', async (req, res) => {
    let { oldEmail, newEmail } = req.body;
    let { account_id: accountId } = req.cookies;
    let result = await getEmail(accountId);
    if (result && result[0].email === oldEmail) {
        let response = await changeEmail(oldEmail, newEmail);
        res.status(200).json({
            msg: 'Successfully changed Email'
        });
    } else {
        res.status(409).json({
            msg: 'Error! is the email taken?'
        });
    }
});

/* accepts email and new password in req.body */
router.post('/changePassword', async (req, res) => {
    let { currentPassword, newPassword } = req.body;
    let accountId = req.cookies.account_id;
    let result = await getPassword(accountId);
    let userPassword = result[0].password;
    let salt = bcrypt.genSaltSync();
    newPassword = bcrypt.hashSync(newPassword, salt);
    try {
        bcrypt.compare(currentPassword, userPassword,
            async (err, passwordsMatch) => {
                if (passwordsMatch) {
                    await changePassword(accountId, newPassword);
                    res.status(200).json({ msg: 'Password changed.' });
                } else {
                    console.log("wrong password!", err);
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

/* Delete account */

router.put('/deleteAccount', async (req, res) => {
    let { email } = req.body;
    deleteAccountByEmail(email);
    res.status(200).json({
        msg: 'Deleted account if account existed'
    });
});

router.get('/email', async (req, res) => {
    const accountId = req.cookies.account_id;
    let result = await getEmail(accountId);
    if (result) {
        let email = result[0].email;
        res.status(200).json({ email });
    } else {
        res.status(404).json({ msg: "Couldn't find email." })
    }
})

module.exports = router;
