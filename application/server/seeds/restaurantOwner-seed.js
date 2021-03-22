const RestaurantOwnerModel = require('../models/RestaurantOwner')
const db = require('../db');

const restaurantOwners = [
  {
    name: "Tina",
    userId: 1,
  }, {
    name: "Johnny",
    userId: 2,
  }
]

restaurantOwners.forEach(restaurantOwner => {
  RestaurantOwnerModel.insertOwner(restaurantOwner);
});

// close mysql connection
db.end(function (err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
