const mysql = require('mysql');
require('dotenv').config();
const dbName = process.env.DB_NAME;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: dbName
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`>>> MySQL connected to ${dbName}...`);
})

module.exports = db;