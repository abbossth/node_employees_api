const express = require('express')
const router = express.Router()
const handleLogout = require('../../controllers/logoutController')

router.get('/api/logout', handleLogout)

module.exports = router