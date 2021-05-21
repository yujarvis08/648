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

function rad(x) {
    return x * Math.PI / 180;
};

/**
 * Compute Haversine distance from p1 to p2
 * @param {Object} p1 
 * @param {Object} p2 
 * @returns distance in miles
 */
function getDistance(p1, p2) {
    console.log('p1:', p1, 'p2:', p2);
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(p2.lat - p1.lat);
    console.log('dLat:', dLat);
    let dLong = rad(p2.lng - p1.lng);
    console.log('dLong:', dLong);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    console.log('a:', a);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log('c:', c);
    let d = R * c;
    console.log('d:', d);
    return d / 1609.34; // returns the distance in miles (d is in meters)
};
/* restaurantOwner registration */
// Account         input { email, password }
// restaurantOwner input { name }
// restaurant      input { restaurantName, restaurantDescription, 
//                          priceRating, photo }
// address         input { line1, line2, city, state, zipcode }
router.post('/restaurantOwner', async (req, res) => {
    console.log('req body:', req.body)
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
        restaurantData.imagePath = imagePath.replace('./public', '');
        restaurantData.ownerId = ownerId;
        restaurantData.lat = req.body.lat;
        restaurantData.lng = req.body.lng;
        let sfsuCoordinates = { lat: 37.7241534, lng: -122.4821292 };
        let distance = getDistance(restaurantData, sfsuCoordinates);
        console.log('distance:', distance);
        restaurantData.distance = distance;
        console.log('restaurantData:', restaurantData);
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
    let { firstName, lastName } = req.body;
    let name = firstName + ' ' + lastName;
    let salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    let registrationDetails = { email, password };
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
