import { useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import { useDispatch } from 'react-redux'
import { createUser } from '../../../redux/actions'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    console.log(event)
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  // Manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault()
    // enviarla al back
    console.log('Información del usuario registrada:', formData)
    dispatch(createUser(formData))
  }
  const isFormEmpty = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Verificar que todos los campos estén presentes y en el formato correcto
    return (
      formData.name.trim() !== '' &&
      emailRegex.test(formData.email) &&
      formData.password.trim() !== ''
    )
  }

  return (
    <div>
      <NavBar />
      <h1>Register:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit" disabled={!isFormEmpty()} >Registrarse</button>
      </form>
    </div>
  )
}

export default Register
