/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  // You have to insert it like this because you need passwordHash in DB.
  for (const user of helper.initialUsers) {
    await api.post('/api/users').send(user).expect(201)
  }
})

describe('User creation', () => {
  test('When correct information', async () => {
    const newUser = {
      username: 'Eslam',
      name: 'Noor',
      password: 'AlaaElddin',
    }

    await api.post('/api/users').send(newUser).expect(201)

    const users = await api.get('/api/users')

    expect(users.body).toHaveLength(helper.initialUsers.length + 1)

    const names = users.body.map((user) => user.name)
    expect(names).toContain(newUser.name)
  })

  test('When no password and username are given', async () => {
    const newUser = {
      name: 'Noor',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)

    expect(response.body.error).toEqual('Missing username or passsword')

    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(helper.initialUsers.length)
  })

  test('When password and/or username less than 3 characters', async () => {
    const newUser = {
      username: 'Es',
      name: 'Noor',
      password: 'An',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)

    expect(response.body.error).toEqual(
      'Username and password has to be more than 3 characters'
    )

    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(helper.initialUsers.length)
  })

  test('When user info is not unique', async () => {
    const newUser = {
      username: 'root',
      name: 'test',
      password: 'test',
    }

    const response = await api.post('/api/users').send(newUser).expect(400)

    expect(response.body.error).toEqual('Username has to be unique')

    const users = await api.get('/api/users')
    expect(users.body).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
