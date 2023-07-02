const express = require('express');
const { userHome } = require('../controllers/userHomeController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/userHome', verifyUser(['user']), userHome)

module.exports = router;
