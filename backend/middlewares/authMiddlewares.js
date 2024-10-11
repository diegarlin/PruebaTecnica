const jwt = require('jsonwebtoken')
require('dotenv').config()

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

module.exports = { authenticateJWT }
