const express = require('express');
const { userHome } = require('../controllers/userHomeController')
const router = express.Router();

router.get('/userHome', userHome)

module.exports = router;
