const express = require('express');
const { shopView, shopItems, adminShop, adminShopCreateView, adminShopCreate } = require('../../../OneDrive/שולחן העבודה/תואר מדעי המחשב/ד. תואר במדעי המחשב - שנה ב - סמסטר ב/א. פיתוח אפליקציות אינטרנטיות/א. פרוייקט/added - admin create product_added validation for frontend and backend_ and added token validation_v4/drone-v4/controllers/shopController')
const router = express.Router();
const verifyUser = require('../../../OneDrive/שולחן העבודה/תואר מדעי המחשב/ד. תואר במדעי המחשב - שנה ב - סמסטר ב/א. פיתוח אפליקציות אינטרנטיות/א. פרוייקט/added - admin create product_added validation for frontend and backend_ and added token validation_v4/drone-v4/utils/verifyToken');

router.get('/shop', shopView);
router.get('/shop/items', shopItems);
router.get('/adminShop', verifyUser(['admin']), adminShop);
router.get('/adminShop/create', verifyUser(['admin']), adminShopCreateView);
router.post('/adminShop/create', verifyUser(['admin']), adminShopCreate);

module.exports = router;
