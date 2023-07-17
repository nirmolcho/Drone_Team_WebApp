const express = require('express');
const { purchaseView } = require('../controllers/purchaseController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/purchase', verifyUser(['admin', 'user']), purchaseView)

module.exports = router;