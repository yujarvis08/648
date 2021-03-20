const db = require('../db');

const insertUser = () => {
    let sql = `INSERT INTO user VALUES(DEFAULT)`;
    db.query(sql, (err, result) => {
        if (err) throw err;
		console.log('Inserted user into DB.', result);
    });
}

module.exports = {
    insertUser,
};
