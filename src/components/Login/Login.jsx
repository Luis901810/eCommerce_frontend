import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../Alert/Alert'
import styles from './Login.module.css'
import logoGoogle2 from '../../Fhoto/logo_google2.jpg'
import { Box } from '@mui/system'
import {
  FormControl,
  TextField,
  Button,
  FormLabel,
  Typography,
} from '@mui/material'

import Divider from '@mui/material/Divider'

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
    width: '30px',
    borderRadius: 100,
  }

  return (
    <Box sx={{ padding: 5 }}>
      <Box
        sx={{
          padding: 5,
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#414141',
          alignItems: 'center',
        }}
      >
        <FormControl>
          <FormLabel htmlFor='email' style={{ color: 'white' }}>
            Correo:
          </FormLabel>
          <TextField
            type='email'
            name='email'
            id='email'
            placeholder='Ingrese su correo'
            onChange={handleChange}
            value={user.email || ''}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              border: '1px solid #42e268 ',
              borderRadius: 2,
              backgroundColor: '#303030',
            }}
          />

          <FormLabel
            htmlFor='password'
            style={{ color: 'white', marginTop: '5px' }}
          >
            Contraseña:
          </FormLabel>
          <TextField
            type='password'
            name='password'
            id='password'
            placeholder='***********'
            onChange={handleChange}
            value={user.password || ''}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              border: '1px solid #42e268 ',
              borderRadius: 2,
              backgroundColor: '#303030',
            }}
          />

          <Button
            sx={{
              mt: 2,
              backgroundColor: '#42e268',
              '&:hover': {
                backgroundColor: '#00ff3d',
              },
            }}
            onClick={() => handleSubmit()}
          >
            <Typography variant='h7' color='white'>
              Ingresar
            </Typography>
          </Button>

          {error && <Alert message={error} />}
          <Divider sx={{ mt: 3 }} component={Button} />
          <Typography variant='h6' color='white' sx={{ mt: 3, mb: 2 }}>
            Tambien puedes:{' '}
          </Typography>

          <Button
            sx={{
              backgroundColor: '#42e268',
              '&:hover': {
                backgroundColor: '#00ff3d',
              },
            }}
            onClick={handleGoogleSignin}
          >
            <img style={imgStyle} src={logoGoogle2} alt='google' />
            <Typography variant='h7' color='white'>
              Iniciar sesion con google
            </Typography>
          </Button>
          <Typography sx={{ mt: 1, mb: 1 }} variant='h7' color='white'>
            O
          </Typography>
          <Button
            sx={{
              backgroundColor: '#ff4646',
              '&:hover': {
                backgroundColor: '#ff0000',
              },
            }}
            onClick={() => navigate('/Login/Register')}
          >
            <Typography variant='h7' color='white'>
              Registrarte
            </Typography>
          </Button>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Login
