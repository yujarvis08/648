require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//const db = require('./db');, 'utf8'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'build')));
}

app.get('/ping', function (req, res) {
    return res.json({ msg: 'pong' });
});

app.post('/addMenuItem', (req, res) => {
    let body = req.body;
    console.log('request body', body);
    return res.json(body);
})

if (process.env.NODE_ENV === "production") {
    app.get('/*', function (req, res) {
        console.log('TRYING TO SERVE AT:', path.join(__dirname, 'build', 'index.html'));
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 8080, () =>
    console.log(`>>> Express connection listening on port ${process.env.PORT}...`));
