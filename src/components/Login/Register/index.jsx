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
import { Google } from '@mui/icons-material'
import createUser from '../../../services/User/createUser'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { email, setEmail, emailError, setEmailError } = useEmail()
  const { password, setPassword, passwordError, setPasswordError } =
    usePassword()
  const navigate = useNavigate()
  const { createWithEmailAndPassword, loginWithGoogle } = useAuth()

  const handleEmailChange = ({ target: { value } }) => {
    setEmail(value)
    setEmailError(value)
  }

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value)
    setPasswordError(value)
  }

  const isValidForm = () => emailError || passwordError

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await createWithEmailAndPassword(email, password)
      const data = await createUser({
        email,
        password,
        requiredUserName: false,
        requiredPhoneNumber: false,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }

  const handleGoogleSingUp = async () => {
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      console.error(error)
      alert(error.message)
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
            onClick={handleGoogleSingUp}
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
            onClick={handleSubmit}
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
