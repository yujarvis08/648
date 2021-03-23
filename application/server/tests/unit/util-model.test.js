let utilModel;
let db;

const restaurant = [
    [
        1,
        "Test restaurant",
        "This restaurant contains a repeated cuisine.",
        "'American'",
        2,
    ]
]

beforeAll(() => {
    require('dotenv').config();
    process.env.DB_NAME = 'testdb';
    require('../../seeds/seedDB');
    utilModel = require('../../models/Util');
    db = require('../../db');
});

test('Getting all cuisines', async () => {
    let cuisines = await utilModel.getAllCuisines();
    expect(cuisines.length).toBe(5);
})

test('Getting all UNIQUE cuisines', async () => {
    // insert a duplicate cuisine to make sure we are only getting UNIQUE values
    let sql = `INSERT INTO restaurant(ownerId, name, description, cuisine, priceRating) VALUES ?`;
    db.query(sql, [restaurant], (err, result) => {
        if (err) throw err;
    });

    let cuisines = await utilModel.getAllCuisines();
    expect(cuisines.length).toBe(5);
})

afterAll(() => {
    // delete all accounts 
    // cascades to delete restaurantOwner, restaurant, menu, and menuitems)
    let sql = `DELETE FROM account WHERE accountId > -1`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    });

    sql = `DELETE FROM address WHERE addressId > -1`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })

    db.end();
})