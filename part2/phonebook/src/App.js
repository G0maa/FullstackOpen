import { useState } from 'react'

import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')


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

    setPersons(persons.concat({name: newName, number:newNumber, id:persons.length + 1}))
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