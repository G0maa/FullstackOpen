import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credntials) => {
  const response = await axios.post(baseUrl, credntials)
  return response.data
}

export default { login }
