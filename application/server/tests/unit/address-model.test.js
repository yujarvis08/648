require('dotenv').config();

let addressModel;
let db;

// ! delivery driver must be created AFTER restaurant

const address = {
    line1: "829 Cheetos Dr.",
    line2: "'Awesome burgers. Come get some!'",
    city: "San Francisco",
    state: "California",
    zipcode: 99999
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    addressModel = require('../../models/Address');
})


test('Inserting address into address table', async () => {
    let result = await addressModel.insertAddress(address);
    expect(result.affectedRows).toBe(1);
});


afterAll(() => {
    db = require('../../db');
    // delete all addresses from testdb
    let sql = `DELETE FROM address WHERE addressId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })
    db.end();
})