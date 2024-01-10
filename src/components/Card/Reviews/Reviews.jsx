import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../redux/actions-type';

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
    <div>
      <h1>Acá van las Reviews</h1>
      <h3>{id}</h3>
      {!isNaN(averageRating) && <p>Puntuación Promedio: {averageRating.toFixed(1)}</p>}
      {recentReviews.map((review) => (
        <div key={review.id} style={styles.reviewBox}>
          <p>Comment: {review.comment}</p>
          <p>Rating: {review.rating}</p>
          <p>Review Date: {review.reviewDate}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  reviewBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
  },
};

export default Reviews;
