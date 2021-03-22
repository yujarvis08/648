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
    name: "'Bob''s Burgers'",
    desciption: "'Awesome burgers. Come get some!'",
    priceRating: 2,
    cuisine: "'American'",
    ownerId: null,
    addressId: null
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    accountModel = require('../../models/Account');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
    addressModel = require('../../models/Address');
    restaurantModel = require('../../models/Restaurant');
    db = require('../../db');
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

afterAll(() => {
    // delete all accounts (cascade also deletes restaurantOwner) from testdb
    let sql = `DELETE FROM account WHERE accountId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })

    sql = `DELETE FROM address WHERE addressId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })

    db.end();
})