import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../Alert/Alert'
import styles from './Login.module.css'
import logoGoogle2 from '../../Fhoto/logo_google2.jpg'

const Login = () => {
  const navigate = useNavigate()
  const { login, loginWithGoogle } = useAuth()
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
      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      console.log(error.code)
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
      setError(error.message)
    }
  }

  return (
    <div>
      {error && <Alert message={error} />}

      <div>
        <img
          className={styles.imgLogos}
          src={logoGoogle2}
          alt='google'
          onClick={handleGoogleSignin}
        />
      </div>

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
    </div>
  )
}

export default Login
