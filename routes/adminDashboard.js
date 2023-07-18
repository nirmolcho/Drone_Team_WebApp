const express = require('express');
const { adminDashboard } = require('../controllers/adminDashboardController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/adminDashboard', verifyUser(['admin']), adminDashboard)

module.exports = router;
