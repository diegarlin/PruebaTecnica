const express = require('express')
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

app.use(express.json())
app.disable('x-powered-by')
app.use('/api', authRoutes)

app.get('/', (req, res) => {
  res.send('API de usuarios')
})

module.exports = app
