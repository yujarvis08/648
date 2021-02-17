const db = require('../db');

let sql = 'CREATE DATABASE IF NOT EXISTS team3db';
db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Database created (if it did not exist)...');
});

db.end();