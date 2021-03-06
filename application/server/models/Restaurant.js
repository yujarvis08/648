const db = require('../db');

exports.insertRestaurant = (restaurant) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT into restaurant(name, description, priceRating,
             cuisine, ownerId, addressId, imagePath, lat, lng, distance) 
                values("${restaurant.name}", "${restaurant.description}", "${restaurant.priceRating}", 
                    "${restaurant.cuisine}", ${restaurant.ownerId}, ${restaurant.addressId}, "${restaurant.imagePath}",
                    ${restaurant.lat}, ${restaurant.lng}, ${restaurant.distance})`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted restaurant into DB. restaurantID:', result.insertId);
            return resolve(result);
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurant WHERE approved = 1`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log('Number of restaurants returned from getAll():', result.length);
            return resolve(result);
        });
    });
}

exports.getByName = (pattern) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurant WHERE 
        (name LIKE '%${pattern}%' OR
        description LIKE '%${pattern}%' OR
        cuisine LIKE '%${pattern}%') AND approved = 1`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log(`Restaurants matching pattern [${pattern}]:`, result);
            return resolve(result);
        });

    });
}

exports.getByCuisine = (cuisine) => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurant WHERE cuisine = '${cuisine}' AND approved = 1`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log(`Restaurants matching cuisine [${cuisine}]:`, result);
            return resolve(result);
        });

    });
}

exports.insertCuisine = cuisineType => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO cuisine(cuisineType)
            VALUES("${cuisineType}")`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getCuisines = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT cuisineType FROM cuisine`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getOwnerRestaurantId = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT res.restaurantId FROM restaurant res
            JOIN restaurantOwner ro ON res.ownerId = ro.ownerId
            WHERE accountId = ${accountId}`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}