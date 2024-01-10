import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import deleteUserBack from '../../services/User/deleteUser'

export default function DeleteAccount() {
  const { user, deleteUser, logout } = useAuth()
  const navigate = useNavigate()
  const handleDelete = async () => {
    if (user) {
      try {
        await deleteUser() // ! Solo puede eliminarse usuarios registrados con Google
        deleteUserBack({
          id: user.email,
          deleteType: 'email',
        })
        navigate('/')
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    } else {
      console.error('No hay usuario logueado')
    }
  }
  return (
    <Button
      variant='contained'
      sx={{
        backgroundColor: '#ff4646',
        '&:hover': {
          backgroundColor: '#ff0000',
        },
      }}
      onClick={handleDelete}
    >
      Eliminar cuenta
    </Button>
  )
}
