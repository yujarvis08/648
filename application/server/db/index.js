/**
 * Make sure you have your environment file set up with your
 * own local DB password with the variable name DB_PASSWORD.
 * You should also set up the DB_NAME variable to team3db.
 */
const mysql = require('mysql');
require('dotenv').config();
const dbName = process.env.DB_NAME;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: dbName
});

// const db = mysql.createPool({
//     connectionLimit: 50,
//     host: 'localhost',
//     user: 'root',
//     password: process.env.DB_PASSWORD,
//     database: dbName
// });

db.connect((err) => {
    if (err) {
        throw err;
    }
    // console.log(`>>> MySQL connected to ${dbName}...`);
})

module.exports = db;