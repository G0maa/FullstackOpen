import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (givenToken) => {
  token = `bearer ${givenToken}`
}

// Unspecified user, but my implementation still requires token.
const getAll = async () => {
  const response = await axios.get(baseUrl, { headers: { Authorization: token } })
  return response.data
}

const postBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } })
  return response.data
}

const likeBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, { headers: { Authorization: token } })
  return response.data
}

const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, { headers: { Authorization: token } })
  return response.data
}

export default { getAll, setToken, postBlog, likeBlog, deleteBlog }