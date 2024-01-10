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
          hardDelete: true,
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
    <Button variant='contained' color='secondary' onClick={handleDelete}>
      Eliminar cuenta
    </Button>
  )
}
