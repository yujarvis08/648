const express = require('express');
const router = express.Router();
const account = require('../models/Account');
const restaurantOwner = require('../models/RestaurantOwner');
const restaurant = require('../models/Restaurant');
const address = require('../models/Address');
const menuItem = require('../models/menuItem');
const Menu = require('../models/Menu');
const Customer = require('../models/Customer');
const Driver = require('../models/DeliveryDriver');
const bcrypt = require('bcrypt-nodejs');

/* restaurantOwner registration */
// Account         input { email, password }
// restaurantOwner input { name }
// restaurant      input { restaurantName, restaurantDescription, 
//                          priceRating, photo }
// address         input { line1, line2, city, state, zipcode }
router.post('/restaurantOwner', async (req, res) => {
    // console.log('req:', req)
    console.log('req body:', req.body)
    // console.log('req headers:', req.headers);
    let { email, password } = req.body;
    let { firstName, lastName } = req.body;
    let name = firstName + ' ' + lastName;
    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    let registrationDetails = { email, password };
    registrationDetails.userType = 'restaurantOwner';

    try {
        /* Inserting Account */
        // input{ userType, email, password }
        let result = await account.insertAccount(registrationDetails);

        /* Inserting RestaurantOwner */
        let accountId = result.insertId;
        let owner = { name, accountId }
        // input{ name, accountId }
        result = await restaurantOwner.insertOwner(owner);
        let ownerId = result.insertId;

        /* inserting address */
        // input{ line1, line2, city, state, zipcode }
        let { line1, line2, city, state, zipcode } = req.body;
        let addressData;
        if (line2) {
            addressData = { line1, line2, city, state, zipcode };
        } else {
            addressData = { line1, city, state, zipcode };
        }
        result = await address.insertAddress(addressData);
        let addressId = result.insertId;

        /* Inserting Restaurant */
        /* get image */
        let { photo } = req.files;
        console.log('the photo:', req.files);
        let imagePath;
        if (photo.mimetype.includes('image')) {
            imagePath = './public/uploads/' + ownerId + '_' + photo.name;
            // ../../client/src/images/restaurantPhotos/1_photoName
            photo.mv(imagePath);
        }
        let {
            restaurantName,
            restaurantDescription,
            priceRating,
            cuisine } = req.body;
        // input{ name, description, priceRating, cuisine, 
        // ownerId, addressId, imagePath  }
        let restaurantData = {};
        restaurantData.name = restaurantName;
        restaurantData.description = restaurantDescription
        restaurantData.priceRating = priceRating;
        restaurantData.cuisine = cuisine;
        restaurantData.addressId = addressId;
        restaurantData.imagePath = imagePath;
        restaurantData.ownerId = ownerId;
        /* Insert into Restaurant and returns restaurantId */
        let { insertId: restaurantId } = await restaurant.insertRestaurant(restaurantData);
        /* Inserts into menu and returns menuId */
        let { insertId } = await Menu.insertMenu(restaurantId);
        res.status(200).json({
            menuId: insertId
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Email exists' });
    }
});

/* add menu items after restaurantOwner registration */
/* requies menuItems and menuId to be sent through the body */
router.post('/restaurantOwner/addMenuItems', async (req, res) => {
    let { menuId, menuItems } = req.body;
    console.log(req.body);
    console.log('menuId:', menuId)

    for (let i = 0; i < menuItems.length; i++) {
        menuItem.insertMenuItem(menuId, menuItems[i]);
    }
    res.status(200).json({ msg: 'Inserted menu items' });
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
    let registrationDetails = { email, password };
    let { firstName, lastName } = req.body;
    let name = firstName + ' ' + lastName;
    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt)
    registrationDetails.userType = 'deliveryDriver';

    try {
        // input -> { userType, email, password }
        let temp = await account.insertAccount(registrationDetails);
        let accountId = temp.insertId;
        const { restaurantId } = req.body;
        let driver = { name, accountId, restaurantId }

        // input -> { name, accountId }
        Driver.insertDriver(driver);
        res.status(200).json({ msg: 'registration complete' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Email exists' });
    }
});

module.exports = router;
