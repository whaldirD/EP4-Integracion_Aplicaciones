const express = require('express')
const router = express.Router()
const autenController = require('../controller/autenController')

router.post('/registrar', autenController.registrar)
router.post('/login', autenController.login)

module.exports = router