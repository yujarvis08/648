require('dotenv').config();

let accountModel;
let db;

// ! delivery driver must be created AFTER restaurant
const accounts = {
    customer: {
        userType: "customer", email: "customer@mail.com", password: "testpass",
    },
    restaurantOwner: {
        userType: "restaurantOwner", email: "owner@restaurant.com", password: "testpass",
    },
    deliveryDriver: {
        userType: "deliveryDriver", email: "driver@mail.com", password: "testpass",
    }
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    accountModel = require('../../models/Account');
})

// Inserting accounts
test('Inserting CUSTOMER account into account table', async () => {
    let result = await accountModel.insertAccount(accounts.customer);
    expect(result.affectedRows).toBe(1);
});

test('Inserting RESTAURANT OWNER account into account table', async () => {
    let result = await accountModel.insertAccount(accounts.restaurantOwner);
    expect(result.affectedRows).toBe(1);
});

test('Inserting DELIVERY DRIVER account into account table', async () => {
    let result = await accountModel.insertAccount(accounts.deliveryDriver);
    expect(result.affectedRows).toBe(1);
});

afterAll(async () => {
    db = require('../../db');
    // delete all accounts and addresses from testdb
    accountModel = require('../../models/Account');
    await accountModel.deleteAll();

    db.end();
})