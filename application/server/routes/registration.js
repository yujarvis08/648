const express = require('express');
const router = express.Router();
const account = require('../models/Account');
const restaurantOwner = require('../models/RestaurantOwner');

router.post('/restaurantOwner', async (req, res) => {
    const { email, password } = req.body;
    registrationDetails = {email, password};
    registrationDetails.userType = 'restaurantOwner';
    console.log(registrationDetails);
    console.log('beginning of route');
    // input -> { userType, email, password }
    await account.insertAccount(registrationDetails);
    console.log('after inserAccount');
    accountId = await account.lastInsertId();
    const { name } = req.body;
    console.log(req.body);
    console.log(name);
    owner = { name, accountId }
    // input -> { name, accountId }
    restaurantOwner.insertOwner(owner);
    res.status(200).json( {msg: 'registration complete'});
});

module.exports = router;
