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


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Carousel />
    </Box>
  )
}

export default Landing
