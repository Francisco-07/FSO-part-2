import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'

const App = () => {
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const handleName = (e) => {
    setNewName(e.target.value)
  }
  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const removeMsg = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
    console.log(filter)
  }

  const updatePerson = (id, name, number) => {
    const updatedPerson = { name: name, number: number }
    personService.update(id, updatedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) => (person.id !== id ? person : returnedPerson))
      )
    })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then((response) => {
          console.log('succes')
          setMessage(`${name} deleted`)
          removeMsg()
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => {
          console.log('error', error)
          setErrorMessage(`${name} was already removed from server`)
          removeMsg()
          setPersons(persons.filter((person) => person.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.filter((person) => person.name === newName)

    if (person[0]?.name === newName) {
      if (window.confirm(`update ${person[0]?.name}?`)) {
        updatePerson(person[0]?.id, person[0]?.name, newNumber)
        setMessage(`${person[0]?.name} updated his number to ${newNumber}`)
        removeMsg()
        setNewName('')
        setNewNumber('')
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`${returnedPerson.name} added to the list`)
        removeMsg()
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div>
      <Notification message={message} />
      <ErrorNotification errorMessage={errorMessage} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      {persons
        .filter((person) => {
          if (filter === '') {
            return person
          } else if (person.name.toLowerCase().includes(filter.toLowerCase())) {
            return person
          } else {
            return false
          }
        })
        .map((person, i) => (
          <div key={i}>
            <Persons
              name={person.name}
              number={person.number}
              test={() => deletePerson(person.id, person.name)}
            />
          </div>
        ))}
    </div>
  )
}

export default App
