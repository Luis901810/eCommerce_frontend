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
      const response = await axios.get(`${API_URL}/user-review`, )//! recibo un array de objetos o un array vacio

      const { data } = response
      
      return data.reviews
    } catch (error) {
      window.alert(`No se encontraron las reviews: ${error.message}`)
    }
  }

  useEffect(() => {
    const fetchReviews = async () => {
      const allReviews = await getReviews();
      const filteredReviews = allReviews.filter((review) => review.userId === idUser);
      setReviews(filteredReviews)
    };

    fetchReviews();
  }, []);

  useEffect(() => {

    
    
    
  }, [idUser])

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'Center',
        padding: 10,
        alignItems: 'center',
      }}
    >
      <UserOptions />
      {reviews.length !== 0 && (
        reviews.map((review, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: '#303030',
            color: '#ffffff',
            padding: 5,
            border: '1px solid #42e268',
            borderRadius: 5,
            mt: 2,
            height: '280px', 
            width: '400px', 
            
          }}
        >
          <Typography variant="h6">{review.OrderLine.Shoe.name}</Typography>
          <Typography variant="body1" sx={{ color: '#42e268' }} >{`Comentario: ${review.comment}`}</Typography>
          <Typography variant="body1">{`Cantidad: ${review.OrderLine.quantity}`}</Typography>
          <Typography variant="body1">{`Precio Unitario: $${review.OrderLine.unitPrice}`}</Typography>
          <Typography variant="body1">{`Valoracion:`}</Typography>
          <Rating disabled={false} max={10} value={review.rating}></Rating>
          <Typography variant="body1">{`Fecha de Reseña: ${new Date(review.reviewDate).toLocaleDateString()}`}</Typography>
        </Box>
        ))
      )}

    </Box>
  )
}