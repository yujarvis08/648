require('dotenv').config();

let accountModel;
// let db;

// ! delivery driver must be created AFTER restaurant
const accounts = {
    customer: {
        userType: "customer", email: "customerAccTest@mail.com", password: "testpass",
    },
    restaurantOwner: {
        userType: "restaurantOwner", email: "ownerAccTest@restaurant.com", password: "testpass",
    },
    deliveryDriver: {
        userType: "deliveryDriver", email: "driverAccTest@mail.com", password: "testpass",
    }
}

beforeAll(() => {
    // process.env.DB_NAME = 'testdb';
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

test('Deleting an account by email', async () => {
    let result = await accountModel.deleteAccountByEmail(accounts.customer.email);
    expect(result.affectedRows).toBe(1);
});

afterAll(async () => {
    // delete all accounts and addresses from testdb
    accountModel = require('../../models/Account');
    // clean up all the accounts that were inserted during tests
    await accountModel.deleteAccountByEmail(accounts.deliveryDriver.email);
    await accountModel.deleteAccountByEmail(accounts.restaurantOwner.email);

    db = require('../../db');
    db.end();
})