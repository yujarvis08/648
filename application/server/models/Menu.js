const db = require('../db');

exports.insertMenu = (menu) => {
	return new Promise((resolve, reject) => {

		let sql = `INSERT INTO menu VALUES(default)`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			console.log('Inserted menu into DB.', result);
			resolve(result);
		});
	});
}
