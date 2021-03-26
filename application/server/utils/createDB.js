const db = require('../db');
var fs = require('fs');

let sql = ''
try {
    sql = fs.readFileSync(`${__dirname}/team3db.sql`, 'utf8');
} catch (e) {
    console.log('Error:', e.stack);
}

db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Database created and tables initiated...');
});

db.end();