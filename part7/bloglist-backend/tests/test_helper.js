/* eslint-disable no-underscore-dangle */
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'What Is JWT and Why Should You Use JWT',
    author: 'WDS',
    url: 'https://youtu.be/7Q17ubqLfaM',
    likes: 23000,
  },
  {
    title: 'NodeJS Event Loop',
    author: 'Documentation',
    url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop',
  },
  {
    title: 'HTTP Response Codes',
    author: 'Documentation',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses',
  },
]

const initialUsers = [
  {
    username: 'root',
    name: 'Noriel',
    password: 'sekret',
    blogs: [],
  },
  {
    username: 'admin',
    name: 'Gomaa',
    password: 'security',
    blogs: [],
  },
]

// Created during runtime.
const tokens = []
const blogsId = []

const notExistingId = async () => {
  const blog = new Blog({
    author: 'removemeplz',
    title: 'removemeplz',
    url: 'removemeplz',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  notExistingId,
  initialUsers,
  tokens,
  blogsId,
}
