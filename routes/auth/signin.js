const express = require('express');
const { signinView, signin } = require('../../controllers/auth/signinController')
const router = express.Router();

router.get('/signin', signinView)

router.post('/signin', signin)

module.exports = router;
