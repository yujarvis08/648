const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/Restaurant');
const utilModel = require('../models/Util');
const addressModel = require('../models/Address');

// utility function to insert address into restaurant object
async function insertRestaurantAddress(restaurants) {
    console.log('restaurants:', restaurants);
    for (let restaurant of restaurants) {
        // console.log('passing in id:', restaurant.restaurantId);
        let addressRes = await addressModel.getAddressById(restaurant.restaurantId);
        console.log('restaurant:', restaurant);
        console.log('addressRes:', addressRes);
        restaurant.address = addressRes[0];
        delete restaurant.addressId;
    }
}

// returns all restaurants. If query has a name, then match name. Works for:
// /api/search/restaurant?name=<restaurantName>
// /api/search/restaurant?cuisine=<cuisine>
// /api/search/restaurant?
router.get('/restaurant', async (req, res, next) => {
    if (req.query.name) {
        let name = req.query.name;
        const restaurantRes = await restaurantModel.getByName(name);
        await insertRestaurantAddress(restaurantRes);
        res.status(200).json({ status: 'ok', restaurants: restaurantRes });
    } else if (req.query.cuisine) {
        let cuisine = req.query.cuisine;
        const restaurantRes = await restaurantModel.getByCuisine(cuisine);
        await insertRestaurantAddress(restaurantRes);
        res.status(200).json({ status: 'ok', restaurants: restaurantRes });
    } else {
        let restaurantRes = await restaurantModel.getAll();
        await insertRestaurantAddress(restaurantRes);
        res.status(200).json({ status: 'ok', restaurants: restaurantRes });
    }
});

// gets a list of all UNIQUE cuisines available in our app (DB). Useful for dropdown.
router.get('/restaurant/cuisines', async (req, res, next) => {
    let response = await restaurantModel.getCuisines();
    let cuisines = []
    response.forEach(cuisine => {
        cuisines.push(cuisine.cuisineType)
    });

    res.status(200).json({ status: 'ok', cuisines });
});

router.get('/restaurant/restaurants', async (req, res, next) => {
    let restaurants = await utilModel.getAllRestaurants();
    res.status(200).json({ status: 'ok', restaurants });
});

module.exports = router;
