/* eslint-disable no-restricted-syntax */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username || !password) {
    response.status(400).json({ error: 'Missing username or passsword' })
    return
  }

  if (username.length < 3 || password.length < 3) {
    response.status(400).json({
      error: 'Username and password has to be more than 3 characters',
    })
    return
  }

  // or use lmodule mongoose-unique-validator
  // I printed isFound, turns out it returns passwordHash too,
  //  so I limited it to username only... security and all you know :)
  // * doesn't use HTTPS *
  const isFound = await User.findOne({ username }, { username: 1 })
  if (isFound) {
    response.status(400).json({
      error: 'Username has to be unique',
    })
    return
  }

  const saltRounds = 10
  // Isn't it a bit weirt that it needs `await`?
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  // const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  const users = await User.find({}).select({ name: 1, blogs: 1 })
  console.log(users)
  // This is part of views and should be moved to the frontend
  const minifiedUsers = []
  for (const user of users) {
    minifiedUsers.push({
      name: user.name,
      username: user.username,
      blogsCount: user.blogs.length,
      blogs: [],
      id: user._id,
    })
  }
  response.json(minifiedUsers)
})

usersRouter.get('/:id', async (request, response) => {
  const userQuery = await User.findById(request.params.id).populate('blogs', {
    title: 1,
    author: 1,
  })

  const userObj = {
    name: userQuery.name,
    username: userQuery.username,
    blogsCount: userQuery.blogs.length,
    blogs: userQuery.blogs,
    id: userQuery._id,
  }
  response.json(userObj)
})

module.exports = usersRouter
