const db = require('../db');

exports.insertRestaurant = (restaurant) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT into restaurant(name, description, priceRating, cuisine, ownerId, addressId) 
                values(${restaurant.name}, ${restaurant.desciption}, ${restaurant.priceRating}, 
                    ${restaurant.cuisine}, ${restaurant.ownerId}, ${restaurant.addressId})`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted restaurant into DB. restaurantID:', result.insertId);
            return resolve(result);
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * from restaurant`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Number of restaurants returned from getAll():', result.length);
            return resolve(result);
        });
    });
}

