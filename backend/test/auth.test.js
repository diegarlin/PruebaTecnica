const request = require('supertest')
const app = require('../app')
const Usuario = require('../models/Usuario')
const { sequelize } = require('../config/db')
const { beforeAll, describe, it, expect, afterAll } = require('@jest/globals')

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

afterAll(async () => {
  await sequelize.close()
})

describe('Endpoints de Autenticación', () => {
  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'testpassword'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('message', 'El usuario testuser ha sido creado correctamente')
  })

  it('no debería registrar un usuario con nombre de usuario existente', async () => {
    await Usuario.create({
      email: 'existing@example.com',
      username: 'existinguser',
      password: 'hashedPassword'
    })

    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'new@example.com',
        username: 'existinguser',
        password: 'newpassword'
      })
    expect(res.statusCode).toEqual(409)
    expect(res.body).toHaveProperty('message', 'Ya existe un usuario con ese mismo nombre de usuario')
  })

  it('no debería registrar un usuario sin nombre de usuario', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'new@example.com',
        password: 'newpassword'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message', 'Debe introducir un usuario y contraseña para registrarse')
  })

  it('no debería registrar un usuario cuando el nombre de usuario y la contraseña son iguales', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        email: 'new@example.com',
        username: 'newuser',
        password: 'newuser'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message', 'El usuario y contraseña no pueden ser el mismo')
  })

  it('debería iniciar sesión de un usuario existente', async () => {
    const hashedPassword = require('bcryptjs').hashSync('testpassword')
    await Usuario.create({
      email: 'login@example.com',
      username: 'loginuser',
      password: hashedPassword
    })

    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'loginuser',
        password: 'testpassword'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })

  it('no debería iniciar sesión si no hay contraseña', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'loginuser'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message', 'Debe introducir un usuario y contraseña para loguearse')
  })

  it('no debería iniciar sesión con una contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'loginuser',
        password: 'wrongpassword'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('message', 'La contraseña no es correcta')
  })

  it('debería acceder a la ruta protegida con un token válido', async () => {
    const hashedPassword = require('bcryptjs').hashSync('testpassword')
    const user = await Usuario.create({
      email: 'protected@example.com',
      username: 'protecteduser',
      password: hashedPassword
    })

    const token = require('jsonwebtoken').sign({
      id: user.id,
      username: user.username
    }, process.env.JWT_TOKEN, { expiresIn: '1h' })

    const res = await request(app)
      .get('/api/perfil')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message', `Bienvenido ${user.username}`)
  })

  it('no debería acceder a la ruta protegida sin token', async () => {
    const res = await request(app)
      .get('/api/perfil')
    expect(res.statusCode).toEqual(403)
    expect(res.body).toHaveProperty('message', 'Token no proporcionado')
  })

  it('debería no autorizar si el token no es correcto', async () => {
    const res = await request(app)
      .get('/api/perfil')
      .set('Authorization', 'Bearer tokenFalso')
    expect(res.statusCode).toEqual(401)
    expect(res.body).toHaveProperty('message', 'Token inválido')
  })
})
