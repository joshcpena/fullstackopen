import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios
    .post(baseUrl, blogObj, config)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, saveBlog };
