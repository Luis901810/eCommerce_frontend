import { Box } from '@mui/system'
import { Button, Typography, Rating } from '@mui/material'
import UserOptions from '../UserOptions'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../../../redux/actions-type'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../../contexts/AuthContext'

export default function UserReviews() {
  const [reviews, setReviews] = useState([])

  const idUser = useSelector(state => state.User.id)
  const { user } = useAuth()

  const getReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/user-review`, )

      const { data } = response
      if (data) setReviews(data)
      return
    } catch (error) {
      window.alert(`No se encontraron las reviews: ${error.message}`)
    }
  }

  useEffect(() => {
    getReviews()
  }, [])

  useEffect(() => {
    console.log('***************', reviews);
    
  }, [reviews])

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: 'Center',
        padding: 10,
        alignItems: 'center',
      }}
    >
      <UserOptions />
      <Box
        sx={{
          backgroundColor: '#303030',
          padding: 10,
          border: '1px solid #42e268',
          borderRadius: 5,
        }}
      >
        <Rating disabled={true} max={10}></Rating>
      </Box>
    </Box>
  )
}