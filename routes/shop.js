const express = require('express');
const { shopView, shopItems, adminShop, adminShopCreateView, adminShopCreate, adminShopUpdateView, adminShopUpdate, shopItemDetail } = require('../controllers/shopController')
const router = express.Router();
const verifyUser = require('../utils/verifyToken');

router.get('/shop', verifyUser(['admin', 'user']), shopView);
router.get('/shop/items', verifyUser(['admin', 'user']), shopItems);
router.get('/shop/items/:itemId', verifyUser(['admin', 'user']), shopItemDetail);
router.get('/adminShop', verifyUser(['admin']), adminShop);
router.get('/adminShop/create', verifyUser(['admin']), adminShopCreateView);
router.post('/adminShop/create', verifyUser(['admin']), adminShopCreate);
router.get('/adminShop/:productId', verifyUser(['admin']), adminShopUpdateView);
router.post('/adminShop/:productId', verifyUser(['admin']), adminShopUpdate);

module.exports = router;
