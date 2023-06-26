const express = require('express');
const { supportView } = require('../../../OneDrive/שולחן העבודה/תואר מדעי המחשב/ד. תואר במדעי המחשב - שנה ב - סמסטר ב/א. פיתוח אפליקציות אינטרנטיות/א. פרוייקט/added - admin create product_added validation for frontend and backend_ and added token validation_v4/drone-v4/controllers/supportController')
const router = express.Router();

router.get('/support', supportView)

module.exports = router;
