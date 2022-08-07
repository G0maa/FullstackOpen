// Async services of users, in /users, one for non-detailed, and one for detailed.
// /api/users/ summary
// /api/users/:id
// Have to states: one for detailed, one for non-ddetailed

import axios from 'axios'
// import config from '../config' To-be coded later
const baseUrl = '/api/users'

const getSummary = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getDetails = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

export default { getSummary, getDetails }
