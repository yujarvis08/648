const db = require('../db');

exports.insertRestaurant = (restaurant) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT into restaurant(name, description, priceRating, cuisine, ownerId, addressId, imagePath) 
                values("${restaurant.name}", "${restaurant.desciption}", "${restaurant.priceRating}", 
                    "${restaurant.cuisine}", ${restaurant.ownerId}, ${restaurant.addressId}, "${restaurant.imagePath}")`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted restaurant into DB. restaurantID:', result.insertId);
            return resolve(result);
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurant`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log('Number of restaurants returned from getAll():', result.length);
            return resolve(result);
        });
    });
}

exports.getByName = (pattern) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurant WHERE name LIKE '%${pattern}%'`;
        // let sql = `SELECT r.restaurantId, r.ownerId, r.name, r.description, r.cuisine, r.priceRating, 
        // a.line1, a.line2, a.city, a.state, a.zipcode 
        // FROM restaurant r 
        // LEFT JOIN address a ON r.addressId = a.addressId
        // WHERE name LIKE '%${pattern}%'`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log(`Restaurants matching pattern [${pattern}]:`, result);
            return resolve(result);
        });

    });
}

exports.getByCuisine = (cuisine) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurant WHERE cuisine = '${cuisine}'`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log(`Restaurants matching cuisine [${cuisine}]:`, result);
            return resolve(result);
        });

    });
}