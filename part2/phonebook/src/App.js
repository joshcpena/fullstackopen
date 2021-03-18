import React, { useState, useEffect } from 'react'
import peopleService from './services/people'


const Person = ({ persons, searchTerm, removePerson }) => {
  const confirmRemove = (name, id) => window.confirm(`Delete ${name}?`) ? id : 0

  if (searchTerm) {
    const personList = (persons.filter(person => person.name.toLowerCase().includes(searchTerm)))
    return (
      personList.map(person =>
        <div key={person.name}>
          <span > {person.name} {person.number}   </span>
          <button onClick={() => removePerson(confirmRemove(person.name, person.id))}>delete</button>
        </div>
      )
    )
  }
  else {
    return (
      persons.map(person =>
        <div key={person.name}>
          <span > {person.name} {person.number} </span>
          <button onClick={() => removePerson(confirmRemove(person.name, person.id))}>delete</button>
        </div >
      )
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

  const removePerson = (id) => {
    if (id !== 0) {
      peopleService
        .remove(id)
        .then(() => (peopleService.getAll().then(reponse => setPersons(reponse))))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    let id = 0
    persons.forEach((person) => {
      if (person.name === newName) {
        id = person.id
      }
    })
    if (id !== 0) {
      const item = persons.find(value => value.id === id)
      if (!newNum)
        window.alert(`${newName} is already added to phonebook`)
      else if (newNum === item.number)
        window.alert(`${item.name} is already added to phonebook with number ${item.number}`)
      else if (newNum !== item.number) {
        const updateBool = window.confirm(`${item.name} is already added to phonebook, replace ${item.number} with ${newNum}?`)
        if (updateBool)
          peopleService
            .update(id, { name: newName, number: newNum })
            .then(returnedPerson =>
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson)))
      }
    } else {
      const personObj = { name: newName, number: newNum }
      peopleService
        .create(personObj)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    setNewName('')
    setNewNum('')
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
      <Person persons={persons} searchTerm={searchTerm} removePerson={removePerson} />
    </div>
  )
}

export default App