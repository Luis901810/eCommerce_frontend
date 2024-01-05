import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function DeleteAccount() {
  const { user, reauthenticate } = useAuth()
  const navigate = useNavigate()
  const handleDelete = async () => {
    if (user) {
      try {
        // * Reautenticar usuario antes de eliminar la cuenta
        await reauthenticate()
        // Eliminar la cuenta
        await user.delete()
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
