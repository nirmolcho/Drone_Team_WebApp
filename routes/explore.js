const express = require('express');
const { exploreView } = require('../controllers/exploreController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/explore', verifyUser(['user']), exploreView)

module.exports = router;
