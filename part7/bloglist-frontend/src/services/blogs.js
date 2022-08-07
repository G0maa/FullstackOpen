import axios from 'axios'
import config from '../config'
const baseUrl = '/api/blogs'

// Unspecified user, but my implementation still requires token. => fixed
const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: config.getToken() },
  })
  return response.data
}

const getDetails = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`, {
    headers: { Authorization: config.getToken() },
  })
  return response.data
}

const postBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: config.getToken() },
  })
  return response.data
}

const likeBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: config.getToken() },
  })
  return response.data
}

const deleteBlog = async (blogId) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: config.getToken() },
  })
  return response.data
}

const addComment = async (blog) => {
  await axios.post(`${baseUrl}/${blog.id}/comments`, blog, {
    headers: { Authorization: config.getToken() },
  })
}

export default {
  getAll,
  postBlog,
  likeBlog,
  deleteBlog,
  getDetails,
  addComment,
}
