const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize')

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

module.exports = Usuario
