import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
const initialState = []
// a user object {
// name: ''
// blogsCount: ''
// blogs: [
//  (title, author, id, ...)
//  ]
// }

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    setUsersBlogs(state, action) {
      return state.map((user) =>
        user.id !== action.payload.id ? user : action.payload
      )
    },
  },
})

export const fetchAllUsers = () => {
  return async (dispatch) => {
    const data = await usersService.getSummary()
    dispatch(setUsers(data))
  }
}

export const fetchUserBlogs = (userId) => {
  return async (dispatch) => {
    const fullUser = await usersService.getDetails(userId)
    dispatch(setUsersBlogs(fullUser))
  }
}

export const { setUsers, setUsersBlogs } = usersReducer.actions
export default usersReducer.reducer
