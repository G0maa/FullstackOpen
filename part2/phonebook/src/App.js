import { useState, useEffect } from 'react'
import phonebookServices from './Services/phonebook'

import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    phonebookServices
      .getPersons()
      .then((response) => setPersons(response.data))
  }, [])

  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeFilter = (event) => {
    setSearchFilter(event.target.value)
  }

  // small addition.
  const filteredPersons = (searchFilter === '') ? persons : persons.filter((element) => element.name.toLowerCase().match(searchFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const isFound = persons.find((element) => element.name === newName)
    if(isFound !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {name: newName, number:newNumber}

    phonebookServices
      .postPerson(newPerson)
      .then((response) => setPersons(persons.concat(response.data)))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchFilterVar={searchFilter} onChangeFilterFunc={onChangeFilter} />

      <h2>Add a new</h2>

      <PersonForm onSubmitFunc={addName} newNameVar={newName} onChangeNameFunc={onChangeName} newNumberVar={newNumber} onChangeNumberFunc={onChangeNumber}/>
      
      <h2>Numbers</h2>
      
      <Persons filteredPersonsArr={filteredPersons} />
    </div>
  )
}

export default App