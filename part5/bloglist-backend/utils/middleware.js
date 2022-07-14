const jwt = require('jsonwebtoken')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        return response.status(401).json({ error: 'token missing' })
    }

    return next()
}

// Problem: Changing some letters in Authorization header can
// lead to .verify() failing, due to JSON.parse.
const userExtractor = async (request, response, next) => {
    if (request.token) {
        request.user = jwt.verify(request.token, process.env.SECRET)
    }
    if (!request.user || !request.user.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    return next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error('error name', error.name)
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token, error handler' })
    }
    if (error.name === 'SyntaxError') {
        return response.status(500).json({ error: 'Probably JSON.parse() failed, see server logs.' })
    }
    return next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
}
