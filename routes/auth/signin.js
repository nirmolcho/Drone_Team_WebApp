const express = require('express');
const { signinView, signin } = require('../../controllers/auth/signinController')
router.get('/signin', signinView)

router.post('/signin', signin)

module.exports = router;
