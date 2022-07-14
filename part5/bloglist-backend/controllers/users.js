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
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
    response.json(users)
})

module.exports = usersRouter
