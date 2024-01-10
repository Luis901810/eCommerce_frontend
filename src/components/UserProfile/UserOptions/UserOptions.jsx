import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { getUserByEmail } from '../../../redux/actions'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import DeleteAccount from '../DeleteAccount'

const UserOptions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth()
  if (user && user.email) dispatch(getUserByEmail(user.email))
  else console.log('nope');

  const buttonStyle = {
    color: '#42e268',
    '&:hover': {
     color: '#00ff3d',
    },
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '2px solid #42e268',
        borderTop: '2px solid #42e268',
        borderBottom: '2px solid #42e268',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 2,
        backgroundColor: '#303030',
        maxHeight: '350px',
      }}
    >
      <Typography variant='h5' color='white'>
        Opciones de Usuario
      </Typography>

      <Button style={buttonStyle} onClick={() => navigate(`/UserProfile/${user.email}`)}>
        Perfil de Usuario
      </Button>

      <Button style={buttonStyle}onClick={() => navigate(`/EditProfile/${user.email}`)}>
        Editar Perfil
      </Button>

      <Button style={buttonStyle} onClick={() => navigate(`/PurchaseHistory/${user.email}`)}>
        Historial de Compras
      </Button>

      <Button style={buttonStyle} onClick={() => navigate(`/UserReviews/${user.email}`)}>
        Reseñas
      </Button>

      <DeleteAccount />
    </Box>
  )
}

export default UserOptions
