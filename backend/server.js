const app = require('./app')
const { connectDB } = require('./config/db')
const Usuario = require('./models/Usuario')
require('dotenv').config()

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
