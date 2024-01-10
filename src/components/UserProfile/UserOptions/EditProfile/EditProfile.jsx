import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import UserOptions from '../UserOptions'
import { updateUser } from '../../../../redux/actions'

const UserProfile = () => {
  const dispatch = useDispatch()
  const idUser = useSelector(state => state.User.id)
  console.log('ID del REDUX', idUser)
  // const idUser = "d9008f7f-b478-43ec-82ed-a7839a246d34"
  // const {user} = useAuth();
  // console.log("ESTE ES EL USUARIO",user.email)

  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // dispatch(getUserByEmail(user.email));
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

  const handleEditarPerfil = () => {
    // Cambia el estado de edición al hacer clic en "Editar Perfil"
    setIsEditing(true)
  }

  const handleGuardarCambios = () => {
    // Lógica para guardar cambios y actualizar el perfil del usuario
    console.log('Nuevos datos del usuario', usuario)
    console.log('Guardar cambios')
    updateUser(idUser, usuario)
    setIsEditing(false)
  }

  return (
    <Box
      sx={{
        mt: 10,
        display: 'flex',
        justifyContent: 'Center',
        padding: 10,
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
      <h3>
        Name:{' '}
        {isEditing ? (
          <input
            type='text'
            value={usuario.name}
            onChange={event =>
              setUsuario({ ...usuario, name: event.target.value })
            }
          />
        ) : (
          usuario.name
        )}
      </h3>

      <h3>Email: {usuario.email}</h3>

      <h3>
        Password:
        {isEditing ? (
          <input
            type='password'
            value={usuario.password}
            onChange={event =>
              setUsuario({ ...usuario, password: event.target.value })
            }
          />
        ) : (
          usuario.password
        )}
      </h3>

      {isEditing ? (
        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
      ) : (
        <button onClick={handleEditarPerfil}>Editar</button>
      )}
      </Box>
    </Box>
  )
}

export default UserProfile
