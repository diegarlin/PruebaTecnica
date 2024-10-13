const express = require('express')
const { register, login, perfil } = require('../controllers/authController')
const router = express.Router()
const { authenticateJWT } = require('../middlewares/authMiddlewares')

router.post('/register', register)

router.post('/login', login)

router.get('/perfil', authenticateJWT, perfil)

module.exports = router
