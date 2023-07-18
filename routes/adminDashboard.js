const express = require('express');
const { adminDashboard } = require('../controllers/adminDashboardController')
const router = express.Router();

router.get('/adminDashboard', adminDashboard)

module.exports = router;
