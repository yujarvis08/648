require('dotenv').config();

let customerModel;
let accountModel;
let db;

// ! delivery driver must be created AFTER restaurant

const customer = {
    name: "Alex",
    accountId: null
}
const customerAccount = {
    userType: "customer",
    email: "customer@mail.com",
    password: "testpass",
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    accountModel = require('../../models/Account');
    customerModel = require('../../models/Customer');
})


test('Inserting customer into customer table', async () => {
    let accountRes = await accountModel.insertAccount(customerAccount);
    customer.accountId = accountRes.insertId;
    let result = await customerModel.insertCustomer(customer);
    expect(result.affectedRows).toBe(1);
});


afterAll(() => {
    db = require('../../db');
    // delete all accounts (cascade also deletes customers)
    let sql = `DELETE FROM account WHERE accountId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })
    db.end();
})