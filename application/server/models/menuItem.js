const db = require('../db');

exports.insertMenuItem = (menuItem) => {
	return new Promise((resolve, reject) => {
		let sql = `INSERT INTO menuItem(menuID, name, description, option, price)
					VALUES(${menuItem.menuId},
					"${menuItem.name}",
					"${menuItem.description}",
					"${menuItem.option}",
					${menuItem.price}`
		db.query(sql, (err, result) => {
			if (err) return reject(err);
            console.log('Inserted menuItem into DB.', result);
			resolve(result);
		})
	})
}
