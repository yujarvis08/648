const db = require('../db');

exports.insertRestaurant = (restaurant) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT into restaurant(name, description, priceRating, cuisine, ownerId, addressId) 
                values(${restaurant.name}, ${restaurant.desciption}, ${restaurant.priceRating}, 
                    ${restaurant.cuisine}, ${restaurant.ownerId}, ${restaurant.addressId})`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted restaurant into DB.', result);
            return resolve(result);
        });
    });
}

exports.getAll = () => {
    console.log('Inside getAll')
    return new Promise((resolve, reject) => {
        let sql = `SELECT * from restaurant`;
        db.query(sql, (err, result, fields) => {
            if (err) return reject(err);
            console.log('Results from get all:', result);
            return resolve(result);
        });
    });
}

