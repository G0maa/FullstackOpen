import { createSlice } from '@reduxjs/toolkit'
import { showError, showNotification } from './notificationReducer'
import config from '../config'
import loginService from '../services/login'

// Embty object or null?
const initialState = null

// Probably need to re-name this one to avoid confusion
const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser() {
      return null
    },
  },
})

export const initalizeUser = () => {
  return (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const retUser = JSON.parse(loggedInUserJSON)

      dispatch(setUser(retUser))

      // We can't reflect state on non-component stuff.
      config.setToken(retUser.token)
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const retUser = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(retUser))

      config.setToken(retUser.token)
      dispatch(setUser(retUser))
      dispatch(showNotification(`Welcome "${retUser.name}"!`))
    } catch (error) {
      dispatch(showError(error.response.data.error))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(resetUser())
  }
}

export const { setUser, resetUser } = userReducer.actions
export default userReducer.reducer
