import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToShoppingCart, getShoeById } from '../../redux/actions'
import { Card, CardContent, Typography, Chip, ThemeProvider, createTheme, Box } from '@mui/material'
import Reviews from '../Card/Reviews/Reviews'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const ShoeDetail = () => {
  const { idShoe } = useParams()

  const dispatch = useDispatch()
  const shoe = useSelector((state) => state.Shoe)
  console.log('Detail',idShoe)

  React.useEffect(() => {
    dispatch(getShoeById(idShoe))
  }, [])

  const addToCart = () => {
    dispatch(addToShoppingCart(shoe));
    console.log('Agregado:', shoe.name);
    alert(`Producto ${shoe.name} agregado al carrito`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          // zIndex: 999,//! BLOQUEA LA BARRA DE NAVEGACION
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        
        <Card sx={{ maxWidth: 345 }}>
          {/* <img src={shoe.image} alt={shoe.name} sx={{ height: 140 }} /> */}
          <img src={shoe.image} alt={shoe.name} />

          <CardContent>
            <button onClick={()=> addToCart()}>
              Agregar al Carrito
            </button>
            <Typography gutterBottom variant="h5" component="h2">
              {shoe.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {shoe.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Stock: {shoe.stock}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Discount: {shoe.discount}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Size: {shoe.ShoeSize?.size}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Brand: {shoe.ShoeBrand?.brand}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Color: {shoe.ShoeColor?.color}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Gender: {shoe.ShoeGender?.gender}
            </Typography>
            {shoe.ShoeCategories?.map((category, index) => (
              <Chip key={index} label={category.category} />
            ))}
            <Reviews/>
          </CardContent>

        </Card>
      </Box>

    </ThemeProvider>
    
  )
}

export default ShoeDetail
