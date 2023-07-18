const express = require('express');
const { flightAdd, flightView } = require('../controllers/flightController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/flight', verifyUser(['user']), flightView)
router.post('/flight', verifyUser(['user']), flightAdd)

module.exports = router;
