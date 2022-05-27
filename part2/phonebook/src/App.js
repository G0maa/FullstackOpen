import { useState } from 'react'

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

  // Probably should refactor this code.
  return (
    <div>
      <h2>Phonebook</h2>
      <div>Fitler shown with: <input value={searchFilter} onChange={onChangeFilter}/></div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((element) => <li key={element.id}>{element.name}, {element.number}</li>)}
    </div>
  )
}

export default App