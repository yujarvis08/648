const db = require('../db');

const insertAddress = (address) => {
    let sql = `INSERT INTO address(line1, line2, city, state, zipcode) ` +
			  `VALUES("${address.line1}", "${address.line2}", "${address.city}",`
			+ `"${address.state}", ${address.zipcode})`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Inserted address into DB.', result);
    });
}

module.exports = {
    insertAddress,
};
