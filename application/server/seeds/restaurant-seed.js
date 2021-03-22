const RestaurantModel = require('../models/Restaurant')
const db = require('../db');

// TODO: Validate SQL queries. Single quotes must be doubled up

const restaurants = [
  {
    name: "'Bob''s Burgers'",
    desciption: "'Awesome burgers. Come get some!'",
    priceRating: 2,
    cuisine: "'American'",
    ownerId: 1,
    addressId: 1
  },
]

restaurants.forEach(restaurant => {
  RestaurantModel.insertRestaurant(restaurant);
});

// close mysql connection
db.end(function (err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
