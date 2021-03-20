const db = require('../db');

const insertRestaurant = (restaurant) => {
    let sql = `INSERT into restaurant(name, description, priceRating, cuisine, ownerId, address) 
                values(${restaurant.name}, ${restaurant.desciption}, ${restaurant.priceRating}, 
                    ${restaurant.cuisine}, ${restaurant.ownerId}, ${restaurant.addressId})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Inserted restaurant into DB.', result);
    });
}

module.exports = {
    insertRestaurant,
};