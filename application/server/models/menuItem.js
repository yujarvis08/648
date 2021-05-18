const db = require('../db');

exports.insertMenuItem = (menuId, menuItem) => {
	//console.log('inserMenuItem menuItem:', menuId, menuItem);

	return new Promise((resolve, reject) => {

		let sql = `INSERT INTO menuItem(menuId, name, description, price)
					VALUES(${menuId},
					"${menuItem.name}",
					"${menuItem.description}",
					${menuItem.price})`

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menuItem into DB. itemId:', result.insertId);
			return resolve(result);
		})
	})
}

exports.removeMenuItem = (itemId) => {
	return new Promise((resolve, reject) => {
		let sql = `DELETE FROM menuItem WHERE itemId = ${itemId}`;
		db.query(sql, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		})
	});
}

exports.getAllMenuItems = (restaurantId) => {
	return new Promise((resolve, reject) => {
		let sql = `SELECT mi.menuItemId, menu.menuId, mi.name, mi.description, mi.price
			FROM menuItem mi
			JOIN menu ON menu.menuId = mi.menuId
			JOIN restaurant res ON res.restaurantId = menu.restaurantId
			WHERE res.restaurantId = ${restaurantId}`;
		db.query(sql, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		})
	});

}
