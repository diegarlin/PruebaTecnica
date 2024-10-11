const express = require('express')
const { connectDB } = require('./config/db')
const Usuario = require('./models/Usuario')
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()

const app = express()

app.use(express.json())
app.disable('x-powered-by')
app.use('/api', authRoutes)

const PORT = 3000

const startServer = async () => {
  try {
    await connectDB()

    await Usuario.sync()

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar el servidor:', error)
  }
}

startServer()

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_TOKEN)
    console.log(decoded)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}

app.get('/perfil', authenticateJWT, (req, res) => {
  res.json({
    message: `Bienvenido ${req.user.username}`,
    user: req.user
  })
})
