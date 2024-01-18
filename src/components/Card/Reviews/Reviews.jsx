import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../redux/actions-type';
import {
  Typography, Box, Paper, Rating,
} from '@mui/material'

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]); // Estado local para almacenar las revisiones
  const [averageRating, setAverageRating] = useState(0); // Estado local para almacenar la puntuación promedio
  const [recentReviews, setRecentReviews] = useState([]); // Estado local para almacenar las 3 reseñas más recientes

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/user-review/${id}`);
        console.log(response.data.reviews);

        const totalRating = response.data.reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / response.data.reviews.length;
        setAverageRating(avgRating);//! Puntuación promedio

        const sortedReviews = response.data.reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
        const recentReviews = sortedReviews.slice(0, 3);//! Las últimas 3 reviews
        setRecentReviews(recentReviews);

        setReviews(response.data.reviews);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchReviews();
  }, [id]);

  return (
    <Box sx={{ padding: 2, backgroundColor: '#303030', color: '#ffffff' }} >
      
      {!isNaN(averageRating) && (
        <div>
          <Typography variant="h4" color="#42e268" marginBottom={2} marginTop={2} >
          Puntuación Promedio : ({averageRating.toFixed(1)})   
        </Typography>
        <Rating disabled={false} max={10} value={averageRating.toFixed(1)}></Rating>
        </div>

        
        
      )}

      {recentReviews.map((review) => (
        <Paper key={review.id} elevation={3} sx={{ padding: 2, marginBottom: 2, backgroundColor: '#303030', color: '#ffffff' }}>
          <Typography variant="body1">Comentario: {review.comment}</Typography>
          <Typography variant="body1">Puntuación: </Typography>
          <Rating disabled={false} max={10} value={review.rating}></Rating>
          <Typography variant="body1">Fecha de la reseña: {review.reviewDate}</Typography>
        </Paper>
      ))}
    </Box>
  );
};


export default Reviews;
