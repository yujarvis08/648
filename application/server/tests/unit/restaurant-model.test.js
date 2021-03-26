require('dotenv').config();

let restaurantOwnerModel;
let restaurantModel;
let addressModel;
let accountModel;
let db;

const restaurantOwnerAccount = {
    userType: "restaurantOwner",
    email: "restaurantOwner@mail.com",
    password: "testpass",
}
const restaurantOwner = {
    name: "Tina",
    accountId: null
}
const address = {
    line1: "829 Cheetos Dr.",
    line2: "suite 8",
    city: "San Francisco",
    state: "California",
    zipcode: 99999
}
const restaurant = {
    name: "Bob's Burgers",
    desciption: "Awesome burgers. Come get some!",
    priceRating: "$$",
    cuisine: "American",
    ownerId: null,
    addressId: null,
    imagePath: '/assets/images/restaurant/burger.jpeg'
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    accountModel = require('../../models/Account');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
    addressModel = require('../../models/Address');
    restaurantModel = require('../../models/Restaurant');
})


test('Inserting restaurant into restaurant table', async () => {
    // step 1: create account
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    // step 2: create owner
    let ownerRes = await restaurantOwnerModel.insertOwner(restaurantOwner);
    // step 3: create address
    let addressRes = await addressModel.insertAddress(address);
    restaurant.ownerId = ownerRes.insertId;
    restaurant.addressId = addressRes.insertId;
    // step 4: create restaurant
    let result = await restaurantModel.insertRestaurant(restaurant);
    expect(result.affectedRows).toBe(1);
});

test('Selecting all restaurants.', async () => {
    // step 1: create account
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    // step 2: create owner
    let ownerRes = await restaurantOwnerModel.insertOwner(restaurantOwner);
    // step 3: create address
    let addressRes = await addressModel.insertAddress(address);
    restaurant.ownerId = ownerRes.insertId;
    restaurant.addressId = addressRes.insertId;
    // step 4: create restaurant
    await restaurantModel.insertRestaurant(restaurant);
    await restaurantModel.insertRestaurant(restaurant);
    let restaurants = await restaurantModel.getAll();
    expect(restaurants.length).toBeGreaterThan(1);
});

// assumes there's already been a restaurant inserted before this test.
test('Selecting restaurants matching a pattern.', async () => {
    let restaurantRes = await restaurantModel.getByName('bob');
    expect(restaurantRes[0].name).toBe("Bob's Burgers");
});

afterAll(async () => {
    db = require('../../db');

    // delete all accounts 
    // cascades to delete restaurantOwner, restaurant, menu, and menuitems)
    accountModel = require('../../models/Account');
    await accountModel.deleteAll();

    addressModel = require('../../models/Address');
    await addressModel.deleteAll();

    db.end();
})