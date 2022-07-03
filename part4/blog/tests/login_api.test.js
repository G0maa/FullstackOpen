/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

// I spent about 45 mintues trying to figure why this doesn't work,
// until I eventaully realized that this `beforeEach()`,
// doesbt actually register users i.e. they don't have passwordHash.
// await User.insertMany(helper.initalUsers)
beforeEach(async () => {
    await User.deleteMany({})
    for (const user of helper.initialUsers) {
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
    }
})

// Testing JWT through trying to access GET /api/blogs,
// Seems better than verifying the JWT here, as in the SECRET
// should be a secret and all. : )
describe('Loggging in:', () => {
    test('When correct credintials', async () => {
        const user = {
            username: 'admin',
            password: 'security',
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)

        const { token } = response.body
        console.log(token)
        await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
    })

    test('When wrong credntials', async () => {
        const user = {
            username: 'root',
            password: 'wrongPassword',
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(401)

        expect(response.body.error).toEqual('invalid username or password')
    })

    test('When missing credntials', async () => {
        const user = {
            username: 'root',
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(400)

        expect(response.body.error).toEqual('username and password required')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
