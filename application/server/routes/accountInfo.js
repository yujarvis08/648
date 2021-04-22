const express = require('express');
const router = express.Router();
const { changeEmail } = require('../models/Account');

/* accepts email and new email in req.body */
router.post('/changeEmail', async (req, res) => {
    let { email, newEmail } = req.body;
    let response = await changeEmail(email, newEmail);
    console.log(response);
    if (response instanceof Error) {
        res.status(409).json( {
            msg: 'Error! is the email taken?'
        });
    } else {
        res.status(200).json( {
            msg: 'Successfully changed Email'
        });
    }
});

module.exports = router;
