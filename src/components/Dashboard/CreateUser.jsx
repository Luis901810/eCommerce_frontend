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
import { useEmail } from '../../hooks/Auth/Register/useEmail'
import { usePassword } from '../../hooks/Auth/Register/usePassword'
import createUser from '../../services/User/createUser'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
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

  

  return <Box>To Do</Box>
}
