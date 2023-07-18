const express = require('express');
const { supportView, contactSend } = require('../controllers/supportController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/support', verifyUser(['user']), supportView)
router.post('/support', verifyUser(['user']), contactSend)

module.exports = router;
