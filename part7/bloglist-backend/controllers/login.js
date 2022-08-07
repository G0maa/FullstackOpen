const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  if (!username || !password) {
    response.status(400).json({
      error: 'username and password required',
    })
    return
  }

  const user = await User.findOne({ username })

  let isPasswordCorrect = false
  if (user) {
    isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
  }

  if (!user || !isPasswordCorrect) {
    response.status(401).json({
      error: 'invalid username or password',
    })
    return
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  // Mhm... no status code for "Authorized"?
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
