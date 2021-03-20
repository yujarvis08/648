const db = require('../db');

const insertRestaurant = (restaurantOwner) => {
    let sql = `INSERT INTO restaurantOwner(name, userId) `+
			  `VALUES("${restaurantOwner.name}", ${restaurantOwner.userId})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Inserted restaurantOwner into DB.', result);
    });
}

module.exports = {
    insertRestaurant,
};
