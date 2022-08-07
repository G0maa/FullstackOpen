import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload,
        type: 'normal',
      }
    },
    setError(state, action) {
      return {
        message: action.payload,
        type: 'error',
      }
    },
    resetNotification() {
      return {
        message: '',
        type: '',
      }
    },
  },
})

let lastTimeoutId = -1
export const showNotification = (msg, time = 5) => {
  return (dispatch) => {
    dispatch(setNotification(msg))

    if (lastTimeoutId !== -1) clearTimeout(lastTimeoutId)

    lastTimeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

// How to make this less WET without adding more function arguments?
export const showError = (msg, time = 5) => {
  return (dispatch) => {
    dispatch(setError(msg))

    if (lastTimeoutId !== -1) clearTimeout(lastTimeoutId)

    lastTimeoutId = setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export const { setNotification, setError, resetNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
