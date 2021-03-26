/**
 * This test really likes to mess up all the other tests. I think it's
 * because it's seeding the DB, which takes longer than other functions,
 * so there is some type of concurrency problem going on.
 * 
 * To run all tests, you may temporarily rename this file to something
 * without the word "test" in it, then run npm test, then rename it back
 * and test it by itself. Still, a better solution for this needs to be found...
 */
let utilModel;
let restaurantModel;
let db;

const restaurant = {
    name: "Test restaurant",
    description: "This restaurant contains a repeated cuisine.",
    priceRating: "$$",
    cuisine: "American",
    ownerId: 1,
    addressId: null,
    imagePath: '/assets/images/restaurant/burger.jpeg'
}


beforeAll(() => {
    require('dotenv').config();
    process.env.DB_NAME = 'testdb';
    require('../../seeds/seedDB');
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