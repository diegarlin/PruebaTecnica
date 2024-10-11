const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
require('dotenv').config()

const register = async (req, res) => {
  const { email, username, password } = req.body

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Debe introducir un usuario y contraseña para registrarse' })
  }

  if (username === password) {
    return res.status(400).json({ message: 'El usuario y contraseña no pueden ser el mismo' })
  }

  const user = await Usuario.findOne({ where: { username } })

  if (user != null) {
    return res.status(400).json({ message: 'Ya existe un usuario con ese mismo nombre de usuario' })
  }

  const hashedPassword = bcrypt.hashSync(password)

  try {
    const user = await Usuario.create({
      email,
      username,
      password: hashedPassword

    })

    return res.status(201).json({ message: `El usuario ${user.username} sido creado correctamente` })
  } catch (err) {
    return res.status(500).json({ message: 'No se ha podido crear el usuario' })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Debe introducir un usuario y contraseña para loguearse' })
  }
  try {
    const user = await Usuario.findOne({ where: { username } })

    if (!user) {
      return res.status(400).json({ message: 'El usuario no se ha escrito correctamente' })
    }

    const contrasenyaCorrecta = bcrypt.compareSync(password, user.password)

    if (!contrasenyaCorrecta) {
      return res.status(400).json({ message: 'La contraseña no es correcta' })
    }

    const token = jwt.sign({
      id: user.id,
      username: user.username
    },
    process.env.JWT_TOKEN,
    { expiresIn: '1h' })

    res.status(200).json({ token })
  } catch (err) {
    return res.status(500).json({ message: 'No se ha podido loguear' })
  }
}

module.exports = { register, login }
