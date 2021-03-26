const db = require('../db');

exports.insertMenu = (restaurantId) => {
	return new Promise((resolve, reject) => {

		let sql = `INSERT INTO menu(restaurantId) VALUES(${restaurantId})`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menu into DB. menuId:', result.insertId);
			resolve(result);
		});
	});
}

exports.deleteAll = () => {
	return new Promise((resolve, reject) => {

		let sql = `DELETE FROM menu WHERE menuId > -1`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
	});
}