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
    utilModel = require('../../models/Util');
    restaurantModel = require('../../models/Restaurant');
});

test('Getting all cuisines', async () => {
    let cuisines = await utilModel.getAllCuisines();
    expect(cuisines.length).toBeGreaterThanOrEqual(5);
})

test('Getting all UNIQUE cuisines', async () => {
    // insert a duplicate cuisine to make sure we are only getting UNIQUE values
    let cuisinesBefore = await utilModel.getAllCuisines();
    let numCuisinesBefore = cuisinesBefore.length;

    await restaurantModel.insertRestaurant(restaurant);

    let cuisinesAfter = await utilModel.getAllCuisines();
    // # cuisines before should == # cuisines after
    expect(cuisinesAfter.length).toBe(numCuisinesBefore);
})

afterAll(async () => {
    db = require('../../db');
    db.end();
})