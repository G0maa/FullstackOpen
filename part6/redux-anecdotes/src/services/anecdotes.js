import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdoteObj) => {
    const response = await axios.post(baseUrl, anecdoteObj)
    return response.data
}

const voteAnecdote = async (anecdoteObj) => {
    const resposne = await axios.put(`${baseUrl}/${anecdoteObj.id}`, anecdoteObj)
    return resposne.data
}

export default {
    getAll,
    createNew,
    voteAnecdote,
}
