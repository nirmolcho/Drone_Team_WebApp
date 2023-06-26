const express = require('express');
const { exploreView } = require('../controllers/exploreController')
const router = express.Router();

router.get('/explore', exploreView)

module.exports = router;
