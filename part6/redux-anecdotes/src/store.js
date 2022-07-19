import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdotesReducer,
      notification: notificationReducer,
      filter: filterReducer,
    }
  })

export default store
