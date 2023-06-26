const express = require('express');
const { supportView } = require('../controllers/supportController')
const router = express.Router();

router.get('/support', supportView)

module.exports = router;
