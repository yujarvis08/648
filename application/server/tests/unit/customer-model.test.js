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
    email: "customerTest@mail.com",
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


afterAll(async () => {
    db = require('../../db');
    // delete all accounts (cascade also deletes customers)
    accountModel = require('../../models/Account');
    await accountModel.deleteAccountByEmail(customerAccount.email);

    db.end();
})