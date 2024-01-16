import { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { getUserByEmail, updateUser } from '../../redux/actions'
import { useAuth } from '../../contexts/AuthContext'
import DeleteAccount from './DeleteAccount'
import UserOptions from './UserOptions/UserOptions'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import {

  CardMedia,
  Typography,
} from '@mui/material'

const UserProfile = () => {
  const dispatch = useDispatch()
  const idUser = useSelector(state => state.User.id)
  console.log("ID del REDUX",idUser)
  // const {user} = useAuth();
  // console.log("ESTE ES EL USUARIO",user.email)
  
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    profilePicture: '',
    createdAt: '',
  })
  console.log('USUARIO: ',usuario)
  useEffect(() => {
    // dispatch(getUserByEmail(user.email));
    const loadUserProfile = async (idUser) => {
      try {
        console.log('Info User')
        const userInfo = await updateUser(idUser, {})
        setUsuario(userInfo)
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error)
      }
    }
    if (idUser) loadUserProfile(idUser)
  }, [idUser])

  const textStyle = {
    color: 'white'
  }

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <UserOptions />
      <Box
        sx={{
          backgroundColor: '#303030',
          padding: 10,
          border: '1px solid #42e268',
          borderRadius: 5,
        }}
      >
        <CardMedia
          component="img"
          image={usuario.profilePicture}
          alt="Imagen de perfil"
          sx={{ width: 250, height: 250, objectFit: 'contain',borderRadius: "100%" }}
        />
        <Typography variant='h5' style={textStyle}>
          Nombre: {usuario.name}
        </Typography>
        <Typography variant='h5' style={textStyle}>
          Email: {usuario.email}
        </Typography>
        <Typography variant='h5' style={textStyle}>
          Número de Teléfono: {usuario.phoneNumber}
        </Typography>
        <Typography variant='h5' style={textStyle}>
          Fecha de Nacimiento: {usuario.birthDate}
        </Typography>
        <Typography variant='h5' style={textStyle}>
          Fecha de Creación: {usuario.createdAt}
        </Typography>
      </Box>
    </Box>
  )
}

export default UserProfile
