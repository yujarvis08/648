require('dotenv').config();

let restaurantOwnerModel;
let accountModel;
let db;

// ! delivery driver must be created AFTER restaurant

const restaurantOwner = {
    name: "Tina",
    accountId: null
}
const restaurantOwnerAccount = {
    userType: "restaurantOwner",
    email: "restaurantOwnerTest@mail.com",
    password: "testpass",
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    accountModel = require('../../models/Account');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
})


test('Inserting restaurant owner into restaurant owner table', async () => {
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    let result = await restaurantOwnerModel.insertOwner(restaurantOwner);
    expect(result.affectedRows).toBe(1);
});


afterAll(async () => {
    db = require('../../db');

    // delete all accounts (cascade also deletes restaurantOwner) from testdb
    accountModel = require('../../models/Account');
    await accountModel.deleteAccountByEmail(restaurantOwnerAccount.email);

    db.end();
})