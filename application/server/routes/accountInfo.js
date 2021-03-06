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
        console.log('getUserType => userType:', response[0].userType, "accountId:", accountId);
        res.status(200).json({ userType: response[0].userType });
    } else {
        res.status(200).json({ userType: "" });
    }
});

/* accepts email and new email in req.body */
router.post('/changeEmail', async (req, res) => {
    let { oldEmail, newEmail } = req.body;
    let { account_id: accountId } = req.cookies;
    if (accountId && oldEmail && newEmail) {
        let result = await getEmail(accountId);
        if (result && result[0].email === oldEmail) {
            await changeEmail(oldEmail, newEmail);
            res.status(200).json({
                msg: 'Successfully changed Email'
            });
        } else {
            res.status(409).json({
                msg: 'Error! is the email taken?'
            });
        }
    } else {
        res.status(200).json({ msg: "No accountId or oldEmail or newEmail in request body." });
    }
});

/* accepts email and new password in req.body */
router.post('/changePassword', async (req, res) => {
    let { currentPassword, newPassword } = req.body;
    let accountId = req.cookies.account_id;
    let userPassword;
    if (accountId && currentPassword && newPassword) {
        let result = await getPassword(accountId);
        userPassword = result[0].password;
        let salt = bcrypt.genSaltSync();
        newPassword = bcrypt.hashSync(newPassword, salt);
    } else {
        res.status(200).json({ msg: "No accountId or currentPassword or newPassword in request body." });
    }
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
        console.log("You have an error!", error);
        if (!res.headersSent) {
            res.status(500).json({ msg: 'Internal error' });
        }
    }
});

/* Delete account */
router.delete('/deleteAccount', async (req, res) => {
    let { email } = req.body;
    if (email) {
        await deleteAccountByEmail(email);
        res.status(200).json({
            msg: 'Deleted account if account existed'
        });
    } else {
        res.status(200).json({ msg: "No email in request body." });
    }
});

router.get('/email', async (req, res) => {
    const accountId = req.cookies.account_id;
    if (accountId) {
        let result = await getEmail(accountId);
        if (result) {
            let email = result[0].email;
            res.status(200).json({ email });
        } else {
            res.status(404).json({ msg: "Couldn't find email." })
        }
    } else {
        res.status(200).json({ msg: "No accountId in request body." });
    }
})

module.exports = router;
