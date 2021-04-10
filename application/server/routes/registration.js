const express = require('express');
const router = express.Router();
const account = require('../models/Account');
const restaurantOwner = require('../models/RestaurantOwner');

router.post('/createRestaurantOwner', (req, res) => {
    const { email, password } = req.body;
    registrationDetails = {email, password};
    registrationDetails.userType = 'restaurantOwner';
    // input -> { userType, email, password }
    account.InsertAccount(registrationDetails);
    id = account.lastInsertId;
    const { firstName, lastName } = req.body;
    const name = firstName + " " + lastName
    owner = { name, id }
    // input -> { name, accountId }
    restaurantOwner.insertOwner(owner);
});

module.exports = router;
