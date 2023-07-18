const express = require('express');
const { userDashboard } = require('../controllers/userDashboardController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/userDashboard', verifyUser(['user']), userDashboard)

module.exports = router;
