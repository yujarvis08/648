const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log('logging in...');
    res.cookies('session_id', '123');
    res.status(200).json({msg: 'Logged in'});
});
