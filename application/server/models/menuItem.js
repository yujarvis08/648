const db = require('../db');

exports.insertMenuItem = (menuItem) => {

	return new Promise((resolve, reject) => {

		let sql = `INSERT INTO menuItem(menuId, name, description, price)
					VALUES(${menuItem.menuId},
					"${menuItem.name}",
					"${menuItem.description}",
					${menuItem.price})`

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menuItem into DB. itemId:', result.insertId);
			resolve(result);
		})
	})
}
