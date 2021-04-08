const express = require('express');
const router = express.Router();

// '/api/auth/login'
router.post('/login', (req, res) => {
    console.log('logging in...');
    res.cookie('session_id', '123');
    res.status(200).json({msg: 'Logged in'});
});

module.exports = router;
