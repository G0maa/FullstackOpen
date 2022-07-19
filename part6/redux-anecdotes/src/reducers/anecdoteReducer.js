import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const votedAnecdote = state.find((anecdote) => anecdote.id === action.payload)
      votedAnecdote.votes += 1
      return state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const initializeAnecdotes = () => {
  return (async (dispatch) => {
    const response = await anecdoteService.getAll()
    dispatch(setAnecdotes(response))
  })
}

export const createAnecdote = (anecdoteObj) => {
  return (async(dispatch) => {
    const response = await anecdoteService.createNew(anecdoteObj)
    dispatch(appendAnecdote(response))
  })
}

export const dispatchVote = (anecdoteObj) => {
  return (async (dispatch) => {
    const response = await anecdoteService.voteAnecdote(anecdoteObj)
    dispatch(voteAnecdote(response.id))
  })
}

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
