import { Card, Box, CardMedia, Typography } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import IconButton from '@mui/material/IconButton'
import { useSelector } from 'react-redux'

const CardShoe = ({ product }) => {
  const cardShoeStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: 'none',
    transition: 'box-shadow 0.3s, border 0.3s',
    borderRadius: '50',
    width: '140'
  }

  const genders = useSelector((state) => state.genders)
  const colors = useSelector((state) => state.colors)

  const gender = genders.find(item => item.id === product.genderId)
  const color = colors.find(item => item.id === product.colorId)
  console.log(color)
  return (
    <Box >
        <p>product.name</p>
      <Card style={cardShoeStyle}>
        <CardMedia
          component="img"
          height="140"
          width="140"
          image="https://www.dtlr.com/cdn/shop/articles/DZ5485-400-A_905x.jpg?v=1689610057"
          alt="Hay que cambiar"
        />
        <Typography
        variant="h5"
        sx={{ color: '#fff', textAlign: 'center' }}>
            {product.name}
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
        <IconButton aria-label="cart" >
            <ShoppingCartOutlinedIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Card>
    </Box>
  )
}

export default CardShoe
