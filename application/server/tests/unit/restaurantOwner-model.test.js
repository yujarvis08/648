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
    email: "restaurantOwner@mail.com",
    password: "testpass",
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    accountModel = require('../../models/Account');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
    db = require('../../db');
})


test('Inserting restaurant owner into restaurant owner table', async () => {
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    let result = await restaurantOwnerModel.insertOwner(restaurantOwner);
    expect(result.affectedRows).toBe(1);
});


afterAll(() => {
    // delete all accounts (cascade also deletes restaurantOwner) from testdb
    let sql = `DELETE FROM account WHERE accountId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })

    db.end();
})