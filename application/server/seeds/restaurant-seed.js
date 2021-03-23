require('dotenv').config();

let restaurantOwnerModel;
let restaurantModel;
let addressModel;
let accountModel;
let db;

const restaurantOwnerAccount = {
  userType: "restaurantOwner",
  email: "restaurantOwner@mail.com",
  password: "testpass",
}
const restaurantOwner = {
  name: "Tina",
  accountId: null
}
const address = {
  line1: "829 Cheetos Dr.",
  line2: "suite 8",
  city: "San Francisco",
  state: "California",
  zipcode: 99999
}
const restaurant = {
  name: "'Bob''s Burgers'",
  desciption: "'Awesome burgers. Come get some!'",
  priceRating: 2,
  cuisine: "'American'",
  ownerId: null,
  addressId: null
}


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
