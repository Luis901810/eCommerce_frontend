import { Rating, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import axios from 'axios'
import { API_URL } from '../../redux/actions-type'
import Loading from '../Loading/loading'

export default function Reviews({ idOrder, userId }) {
  const [lineReviews, setLineReviews] = useState({})
  const [loading, setLoading] = useState(false)
  const loadingImg =
    'https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73'

  const [orders, setOrders] = useState([])
  const [currentOrder, setCurrentOrder] = useState(null)

  const handleChange = (value, id) => {
    setLineReviews(prevReviews => ({
      ...prevReviews,
      [id]: { rating: value, comment: prevReviews[id]?.comment || '' },
    }))
    console.log('Updated Line Reviews:', lineReviews)
  }

  const handleSend = async lineId => {
    setLoading(true)
    try {
      const body = {
        orderLineId: lineId,
        comment: lineReviews[lineId]?.comment || '',
        rating: lineReviews[lineId]?.rating || 0,
        userId: userId,
      }

      console.log(body)

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/order`)
        setOrders(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const findCurrentOrder = orders.filter(order => order.id === idOrder)
    setCurrentOrder(findCurrentOrder[0])
  }, [orders])

  useEffect(() => {
    console.log('----------->', currentOrder)
  }, [currentOrder])

  const textStyle = {
    color: 'white',
    marginTop: 3,
  }

  return (
    <Box
      sx={{
        marginTop: '100px',
        borderRadius: 3,
        padding: 3,
        width: 1 / 2,
      }}
    >
      <Typography style={textStyle} variant='h4'>
        Dinos que opinas de estos productos!
      </Typography>
      {currentOrder &&
        currentOrder.OrderLines &&
        currentOrder.OrderLines.length > 0 &&
        currentOrder.OrderLines.map((line, i) => (
          <Box
            key={i}
            sx={{
              marginTop: '100px',
              border: '2px solid #42e268',
              borderRadius: 3,
              backgroundColor: '#303030',
              padding: 3,
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography style={textStyle} variant='h5'>
              {line.Shoe.name}
            </Typography>
            <Rating
              value={lineReviews[line.id]?.rating || 0}
              max={10}
              onChange={(event, newValue) => handleChange(newValue, line.id)}
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
            <TextField
              placeholder='Deja un comentario'
              value={lineReviews[line.id]?.comment || ''}
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
                setLineReviews(prevReviews => ({
                  ...prevReviews,
                  [line.id]: {
                    ...prevReviews[line.id],
                    comment: e.target.value,
                  },
                }))
              }}
            />
            <Button
              onClick={() => handleSend(line.id)}
              variant='filled'
              sx={{ backgroundColor: '#42e268', mt: 3 }}
            >
              {loading ? <img src={loadingImg} /> : 'Enviar'}
            </Button>
          </Box>
        ))}
    </Box>
  )
}
