const { createLogin, login } = require('../controller/userController')

const router = require('express').Router()

router.post('/login', login)

router.post('/signup', createLogin)

module.exports = router