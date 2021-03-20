const db = require('../db');

const insertCustomer = (customer) => {
    let sql = `INSERT INTO customer(name, userId) ` +
			  `VALUES("${customer.name}", ${customer.userId})`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Inserted customer into DB.', result);
    });
}

module.exports = {
    insertCustomer,
}
