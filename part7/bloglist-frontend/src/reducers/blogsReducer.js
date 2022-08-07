import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showError, showNotification } from './notificationReducer'

// I think, we should somehow fetchAllNotets here...
// which is the actual 'initial state'.
const initialState = []

const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setAllBlogs(state, action) {
      const blogs = action.payload
      return blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
    },
    setDetails(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
    addNewBlog(state, action) {
      return [...state, action.payload].sort(
        (blogA, blogB) => blogB.likes - blogA.likes
      )
    },
    likeBlog(state, action) {
      const likedBlog = state.find((blog) => blog.id === action.payload)
      likedBlog.likes++
      return state.sort((blogA, blogB) => blogB.likes - blogA.likes)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const fetchAllBlogs = () => {
  return async (dispatch) => {
    try {
      const allBlogs = await blogService.getAll()
      dispatch(setAllBlogs(allBlogs))
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  }
}

export const fetchBlogDetails = (blogId) => {
  return async (dispatch) => {
    const blogDetails = await blogService.getDetails(blogId)
    dispatch(setDetails(blogDetails))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.postBlog(newBlog)
      dispatch(addNewBlog(response))
      dispatch(
        showNotification(`Blog "${newBlog.title}" was added successfully`)
      )
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  }
}

export const putLike = (likedBlog) => {
  return async (dispatch) => {
    try {
      likedBlog.user = likedBlog.user.id

      const response = await blogService.likeBlog(likedBlog)
      dispatch(likeBlog(response.id))
      dispatch(showNotification(`Blog "${likedBlog.title}" was liked!`))
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(
        showNotification(
          `Blog with ID "${blog.title}" was deleted successfully!`
        )
      )
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  }
}

export const postComment = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.addComment({ ...blog, user: blog.user.id })
      dispatch(setDetails(blog))
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  }
}

export const { setAllBlogs, setDetails, addNewBlog, likeBlog, removeBlog } =
  blogsReducer.actions
export default blogsReducer.reducer
