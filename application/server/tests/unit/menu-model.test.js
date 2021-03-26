require('dotenv').config();

let menuModel;
let restaurantOwnerModel;
let restaurantModel;
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

const restaurant = {
    name: "Bob;s Burgers",
    desciption: "Awesome burgers. Come get some!",
    priceRating: 2,
    cuisine: "American",
    ownerId: null,
    addressId: null,
    imagePath: '/assets/images/restaurant/burger.jpeg'
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    menuModel = require('../../models/Menu');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
    restaurantModel = require('../../models/Restaurant');
    accountModel = require('../../models/Account');
})

test('Inserting a menu and linking it to its respective restaurant', async () => {
    // step 1: create account
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    // step 2: create owner
    let ownerRes = await restaurantOwnerModel.insertOwner(restaurantOwner);
    // step 3: create restaurant
    restaurant.ownerId = ownerRes.insertId;
    let restaurantRes = await restaurantModel.insertRestaurant(restaurant);
    // step 4: create menu
    let menuRes = await menuModel.insertMenu(restaurantRes.insertId);
    expect(menuRes.affectedRows).toBe(1);
});

afterAll(async () => {
    db = require('../../db');
    // delete all accounts 
    // cascades to delete restaurantOwner, restaurant, menu, and menuItems)
    accountModel = require('../../models/Account');
    await accountModel.deleteAll();

    db.end();
})