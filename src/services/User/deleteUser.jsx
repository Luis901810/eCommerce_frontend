import axios from 'axios'
import { API_URL } from '../../redux/actions-type'

export default async payload => {
  let url = `${API_URL}/user/${payload.id}`
  const response = await axios.delete(url, {
    data: {
      deleteType: payload.deleteType || 'id',
      hardDelete: payload.hardDelete || false,
    },
  })
  return response.data
}
