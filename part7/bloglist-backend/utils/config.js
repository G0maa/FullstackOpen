require('dotenv').config()

// Maybe have a test_secret here.
const { PORT, NODE_ENV } = process.env
const MONGODB_URI =
  NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  NODE_ENV,
}
