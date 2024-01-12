import { Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import axios from 'axios'
// import { API_URL } from '../../redux/actions-type'
import Loading from '../Loading/loading'

export default function Reviews({ product, idOrder, userId }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const jsonString = localStorage.getItem('PurchaseTicket')
  const PurchaseTicket = JSON.parse(jsonString)
  const [loading, setLoading] = useState(false)
  const loadingImg =
    'https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73'

    const API_URL = 'http://localhost:3001'

  const handleSend = async () => {
    setLoading(true)
    try {
      const body = {
        orderLineId: idOrder,
        comment: comment,
        rating: rating,
        userId: userId,
      }

      console.log(body);

      const response = await axios.post(`${API_URL}/user-review`, body)

      if (response.data) {
        window.alert('Reseña enviada')
        setLoading(false)
      }
    } catch (error) {
      window.alert(`Reseña no enviada: ${error.message}`)
      setLoading(false)
    }
  }

  console.log('PURCHASE TICKET: ', PurchaseTicket);
  const textStyle = {
    color: 'white',
    marginTop: 3,
  }

  const imgStyle = {
    width: '200px',
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 3,
  }

  return (
    <Box
      sx={{
        marginTop: '100px',
        width: '500px',
        border: '2px solid #42e268',
        borderRadius: 3,
        backgroundColor: '#303030',
        padding: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          key={product.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '500px',
            alignItems: 'center',
            marginTop: 3,
          }}
        >
          <Typography style={textStyle} variant='h5'>
            {product.name}
          </Typography>
        </Box>
        <img src={product.image} alt={product.name} style={imgStyle} />
      </Box>

      <Rating
        value={rating}
        max={10}
        onChange={(event, newValue) => {
          setRating(newValue)
        }}
        sx={{
          '& .MuiRating-iconEmpty': {
            color: '#42e268',
          },
          '& .MuiRating-iconFilled': {
            color: '#42e268',
          },
          mt: 3,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <TextField
          placeholder='Deja un comentario'
          value={comment}
          id='comment'
          minRows={2}
          size='lg'
          sx={{
            '& input': {
              color: 'white',
            },
            '& input::placeholder': {
              color: 'white',
            },
            mt: 3,
            border: '1px solid #42e268',
            borderRadius: 1,
          }}
          onChange={e => {
            setComment(e.target.value)
          }}
        />
        <Button
          onClick={() => handleSend()}
          variant='filled'
          sx={{ backgroundColor: '#42e268', mt: 3 }}
        >
          {loading ? <img src={loadingImg} /> : 'Enviar'}
        </Button>
      </Box>
    </Box>
  )
}
