/* eslint-disable object-curly-newline */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

// Safely assuming that all routes here require authorizaiton header.
blogsRouter.use(tokenExtractor)
blogsRouter.use(userExtractor)

// I had an error where I typed 'users' instead of 'user',
// turns out Mongoose searches for it in the schema,
// what I thought is, this is the name of the collection.
// So:
// 'user' is the property to populate().
// ref: is the collection mongoose searches for.

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog
        .findById(request.params.id)
        .populate('user', { username: 1 })

    if (!blog) {
        response.status(400).json({ error: 'non existent blog' })
        return
    }

    if (blog.user._id.toString() !== request.user.id.toString()) {
        response.status(401).json({ error: 'blog was not created by token holder' })
        return
    }

    response.json(blog)
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    const user = await User.findById(request.user.id)

    // By the way, if the user isn't existent, then that means the
    // client has my SECRET... so it might be actually a security breach?
    // Or I created a wrong ID-ed JWT, which isn't possible?
    if (!user) {
        response.status(400).json({ error: 'User non-existent' })
        return
    }

    const blog = {
        title,
        author,
        url,
        likes: likes || 0,
        user: user._id,
    }

    const newBlog = new Blog(blog)
    const resultBlog = await newBlog.save()

    user.blogs = user.blogs.concat(resultBlog._id)
    await user.save()

    response.status(201).json(resultBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        response.status(400).json({ error: 'non existent blog' })
        return
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        response.status(401).json({ error: 'blog was not created by token holder' })
        return
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// This is NOT REST API, it's more of a PATCH request,
// PUT replaces entire document with given request.body,
// PATCH replaces parts of the document, which this function does.
blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        response.status(400).json({ error: 'non existent blog' })
        return
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        response.status(401).json({ error: 'blog was not created by token holder' })
        return
    }

    const updatedNote = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true },
    )
    response.json(updatedNote)
})

module.exports = blogsRouter
