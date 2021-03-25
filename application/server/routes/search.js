const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/Restaurant');
const utilModel = require('../models/Util');
const addressModel = require('../models/Address');

// utility function
async function insertRestaurantAddress(restaurants) {
    for (let restaurant of restaurants) {
        // console.log('passing in id:', restaurant.restaurantId);
        let addressRes = await addressModel.getAddressById(restaurant.restaurantId);
        restaurant.address = addressRes;
        delete restaurant.addressId;
    }
}

// /api/search/restaurant?name=<restaurantName>
// returns all restaurants. If query has a name, then match name
router.get('/restaurant', async (req, res, next) => {
    if (req.query.name) {
        let name = req.query.name;
        const restaurantRes = await restaurantModel.getByName(name);
        await insertRestaurantAddress(restaurantRes);
        res.status(200).json({ status: 'ok', restaurants: restaurantRes });
    } else {
        let restaurantRes = await restaurantModel.getAll();
        await insertRestaurantAddress(restaurantRes);
        res.status(200).json({ status: 'ok', restaurants: restaurantRes });
    }
});

router.get('/restaurant/cuisines', async (req, res, next) => {
    let cuisines = await utilModel.getAllCuisines();
    res.status(200).json({ status: 'ok', cuisines });
});

module.exports = router;