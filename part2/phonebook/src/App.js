import React, { useState, useEffect } from 'react'
import peopleService from './services/people'


const Person = ({ persons, searchTerm }) => {
  if (searchTerm) {
    const personList = (persons.filter(person => person.name.toLowerCase().includes(searchTerm)))
    return (
      personList.map(person => <span key={person.name}> {person.name} {person.number} <br /> </span>)
    )
  }
  else {
    return (
      persons.map(person => <span key={person.name}> {person.name} {person.number} <br /> </span>)
    )
  }
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div> name: <input value={props.name} onChange={props.handleNameChange} /></div>
      <div> number: <input value={props.number} onChange={props.handleNumChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with:<input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}


const App = () => {

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    peopleService
      .getAll()
      .then(intialPeople => setPersons(intialPeople))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let flag = false
    persons.forEach((person) => {
      if (person.name === newName) {
        flag = true
      }
    })
    if (flag) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNum('')
    } else {
      const personObj = { name: newName, number: newNum }
      peopleService
        .create(personObj)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setNewName('')
      setNewNum('')
    }

  }

  const handleSearchChange = (event) => setSearchTerm(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm name={newName} handleNameChange={handleNameChange} number={newNum} handleNumChange={handleNumChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Person persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App