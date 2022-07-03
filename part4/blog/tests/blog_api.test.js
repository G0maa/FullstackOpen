/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    helper.tokens = []
    helper.blogsId = []

    await Blog.deleteMany({})
    await User.deleteMany({})

    // Register, generatig passwordHash
    for (const user of helper.initialUsers) {
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
    }

    // Logging in, generating tokens
    for (const user of helper.initialUsers) {
        const response = await api
            .post('/api/login')
            .send({
                username: user.username,
                password: user.password,
            })

        helper.tokens.push(response.body.token)
    }

    // Posting initial blogs
    let blog = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${helper.tokens[0]}`)
        .send(helper.initialBlogs[0])

    helper.blogsId.push(blog.body.id)

    blog = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${helper.tokens[1]}`)
        .send(helper.initialBlogs[1])

    helper.blogsId.push(blog.body.id)

    blog = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${helper.tokens[0]}`)
        .send(helper.initialBlogs[2])

    helper.blogsId.push(blog.body.id)
}, 30000)

describe('Requesting blogs', () => {
    test('GET /api/blogs', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Verify count of blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${helper.tokens[0]}`)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('Verify conent of one blog', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${helper.tokens[0]}`)

        const titleArr = response.body.map((blog) => blog.title)
        expect(titleArr).toContainEqual(helper.initialBlogs[0].title)
    })
})

describe('Getting blogs of specified user', () => {
    test('Getting correct blog of user with correct token', async () => {
        const response = await api
            .get(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.title).toEqual(helper.initialBlogs[0].title)
    })

    test('Getting incorrect blog of user with correct token', async () => {
        const response = await api
            .get(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[1]}`)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toEqual('blog was not created by token holder')
    })

    test('Getting nonexistent blog', async () => {
        const nonId = await helper.notExistingId()
        const response = await api
            .get(`/api/blogs/${nonId}`)
            .set('Authorization', `bearer ${helper.tokens[1]}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toEqual('non existent blog')
    })
})

test('a blog object has "id" property', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', `bearer ${helper.tokens[0]}`)

    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

// don't forget to test if wrong content.
describe('Posting blogs', () => {
    test('POST /api/blogs with correct token', async () => {
        const newBlog = {
            title: 'JWT',
            author: 'website',
            url: 'https://jwt.io/',
            likes: 1,
        }

        const addedBlog = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${helper.tokens[1]}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${helper.tokens[1]}`)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

        const titleArr = response.body.map((blog) => blog.title)
        expect(titleArr).toContainEqual(newBlog.title)

        await api
            .get(`/api/blogs/${addedBlog.body.id}`)
            .set('Authorization', `bearer ${helper.tokens[1]}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Posting to /api/blogs with no token', async () => {
        const newBlog = {
            title: 'JWT',
            author: 'website',
            url: 'https://jwt.io/',
            likes: 1,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toEqual('token missing')
    })

    test('Posting to /api/blogs with invalid token', async () => {
        const newBlog = {
            title: 'JWT',
            author: 'website',
            url: 'https://jwt.io/',
            likes: 1,
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYyYzE1MWRmZDA4MzBjZWJkYTQ0Y2Q5YSIsImlhdCI6MTY1NjgzNjU3N30.oiRLJSw56RptbUGSiyzBaS-H4WfrP7OYwZkS4A6FXm')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toEqual('invalid token, error handler')
    })

    test('Post blog that has no likes property', async () => {
        const newBlog = {
            title: 'test no likes',
            author: 'test author',
            url: '/test/',
        }

        const resultedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        // Can be further testing when we have "/api/blogs/:id"
        expect(resultedBlog.body.likes).toEqual(0)

        const getBlog = await api
            .get(`/api/blogs/${resultedBlog.body.id}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(getBlog.body.likes).toEqual(0)
    })

    test('Post blog with no title and no url (or either really)', async () => {
        const newBlog = {
            author: 'test author',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${helper.tokens[1]}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${helper.tokens[1]}`)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deletion of blog', () => {
    test('Deletion using a existent correct id', async () => {
        await api
            .delete(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(204)

        const response = await api
            .get(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(400)

        expect(response.body.error).toEqual('non existent blog')
    })

    test('Deletion using a non-existent correct id', async () => {
        const nonExistentId = await helper.notExistingId()

        const response = await api
            .delete(`/api/blogs/${nonExistentId}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(400)

        console.log(response.body)
        expect(response.body.error).toEqual('non existent blog')
    })

    test('Deletion using a maforamtted id', async () => {
        const response = await api
            .delete('/api/blogs/123')
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(400)

        expect(response.body.error).toEqual('malformatted id')
    })
})

describe('Changing content of a blog (PUT)', () => {
    test('PUT using a correct token and existing blog', async () => {
        const changedBlog = {
            author: 'put test',
            title: helper.initialBlogs[0].title,
            url: helper.initialBlogs[0].url,
            likes: helper.initialBlogs[0].likes + 1,
        }

        const responseBlog = await api
            .put(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .send(changedBlog)
            .expect(200)

        expect(responseBlog.body.likes).toEqual(helper.initialBlogs[0].likes + 1)

        const updatedBlog = await api
            .get(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)

        expect(updatedBlog.body.author).toEqual('put test')
    })

    test('PUT with a non-existent correct id', async () => {
        const nonExistentId = await helper.notExistingId()

        const response = await api
            .put(`/api/blogs/${nonExistentId}`)
            .set('Authorization', `bearer ${helper.tokens[0]}`)
            .expect(400)

        expect(response.body.error).toEqual('non existent blog')
    })

    test('PUT with wrong token', async () => {
        const response = await api
            .put(`/api/blogs/${helper.blogsId[0]}`)
            .set('Authorization', `bearer ${helper.tokens[1]}`)
            .expect(401)

        expect(response.body.error).toEqual('blog was not created by token holder')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
