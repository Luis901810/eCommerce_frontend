import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { updateUser } from '../../redux/actions'
import { useAuth } from '../../contexts/AuthContext'
import DeleteAccount from './DeleteAccount'

const UserProfile = () => {
  const { idUser } = useParams()
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        console.log('Info User')
        const userInfo = await updateUser(idUser, {})
        setUsuario(userInfo)
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error)
      }
    }
    loadUserProfile()
  }, [idUser])

  const handleEditarPerfil = () => {
    // Cambia el estado de edición al hacer clic en "Editar Perfil"
    setIsEditing(true)
  }

  const handleGuardarCambios = () => {
    // Lógica para guardar cambios y actualizar el perfil del usuario
    console.log('Nuevos datos del usuario', usuario)
    console.log('Guardar cambios')
    updateUser(idUser, usuario)
    setIsEditing(false)
  }

  return (
    <div>
      <NavBar />
      <h1>User Profile:</h1>
      <h3>Name: {isEditing
        ? <input type="text" value={usuario.name} onChange={(event) =>
          setUsuario({ ...usuario, name: event.target.value })} />
        : usuario.name}</h3>

      <h3>Email: {usuario.email}</h3>

      <h3>Password:
        {isEditing
          ? <input type="password" value={usuario.password} onChange={(event) =>
            setUsuario({ ...usuario, password: event.target.value })} />
          : usuario.password}</h3>

      {isEditing
        ? (
        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
          )
        : (
        <button onClick={handleEditarPerfil}>Editar Perfil</button>
      )}
      <div>
        <DeleteAccount />
      </div>
    </div>
  )
}

export default UserProfile
