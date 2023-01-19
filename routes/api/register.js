const express = require('express')
const handleRegister = require('../../controllers/registerController')
const router = express.Router()

// post route for registering new user
router.post('/api/register', handleRegister)

module.exports = router