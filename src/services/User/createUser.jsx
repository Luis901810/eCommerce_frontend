import axios from 'axios'
import { API_URL } from '../../redux/actions-type'

const createUser = async user => {
  try {
    const response = await axios.post(`${API_URL}/user`, user)
    return response.data
  } catch (error) {
    console.log(error.response)
    return error.response.data
  }
}

export default createUser
