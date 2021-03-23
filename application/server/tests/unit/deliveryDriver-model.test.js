require('dotenv').config();
let driverModel;
let restaurantModel;
let restaurantOwnerModel;
let accountModel;

// driver data
const deliveryDriver = {
    name: "John",
    accountId: null,
    restaurantId: null
}

const account = {
    userType: "deliveryDriver",
    email: "deliveryDriver@mail.com",
    password: "testpass"
}

// restaurant data
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
    name: "'Bob''s Burgers'",
    desciption: "'Awesome burgers. Come get some!'",
    priceRating: 2,
    cuisine: "'American'",
    ownerId: null,
    addressId: null
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    driverModel = require('../../models/DeliveryDriver');
    restaurantModel = require('../../models/Restaurant');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
    accountModel = require('../../models/Account');
    db = require('../../db');
})

test('Inserting a delivery driver', async () => {
    // Create a restaurant
    // step 1: create restaurant owner account
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    // step 2: create owner
    let ownerRes = await restaurantOwnerModel.insertOwner(restaurantOwner);
    restaurant.ownerId = ownerRes.insertId;
    // step 4: create restaurant
    let restaurantRes = await restaurantModel.insertRestaurant(restaurant);

    // Insert driver
    // Step 1: Get a restaurant ID
    deliveryDriver.restaurantId = restaurantRes.insertId;
    // Step 2: Create driver's account
    accountRes = await accountModel.insertAccount(account);
    deliveryDriver.accountId = accountRes.insertId;
    // Step 3: Create driver
    let driverRes = await driverModel.insertDriver(deliveryDriver);
    expect(driverRes.affectedRows).toBe(1);
});

afterAll(() => {
    // delete all accounts 
    // cascades to delete restaurantOwner, restaurant, menu, and menuitems)
    let sql = `DELETE FROM account WHERE accountId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    });

    db.end();
})