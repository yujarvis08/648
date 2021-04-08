require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const searchRoutes = require('./routes/search');
const registrationRoute = require('./routes/registration');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'build')));
}

app.use('/api/search', searchRoutes);
app.use('/api/registration', registrationRoute);

app.get('/ping', function (req, res) {
    return res.json({ msg: 'pong' });
});


if (process.env.NODE_ENV === "production") {
    app.get('/*', function (req, res) {
        console.log('TRYING TO SERVE AT:', path.join(__dirname, 'build', 'index.html'));
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 8080, () =>
    console.log(`>>> Express connection listening on port ${process.env.PORT}...`));
