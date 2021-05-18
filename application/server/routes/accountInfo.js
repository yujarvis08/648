const express = require('express');
const router = express.Router();
const {
    changeEmail,
    changePassword,
    deleteAccountByEmail,
    getUserType,
    getEmail
} = require('../models/Account');
const bcrypt = require('bcrypt-nodejs');
const { response } = require('../server');

/* get usertype */
router.get('/getUserType', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let userType = await getUserType(accountId);
    res.status(200).json({ userType: userType });
});

/* accepts email and new email in req.body */
router.post('/changeEmail', async (req, res) => {
    let { email, newEmail } = req.body;
    let response = await changeEmail(email, newEmail);
    console.log(response);
    if (response instanceof Error) {
        res.status(409).json({
            msg: 'Error! is the email taken?'
        });
    } else {
        res.status(200).json({
            msg: 'Successfully changed Email'
        });
    }
});

/* accepts email and new password in req.body */
router.post('/changePassword', async (req, res) => {

    let { email, newPassword } = req.body;

    let salt = bcrypt.genSaltSync();
    newPassword = bcrypt.hashSync(newPassword, salt)

    let sqlRes = await changePassword(email, newPassword);
    if (sqlRes) {
        let newPassword = sqlRes.newPassword;
        res.status(200).json({ newPassword });
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
    console.log('result in /email route:', result);
    if (result) {
        let email = result[0].email;
        res.status(200).json({ email });
    } else {
        res.status(404).json({ msg: "Couldn't find email." })
    }
})

module.exports = router;
