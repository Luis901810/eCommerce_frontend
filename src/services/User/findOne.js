import axios from 'axios'
import { API_URL } from '../../redux/actions-type'

const findOne = async payload => {
  try {
    const { userId, userEmail, findType } = payload
    let response
    if (findType === 'email') {
      const url = `${API_URL}/user/${userEmail}?findType=${findType}`
      response = await axios.get(url)
    } else {
      const url = `${API_URL}/user/${userId}`
      response = await axios.get(url)
    }
    return response.data
  } catch (error) {
    console.log(error.response)
    return error.response.data
  }
}

export default findOne
