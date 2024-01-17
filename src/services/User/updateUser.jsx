import axios from 'axios'
import { API_URL } from '../../redux/actions-type'

const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, updatedUser)
    return response.data
  } catch (error) {
    console.log(error.response)
    return error.response.data
  }
}

export default updateUser
