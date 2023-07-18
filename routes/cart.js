const express = require('express');
const { myCartView, myCartCreate, myCartDelete, myCartCheckout } = require('../controllers/cartController');
const verifyUser = require('../utils/verifyToken');
const router = express.Router();

router.get('/mycart', verifyUser(['user']), myCartView);
router.post('/mycart', verifyUser(['user']), myCartCreate);
router.post('/mycart/delete', verifyUser(['user']), myCartDelete);
router.post('/mycart/checkout', verifyUser(['user']), myCartCheckout);

module.exports = router;
