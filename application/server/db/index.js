const mysql = require('mysql');

const dbName = 'team3db';

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