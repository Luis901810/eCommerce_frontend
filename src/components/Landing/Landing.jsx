import { Box } from '@mui/system'

import Carousel from './Carousel'
import { useAuth } from '../../contexts/AuthContext'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/actions'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

const Landing = () => {
  const { user } = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.email) {
          const { data } = await axios(
            `${API_URL}/user/${user.email}?findType=email`
          )
          dispatch(setCurrentUser(data))
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [user])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Carousel />
    </Box>
  )
}

export default Landing
