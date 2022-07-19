import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            console.log("action", action)
            const newState = action.payload
            return newState
        },
        deleteNotification(state, action) {
            const newState = null
            return newState
        },
    }
})

// Mhm... should have put in its own state?o or be part of notification state?
// No matter... this is probably good enough.
let lastTimeoutId = -1
export const showNotification = (msg, time) => {
    return ((dispatch) => {
        dispatch(setNotification(msg))

        if (lastTimeoutId !== -1)
            clearTimeout(lastTimeoutId)

        lastTimeoutId = setTimeout(() => {
            dispatch(deleteNotification())
        }, time * 1000)
    })
}

export const { setNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer
