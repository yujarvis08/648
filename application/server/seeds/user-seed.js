const accountModel = require('../models/Account');
const customerModel = require('../models/Customer');
const restaurantOwnerModel = require('../models/RestaurantOwner');
const restaurantModel = require('../models/Restaurant');
const addressModel = require('../models/Address');
const deliveryDriverModel = require('../models/DeliveryDriver');
const db = require('../db');


// ! delivery driver must be created AFTER restaurant
const accounts = [
    {
        userType: "customer",
        email: "customer@mail.com",
        password: "testpass",
    },
    {
        userType: "restaurantOwner",
        email: "owner@restaurant.com",
        password: "testpass",
    },
    {
        userType: "deliveryDriver",
        email: "driver@mail.com",
        password: "testpass",
    },
]

// create an account for each type of user
// also creates a restaurant for the owner (no menu yet)
function seedDB(accounts) {
    return new Promise((resolve, reject) => {

        accounts.forEach(async (account) => {
            let accountRes = await accountModel.insertAccount(account);

            if (account.userType === 'customer') {
                let customer = {
                    name: "Alex",
                    accountId: accountRes.insertId
                }
                await customerModel.insertCustomer(customer);

                // insert restaurant owner (make restaurant too)
            } else if (account.userType === 'restaurantOwner') {
                let owner = {
                    name: "Tina",
                    accountId: accountRes.insertId
                }
                let ownerRes = await restaurantOwnerModel.insertOwner(owner)

                // insert restaurant address
                let address = {
                    line1: "829 Cheetos Dr.",
                    line2: "suite 8",
                    city: "San Francisco",
                    state: "California",
                    zipcode: 99999
                }
                let addressRes = await addressModel.insertAddress(address);

                // create restaurant
                let restaurant = {
                    name: "'Bob''s Burgers'",
                    desciption: "'Awesome burgers. Come get some!'",
                    priceRating: 2,
                    cuisine: "'American'",
                    ownerId: ownerRes.insertId,
                    addressId: addressRes.insertId,
                }
                await restaurantModel.insertRestaurant(restaurant);

                // insert delivery driver (link to restaurant)
            } else if (account.userType === 'deliveryDriver') {
                let restaurants = await restaurantModel.getAll();
                console.log('restaurants from getAll()', restaurants);

                let deliveryDriver = {
                    name: "Tyrone",
                    accountId: accountRes.insertId,
                    restaurantId: restaurants[0].restaurantId,
                }

                await deliveryDriverModel.insertDriver(deliveryDriver);
            }
        });
        console.log('resolving');
        return resolve(true);
    });
}
seedDB(accounts).then(res => {
    console.log('res:', res);
    db.end((err) => {
        if (err) {
            return console.log('error closing db connection:' + err.message);
        }
        console.log('Database connection closed.');
    });
}).catch(err => console.log('errrrrorrrororororo', err))
