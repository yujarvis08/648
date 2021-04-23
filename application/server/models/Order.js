const db = require('../db');



exports.insertOrder = restaurantId => {
	return new Promise((resolve, reject) => {

        let sql = `INSERT INTO restaurantOrder(restaurantId)
					VALUES(${restaurantId})`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menuItem into DB. itemId:', result.insertId);
			resolve(result);
		})
    });
};
