import { useState, useEffect } from 'react'

import phonebookServices from './Services/phonebook'

import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isNotificationError, setNotificationError] = useState(false)

  const showError = (message) => {
    setNotificationMessage(message)
    setNotificationError(true)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const showNotification = (message) => {
    setNotificationMessage(message)
    setNotificationError(false)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

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


  const filteredPersons = (searchFilter === '') ? persons : persons.filter((element) => element.name.toLowerCase().match(searchFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const newPerson = {name: newName, number:newNumber}

    const isFound = persons.find((element) => element.name === newName)
    if(isFound !== undefined) {
      if(window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`))) {
        phonebookServices
          .replacePerson(newPerson, isFound.id)
          .then((response) => {
            const newPersonData = response.data
            setPersons(persons.map((element) => element.id !== isFound.id ? element : newPersonData))
            showNotification(`Number for '${newPersonData.name}' changed successfully.`)
          })
          .catch((error) => {
            console.log(error)
            showError(`Information of '${newPerson.name}' is not existent on the server.`)
          })
      }
      
      // return
    }
    else {
      phonebookServices
      .postPerson(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data))
        showNotification(`Number for '${response.data.name}' added.`)
      })
      .catch((error) => {
        console.log(error.response.data)
        showError(error.response.data.error)
      })
    }          

  }

  const onDelete = (personId) => {
    
    phonebookServices
      .deletePerson(personId)
      .then((response) => {
        // Caution: response.data doesn't have that paricular object data.
        const deletedPerson = persons.find((element) => element.id === personId)
        setPersons(persons.filter((element) => element.id !== personId ))

        showNotification(`Record for '${deletedPerson.name}' deleted.`)
      })
      .catch((error) => {
        // Caution again: Even if an error happens, the respose doesn't carry it!
        showError(`Deletion of ${persons[personId].name} failed!`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} error={isNotificationError}/>
      <Filter searchFilterVar={searchFilter} onChangeFilterFunc={onChangeFilter} />

      <h2>Add a new</h2>

      <PersonForm onSubmitFunc={addName} newNameVar={newName} onChangeNameFunc={onChangeName} newNumberVar={newNumber} onChangeNumberFunc={onChangeNumber}/>
      
      <h2>Numbers</h2>
      
      <Persons filteredPersonsArr={filteredPersons} onDeleteFunc={onDelete} />
    </div>
  )
}

export default App