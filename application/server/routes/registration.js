const express         = require('express');
const router          = express.Router();
const account         = require('../models/Account');
const restaurantOwner = require('../models/RestaurantOwner');
const menuItem        = require('../models/menuItem');
const Customer        = require('../models/Customer');
const Driver          = require('../models/DeliveryDriver');
const bcrypt          = require('bcrypt-nodejs');

/* restaurantOwner registration */
router.post('/restaurantOwner', async (req, res) => {
    let { email, password } = req.body;

    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    let registrationDetails = { email, password };
    registrationDetails.userType = 'restaurantOwner';

    try {
        // input -> { userType, email, password }
        let temp = await account.insertAccount(registrationDetails);
        let accountId = temp.insertId;
        const { name } = req.body;
        owner = { name, accountId }

        // input -> { name, accountId }
        restaurantOwner.insertOwner(owner);
        res.status(200).json({ msg: 'registration complete' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Email exists' });
    }
});

/* add menu item (restauraunt owner registration) */
router.post('/restaurantOwner/addMenuItem', async (req, res) => {;
    menuItem.insertMenuItem(req.body);
    res.status(200).json({ msg: 'Inserted menu item' });
});

/* ccustomer registration */
router.post('/customer', async (req, res) => {
    let { email, password } = req.body;

    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    let registrationDetails = { email, password };
    registrationDetails.userType = 'customer';

    try {
        // input -> { userType, email, password }
        let temp = await account.insertAccount(registrationDetails);
        let accountId = temp.insertId;

        let { firstName, lastName } = req.body;
        let name = firstName + " " + lastName;
        let customer = { name, accountId }

        // input -> { name, accountId }
        Customer.insertCustomer(customer);
        res.status(200).json({ msg: 'registration complete' });
    } catch (e) {
        console.log('Erorr!: ', e);
        res.status(409).json({ msg: 'Email exists' });
    }
});


/* driver registration */
router.post('/driver', async (req, res) => {
    let { email, password } = req.body;
    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    registrationDetails = { email, password };
    registrationDetails.userType = 'deliveryDriver';

    try {
        // input -> { userType, email, password }
        let temp = await account.insertAccount(registrationDetails);
        let accountId = temp.insertId;
        const { name, restaurantId } = req.body;
        customer = { name, accountId, restaurantId }

        // input -> { name, accountId }
        Driver.insertDriver(customer);
        res.status(200).json({ msg: 'registration complete' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Email exists' });
    }
});

module.exports = router;