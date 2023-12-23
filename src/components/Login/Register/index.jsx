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
} from '@mui/material'
import { useEmail } from '../../../hooks/Auth/Register/useEmail'
import { usePassword } from '../../../hooks/Auth/Register/usePassword'

const Register = () => {
  const { email, setEmail, emailError, setEmailError } = useEmail()
  const { password, setPassword, passwordError, setPasswordError } =
    usePassword()
  console.log({ valid: emailError })

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value)
    setEmailError(value)
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value)
    setPasswordError(value)
  }

  const isValidForm = () => emailError || passwordError

  const createUser = event => {
    event.preventDefault()
    const formData = {
      email,
      password,
    }
    console.log('Información del usuario registrada:', formData)
  }

  return (
    <Container maxWidth='lg' style={{ paddingTop: '99px' }}>
      <Grid>
        <Paper elevation={10} style={{ padding: '20px' }}>
          <Grid style={{ padding: '10px' }}>
            Registrate en EcommerceZapatos
          </Grid>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl sx={{ marginTop: '20px' }}>
              <InputLabel
                style={{ paddingRight: '10px' }}
                htmlFor='email-input'
              >
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
              style={{ marginTop: '10px', backgroundColor: '#42e268' }}
              onClick={createUser}
              disabled={isValidForm()}
            >
              Completar registro
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Container>
  )
}

export default Register
