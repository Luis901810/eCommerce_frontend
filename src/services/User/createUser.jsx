import axios from 'axios'
import { API_URL } from '../../redux/actions-type'

const createUser = async user => {
  const response = await axios.post(`${API_URL}/user`, user)
  return response.data
}

export default createUser
