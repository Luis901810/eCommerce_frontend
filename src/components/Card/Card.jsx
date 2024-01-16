import { Card, Box, CardMedia, Typography } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToShoppingCart } from '../../redux/actions'
import { showErrorAlert, showSuccessAlert } from '../../alerts/alerts'


const CardShoe = ({ product }) => {
  
  const {stock} = product
  console.log(stock)
  const cardShoeStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none',
    transition: 'box-shadow 0.3s, border 0.3s',
    borderRadius: '50',
    width: '140'
  }
  const dispatch = useDispatch();

  const genders = useSelector((state) => state.genders)
  const colors = useSelector((state) => state.colors)
  const sizes = useSelector((state) => state.sizes)
  const shoes = useSelector((state) => state.Shoes)


  const gender = genders.find(item => item.id === product.genderId)
  const color = colors.find(item => item.id === product.colorId)
  const size = sizes.find(item => item.id === product.sizeId)
  
  const addToCart = (idProducto) => {

    const selectedShoe = shoes.find(shoe => shoe.id === idProducto);
    dispatch(addToShoppingCart(selectedShoe))
    console.log('Agregado :',selectedShoe.name)
    showSuccessAlert(`Producto ${selectedShoe.name} agregado al carrito`)
  };
  const defaultImage =
    "https://www.dtlr.com/cdn/shop/articles/DZ5485-400-A_905x.jpg?v=1689610057"
  return (
    <Box >
      <Card style={cardShoeStyle}>
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={product.image|| defaultImage}//!Para que muestre las fotos
          alt={product.name}
        />
        
        <Typography
        variant="h5"
        sx={{ color: '#fff', textAlign: 'center' }}>
            <Link to={`/detail/${product.id}`}>{product.name}</Link>
        </Typography>
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
            <Typography

        sx={{
          color: '#fff',
          textAlign: 'center',
          padding: 2
        }}>
            {gender.gender}
        </Typography>
        <Typography

        sx={{
          color: '#fff',
          textAlign: 'center',
          padding: 2
        }}>
            {color.color}
        </Typography>

        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <Typography
        variant="h4"
        sx={{ color: '#fff', textAlign: 'center' }}>
            ${product.price}
        </Typography>
        <IconButton aria-label="cart" onClick={() =>  stock === 0 ? showErrorAlert("No hay stock disponible") : addToCart(product.id)}>{/* //!funcion para agregar al carrito al darle click */}
            {stock === 0 ? (
              <RemoveShoppingCartIcon sx={{ color: 'red' }} />
            ) : (
              <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
            )}
        </IconButton>
        </Box>
      </Card>
    </Box>
  )
}

export default CardShoe
