const express = require('express')
const {
    newsView
} = require('../controllers/newsController')
const router = express.Router()

router.get('/news', newsView)

module.exports = router