import axios from 'axios'
// const baseUrl = 'https://thawing-atoll-24348.herokuapp.com/api/notes'
const baseUrl = '/api/notes'

// So, this seems something like .then().then(), which brings a question,
// doesn't this way call a web api, (that deals with async), which means it may _laten_ 
// the evaluation a bit? (that is it's not dealt with on the JS stack directly anymore.)
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }