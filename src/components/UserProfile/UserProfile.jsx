import { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { getUserByEmail, updateUser } from '../../redux/actions'
import { useAuth } from '../../contexts/AuthContext'

import UserOptions from './UserOptions/UserOptions'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

const UserProfile = () => {
  const dispatch = useDispatch()
  const idUser = useSelector(state => state.User.id)
  console.log('ID del REDUX', idUser)
  const { user } = useAuth()
  console.log('ESTE ES EL USUARIO', user.email)

  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    dispatch(getUserByEmail(user.email))
    const loadUserProfile = async idUser => {
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
    marginTop: 10,
    color: 'white',
  }

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: 'Center',
        padding: 10,
        alignItems: 'center'
      }}
    >
      <UserOptions />
      <Box sx={{ backgroundColor: '#303030', padding: 10, border: '1px solid #42e268', borderRadius: 5 }}>
        <Typography variant='h3' style={textStyle}>
          Name: {usuario.name}
        </Typography>
        <Typography variant='h3' style={textStyle}>
          Email: {usuario.email}
        </Typography>
        <Typography variant='h3' style={textStyle}>
          Password: **********
        </Typography>
      </Box>
    </Box>
  )
}

export default UserProfile
