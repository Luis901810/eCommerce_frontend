import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../Alert/Alert'
import styles from './Login.module.css'
import logoGoogle2 from '../../Fhoto/logo_google2.jpg'
import { Box } from '@mui/system'
import { FormControl, TextField, Button } from '@mui/material'

const Login = () => {
  const navigate = useNavigate()
  const { loginWithEmailAndPassword, loginWithGoogle } = useAuth()
  const [error, setError] = useState('')

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = event => {
    const { name, value } = event.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await loginWithEmailAndPassword(user.email, user.password)
      navigate('/')
    } catch (error) {
      console.log(error.code)
      alert(error.message)
      if (error.code === 'auth/invalid-credential') {
        setError('Usuario o Contraseña invalido')
      } else {
        setError(
          'Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.'
        )
      }
    }
  }

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  }

  const imgStyle = {
    width: '50px',
    borderRadius: 100
  }

  return (
    <Box sx={{padding: 5, mt: 5}} >
      {error && <Alert message={error} />}

        <img
          style={imgStyle}
          src={logoGoogle2}
          alt='google'
          onClick={handleGoogleSignin}
        />

      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Correo</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Ingrese su correo'
          onChange={handleChange}
          value={user.email || ''}
        />

        <label htmlFor='password'>Contraseña</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='***********'
          onChange={handleChange}
          value={user.password || ''}
        />

        <button>Ingresar</button>
        <Link to='/Login/Register'>
          <button>Registrarse</button>
        </Link>
      </form>
    </Box>
  )
}

export default Login
