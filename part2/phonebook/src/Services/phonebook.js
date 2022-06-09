import axios from 'axios'

// I preferred this way over .then().then()...

const getPersons = () => axios.get("http://localhost:3001/persons")

const postPerson = (newPerson) => axios.post("http://localhost:3001/persons", newPerson)

const deletePerson = (personId) => axios.delete(`http://localhost:3001/persons/${personId}`)

const replacePerson = (newPerson, personId) => axios.put(`http://localhost:3001/persons/${personId}`, newPerson)


export default {getPersons, postPerson, deletePerson, replacePerson}