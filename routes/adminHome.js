const express = require('express');
const { adminHome } = require('../../../OneDrive/שולחן העבודה/תואר מדעי המחשב/ד. תואר במדעי המחשב - שנה ב - סמסטר ב/א. פיתוח אפליקציות אינטרנטיות/א. פרוייקט/added - admin create product_added validation for frontend and backend_ and added token validation_v4/drone-v4/controllers/adminHomeController')
const router = express.Router();

router.get('/adminHome', adminHome)

module.exports = router;
