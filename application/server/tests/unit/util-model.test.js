let utilModel;
let restaurantModel;
let db;

const restaurant = {
    name: "Test restaurant",
    description: "This restaurant contains a repeated cuisine.",
    priceRating: "$$",
    cuisine: "American",
    ownerId: 1,
    addressId: null
}


beforeAll(() => {
    require('dotenv').config();
    process.env.DB_NAME = 'testdb';
    require('../../seeds/seedDB').seedDB();
    utilModel = require('../../models/Util');
    restaurantModel = require('../../models/Restaurant');
    db = require('../../db');
});

test('Getting all cuisines', async () => {
    // setTimeout(async () => {
    //     console.log('lol')
    // }, 3000)
    let cuisines = await utilModel.getAllCuisines();
    expect(cuisines.length).toBe(5);
})

test('Getting all UNIQUE cuisines', async () => {
    // insert a duplicate cuisine to make sure we are only getting UNIQUE values
    // let sql = `INSERT INTO restaurant(ownerId, name, description, cuisine, priceRating) VALUES ?`;
    // db.query(sql, [restaurant], (err, result) => {
    //     if (err) throw err;
    // });
    await restaurantModel.insertRestaurant(restaurant);

    let cuisines = await utilModel.getAllCuisines();
    expect(cuisines.length).toBe(5);
})

afterAll(async () => {

    // delete all accounts 
    // cascades to delete restaurantOwner, restaurant, menu, and menuitems)
    let accountModel = require('../../models/Account');
    await accountModel.deleteAll();

    let addressModel = require('../../models/Address');
    await addressModel.deleteAll();

    db.end();
})