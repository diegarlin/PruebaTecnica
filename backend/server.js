const express = require('express')
const { connectDB } = require('./config/db')
const Usuario = require('./models/Usuario')
const authRoutes = require('./routes/authRoutes')
const { authenticateJWT } = require('./middlewares/authMiddlewares')
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

app.get('/perfil', authenticateJWT, (req, res) => {
  res.json({
    message: `Bienvenido ${req.user.username}`,
    user: req.user
  })
})
