const express = require('express')
require('express-async-errors')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan('tiny')) // I wonder if this should be in `middleware.js`
if (config.NODE_ENV === 'development') {
    app.use(middleware.requestLogger)
}

if (config.NODE_ENV === 'test') {
    app.use('/api/testing', testingRouter)
}
// app.use(middleware.tokenExtractor) HMMMMM.
// app.use(middleware.userExtractor) HMMMMM.

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.get('/', (requset, response) => {
    response.send(
        '<h1>Helllo Noriel!</h1>',
    )
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
