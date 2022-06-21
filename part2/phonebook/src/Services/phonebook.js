import axios from 'axios'

// I preferred this way over .then().then()...
// const baseURL = "http://localhost:3001/api/persons"
const baseURL = "/api/persons"
const getPersons = () => axios.get(`${baseURL}`)

const postPerson = (newPerson) => axios.post(`${baseURL}`, newPerson)

const deletePerson = (personId) => axios.delete(`${baseURL}/${personId}`)

const replacePerson = (newPerson, personId) => axios.put(`${baseURL}/${personId}`, newPerson)


export default {getPersons, postPerson, deletePerson, replacePerson}