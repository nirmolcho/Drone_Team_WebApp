const express = require('express');
const { signupView, signup } = require('../../controllers/auth/signupController')
const router = express.Router();

router.get('/signup', signupView);
router.post('/signup', signup)

module.exports = router;
