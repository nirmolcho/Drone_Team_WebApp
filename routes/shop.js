const express = require('express');
const { shopView, shopItems } = require('../controllers/shopController')
const router = express.Router();

router.get('/shop', shopView);
router.get('/shop/items', shopItems);

module.exports = router;
