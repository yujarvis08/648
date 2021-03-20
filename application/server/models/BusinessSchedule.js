const db = require('../db');

const insertBusinessSchedule = (businessSchedule) => {
	new Promise((resolve, reject) => {
		let sql = `INSERT INTO businessSchedule(day, openingHour, closingHour) ` +
				  `VALUES("${businessSchedule.day}",` +
				  `"${businessSchedule.openingHour}",`+
				  `"${businessSchedule.closingHour}")`;
		db.query(sql, (err, result) => {
			if (err) return reject(err);
			console.log('Inserted businessSchedule into DB.', result);
			return resolve(result);
		});
	});
}
module.exports = {insertBusinessSchedule};
