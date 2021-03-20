const db = require('../db');

const insertBusinessSchedule = (businessSchedule) => {
    let sql = `INSERT INTO businessSchedule(day, openingHour, closingHour) ` +
			  `VALUES("${businessSchedule.day}",` +
			  `"${businessSchedule.openingHour}",`+
			  `"${businessSchedule.closingHour}")`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Inserted businessSchedule into DB.', result);
    });
}
module.exports = {insertBusinessSchedule};
