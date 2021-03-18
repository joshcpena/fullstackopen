import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = newObject => axios.post(baseURL, newObject).then(response => response.data)

const remove = id => axios.delete(`${baseURL}/${id}`, { data: 'yes' })

<<<<<<< HEAD
const update = (id, newObject) => axios.put(`${baseURL}/${id}`, newObject)
    .then(response => response.data)

const services = { getAll, create, remove, update }
=======
const services = { getAll, create, remove }
>>>>>>> 88b81ecb30983f1a8f2dcd07006a18e66bcec73c

export default services
