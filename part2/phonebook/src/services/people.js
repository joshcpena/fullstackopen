import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = newObject => axios.post(baseURL, newObject).then(response => response.data)

const remove = id => axios.delete(`${baseURL}/${id}`, { data: 'yes' })

const update = (id, newObject) => axios.put(`${baseURL}/${id}`, newObject).then(response => response.data)

const services = { getAll, create, remove, update }

export default services
