import axios from 'axios'
import { API_URL } from '../../redux/actions-type'

export default async query => {
  let url = `${API_URL}/user/${query.id}`
  const response = await axios.delete(url, {
    data: {
      deleteType: query.deleteType || 'id',
      hardDelete: query.hardDelete || false,
    },
  })
  return response.data
}
