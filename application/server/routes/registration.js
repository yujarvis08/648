const express = require('express');
const router = express.Router();
const account = require('../models/Account');
const restaurantOwner = require('../models/RestaurantOwner');
const Customer = require('../models/Customer');
const Driver = require('../models/DeliveryDriver');
const bcrypt = require('bcrypt-nodejs');

/* restaurantOwner registration */
router.post('/restaurantOwner', async (req, res) => {
    let { email, password } = req.body;

    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    registrationDetails = {email, password};
    registrationDetails.userType = 'restaurantOwner';

    // input -> { userType, email, password }
    let temp = await account.insertAccount(registrationDetails);
    let accountId = temp.insertId;
    const { name } = req.body;
    owner = { name, accountId }

    // input -> { name, accountId }
    restaurantOwner.insertOwner(owner);
    res.status(200).json( {msg: 'registration complete'});
});


/* customer registration */
router.post('/customer', async (req, res) => {
    let { email, password } = req.body;

    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    registrationDetails = {email, password};
    registrationDetails.userType = 'customer';

    // input -> { userType, email, password }
    let temp = await account.insertAccount(registrationDetails);
    let accountId = temp.insertId;
    const { name } = req.body;
    customer = { name, accountId }

    // input -> { name, accountId }
    Customer.insertCustomer(customer);
    res.status(200).json( {msg: 'registration complete'});
});

/* driver registration */
router.post('/driver', async (req, res) => {
    let { email, password } = req.body;
    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    registrationDetails = {email, password};
    registrationDetails.userType = 'deliveryDriver';

    // input -> { userType, email, password }
    let temp = await account.insertAccount(registrationDetails);
    let accountId = temp.insertId;
    const { name, restaurantId } = req.body;
    customer = { name, accountId, restaurantId }

    // input -> { name, accountId }
    Driver.insertDriver(customer);
    res.status(200).json( {msg: 'registration complete'});
});

module.exports = router;
