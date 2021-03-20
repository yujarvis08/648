const RestaurantModel = require('../models/Restaurant')
// TODO: Validate SQL queries. Single quotes must be doubled up

const restaurants = [
    {
        name: "'Bob''s Burgers'",
        desciption: "'Awesome burgers. Come get some!'",
        priceRating: 2,
        cuisine: "'American'",
        ownerId: 11111,
        addressId: 11112
    },
]

restaurants.forEach(restaurant => {
    RestaurantModel.insertRestaurant(restaurant);
});
