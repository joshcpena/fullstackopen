
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Form, Button, } from 'react-bootstrap'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])



  useEffect(() => {
    async function getAll() {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div className='container'>
      <h2>notes</h2>
      <Form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <Button variant='primary' type='submit'>create</Button>
      </Form>
      <Table striped>
        <tbody>
          {notes.map(n =>
            <tr key={n.id}>
              <td>{n.content}</td>
            </tr>)}
        </tbody>
      </Table>
      <h2>persons</h2>
      <Form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <Button variant='primary' type='submit'>create</Button>
      </Form>
      <Table striped>
        <tbody>
          {persons.map(n =>
            <tr key={n.id}>
              <td>{n.name} {n.number}</td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default App