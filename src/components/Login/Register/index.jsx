import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Container,
  InputLabel,
  Input,
  FormHelperText,
  FormControl,
  Typography,
  Divider,
} from '@mui/material'
import { useEmail } from '../../../hooks/Auth/Register/useEmail'
import { usePassword } from '../../../hooks/Auth/Register/usePassword'
import createUserAPI from '../../../services/User/createUser'
import { Google } from '@mui/icons-material'

const Register = () => {
  const { email, setEmail, emailError, setEmailError } = useEmail()
  const { password, setPassword, passwordError, setPasswordError } =
    usePassword()

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value)
    setEmailError(value)
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value)
    setPasswordError(value)
  }

  const isValidForm = () => emailError || passwordError

  const createUser = async event => {
    event.preventDefault()
    const formData = {
      email,
      password,
      requiredUserName: false,
      requiredPhoneNumber: false,
    }
    const data = await createUserAPI(formData)
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      alert('El usuario ha sido creado con éxito!')
    }
  }

  return (
    <Container
      maxWidth='lg'
      style={{
        paddingTop: '100px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={10}
        style={{ padding: '20px', width: 360, height: 500 }}
      >
        <Grid style={{ padding: '10px' }}>Registrate en EcommerceZapatos</Grid>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant='contained'
            disableElevation
            style={{
              margin: '10px 0',
              backgroundColor: 'transparent',
              border: '1px solid #42e268',
              width: 300,
            }}
            startIcon={<Google />}
            // onClick={createUser}
            // disabled={isValidForm()}
          >
            Google
          </Button>
          <Divider style={{ width: 300, margin: '20px 0' }} />
          <Grid
            item
            style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '0.8rem' }}
          >
            Usar email y contraseña
          </Grid>
          <FormControl sx={{ marginTop: '20px' }}>
            <InputLabel style={{ paddingRight: '10px' }} htmlFor='email-input'>
              Email
            </InputLabel>
            <Input
              id='email-input'
              style={{ width: 300 }}
              type='email'
              name='email'
              value={email}
              onChange={handleEmailChange}
              placeholder='tucorreo@ejemplo.com'
              error={emailError}
            />
            {emailError && <FormHelperText>Correo inválido</FormHelperText>}
          </FormControl>
          <FormControl sx={{ margin: '20px 0' }}>
            <InputLabel
              style={{ paddingRight: '10px' }}
              htmlFor='password-input'
            >
              Contraseña
            </InputLabel>
            <Input
              id='password-input'
              style={{ width: 300 }}
              type='password'
              name='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='contraseña segura'
              error={passwordError}
            />
            {passwordError && (
              <FormHelperText>Contraseña muy corta</FormHelperText>
            )}
          </FormControl>
          <Button
            variant='contained'
            disableElevation
            style={{
              marginTop: '10px',
              backgroundColor: '#42e268',
              width: 300,
            }}
            onClick={createUser}
            disabled={isValidForm()}
          >
            Completar registro
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Register
