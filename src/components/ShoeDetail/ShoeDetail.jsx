import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToShoppingCart, getShoeById } from '../../redux/actions'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  ThemeProvider,
  createTheme,
  Box,
  Button,
} from '@mui/material'
import Reviews from '../Card/Reviews/Reviews'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { useNavigate } from 'react-router-dom'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const ShoeDetail = () => {
  const { idShoe } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const shoe = useSelector(state => state.Shoe)
  console.log('Detail', idShoe)

  React.useEffect(() => {
    dispatch(getShoeById(idShoe))
  }, [])

  const addToCart = () => {
    dispatch(addToShoppingCart(shoe))
    console.log('Agregado:', shoe.name)
    navigate('/ShoppingCart')
  }

  const imgStyle = {
    width: '400px',
    height: '400px',
    borderRadius: 5,
    objectFit: 'cover',
  }

  const detailTextItem = {
    marginLeft: 6,
    marginRight: 6,
  }

  const defaultImage =
    'https://www.cc-carrefour-alameda.com/wp-content/themes/restyling/images/default-image.png'

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'space-evenly',
        }}
      >
        <Button
          variant='contained'
          size='large'
          sx={{
            height: '40px',
            backgroundColor: '#42e268',
            '&:hover': {
              backgroundColor: '#00ff3d',
            },
          }}
          onClick={() => navigate('/Catalogue')}
        >
          BACK
        </Button>

        {/* <img src={shoe.image} alt={shoe.name} sx={{ height: 140 }} /> */}
        <img
          src={shoe.image || defaultImage}
          alt={shoe.name}
          style={imgStyle}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: '#42e268' }} variant='h3'>
            {shoe.name}
          </Typography>

          <Typography sx={{ color: 'white', marginTop: 2 }} variant='h4'>
            Gender: {shoe.ShoeGender?.gender}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3 }}>
            {shoe.ShoeCategories?.map((category, index) => (
              <Chip key={index} label={category.category} />
            ))}
          </Box>
          <Button
            onClick={() => addToCart()}
            variant='contained'
            size='large'
            sx={{
              height: '80px',
              width: '600px',
              mt: 4,
              backgroundColor: '#42e268',
              '&:hover': {
                backgroundColor: '#00ff3d',
              },
            }}
          >
            <AddShoppingCartIcon />
            <Typography sx={{ color: 'white' }} variant='h3'>
              Comprar ${shoe.price}
            </Typography>
          </Button>

          <Typography
            sx={{ color: 'white', marginTop: 5, width: '650px' }}
            variant='h6'
          >
            Descripcion: {shoe.description}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography variant='h4' color='white' style={detailTextItem}>
          Stock: {shoe.stock}
        </Typography>
        <Typography variant='h4' color='white' style={detailTextItem}>
          Descuento: {shoe.discount ? `${shoe.discount}%` : 'No hay'}
        </Typography>
        <Typography variant='h4' color='white' style={detailTextItem}>
          Talla: {shoe.ShoeSize?.size}
        </Typography>
        <Typography variant='h4' color='white' style={detailTextItem}>
          Marca: {shoe.ShoeBrand?.brand}
        </Typography>
        <Typography variant='h4' color='white' style={detailTextItem}>
          Color: {shoe.ShoeColor?.color}
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default ShoeDetail
