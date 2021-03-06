require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

/* ========== Routes ========== */
const searchRoutes = require('./routes/search');
const registrationRoute = require('./routes/registration');
const authRoute = require('./routes/auth');
const ordersRoute = require('./routes/orders');
const shoppingCartRoute = require('./routes/shoppingCart');
const restaurantRoute = require('./routes/restaurant');
const accountInfoRoute = require('./routes/accountInfo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ // enable uploading photos
    createParentPath: true
}));
/* static folder */
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, 'build')));
// }
app.use(express.static(path.join(__dirname, 'public')));


/* ===== Middleware ====== */
app.use('/api/search', searchRoutes);
app.use('/api/registration', registrationRoute);
app.use('/api/auth', authRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/shoppingCart', shoppingCartRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/accountInfo', accountInfoRoute);

if (process.env.NODE_ENV === "production") {
    app.get('/*', function (req, res) {
        console.log('TRYING TO SERVE AT:', path.join(__dirname, 'public', 'index.html'));
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

app.listen(process.env.PORT || 8080, () =>
    console.log(`>>> Express connection listening on port ${process.env.PORT}...`));

module.exports = app;
