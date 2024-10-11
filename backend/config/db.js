const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión a la base de datos SQLite establecida con éxito.')
  } catch (error) {
    console.error('No se pudo conectar con la base de datos:', error)
  }
}

module.exports = { sequelize, connectDB }
