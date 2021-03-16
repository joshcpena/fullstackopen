import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
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
      setPersons(persons.concat({ name: newName, number: newNum }))
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