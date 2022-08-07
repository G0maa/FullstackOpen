/* eslint-disable object-curly-newline */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

// Because this one doesn't need authorization :)
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}, { title: 1, likes: 1 })
  response.json(blogs)
})

// I had an error where I typed 'users' instead of 'user',
// turns out Mongoose searches for it in the schema,
// what I thought is, this is the name of the collection.
// So:
// 'user' is the property to populate().
// ref: is the collection mongoose searches for.

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
  })

  if (!blog) {
    response.status(400).json({ error: 'non existent blog' })
    return
  }

  // Add more check in middleware to make sure that user actually exists?
  // Remainder to remove both authorization middlewares.
  // if (blog.user._id.toString() !== request.user.id.toString()) {
  //   response.status(401).json({ error: 'blog was not created by token holder' })
  //   return
  // }

  response.json(blog)
})

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
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

    resultBlog._doc.user = {
      username: user.username,
      id: user._id.toString(),
    }

    user.blogs = user.blogs.concat(resultBlog._id)
    await user.save()

    response.status(201).json(resultBlog)
  }
)

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(400).json({ error: 'non existent blog' })
      return
    }

    if (blog.user.toString() !== request.user.id.toString()) {
      response
        .status(401)
        .json({ error: 'blog was not created by token holder' })
      return
    }

    await Blog.findByIdAndRemove(request.params.id)

    // Revise this, deletion of refernced ID in user document:
    const userObj = await User.findById(blog.user.toString())

    const idxOfBlog = userObj.blogs.indexOf(blog._id)
    const blogsLength = userObj.blogs.length

    // Order isn't important, so I suppose this is more efficient than splice()
    if (idxOfBlog > -1) {
      userObj.blogs[idxOfBlog] = userObj.blogs[blogsLength - 1]
      userObj.blogs.pop()
    }

    await User.findByIdAndUpdate(userObj._id, userObj)

    response.status(204).end()
  }
)

blogsRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const likedBlog = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(400).json({ error: 'non existent blog' })
      return
    }

    const updatedNote = await Blog.findByIdAndUpdate(
      request.params.id,
      likedBlog,
      { new: true }
    )
    response.json(updatedNote)
  }
)

blogsRouter.post(
  '/:id/comments',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const newBlog = request.body
    const blog = await Blog.findById(newBlog.id)

    if (!blog) {
      response.status(400).json({ error: 'non existent blog' })
      return
    }

    if (request.params.id !== newBlog.id) {
      response
        .status(400)
        .json({ error: 'request blog id is not the same as route blog id' })
      return
    }

    // Add checking existance of user to midleware... not only checking validity of token.
    await Blog.findByIdAndUpdate(newBlog.id, newBlog)

    response.status(204).end()
  }
)

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id, { comments: 1 })

  if (!blog) {
    response.status(400).json({ error: 'non existent blog' })
    return
  }
  // Add checking existance of user to midleware... not only checking validity of token

  response.status(204).json(blog.comments)
})

module.exports = blogsRouter
