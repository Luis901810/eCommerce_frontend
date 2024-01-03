import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { updateUser } from '../../redux/actions'
import { useAuth } from '../../contexts/AuthContext'

const UserProfile = () => {
  const { user } = useAuth()
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const idUser = null
  console.log(user)

  useEffect(() => {
    const loadUserProfile = async () => {
      return
      try {
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
      <h1>{user.email}</h1>
      <h1>User Profile:</h1>
      <h3>
        Name:{' '}
        {isEditing ? (
          <input
            type='text'
            value={usuario.name}
            onChange={event =>
              setUsuario({ ...usuario, name: event.target.value })
            }
          />
        ) : (
          usuario.name
        )}
      </h3>

      <h3>Email: {usuario.email}</h3>

      <h3>
        Password:
        {isEditing ? (
          <input
            type='password'
            value={usuario.password}
            onChange={event =>
              setUsuario({ ...usuario, password: event.target.value })
            }
          />
        ) : (
          usuario.password
        )}
      </h3>

      {isEditing ? (
        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
      ) : (
        <button onClick={handleEditarPerfil}>Editar Perfil</button>
      )}
    </div>
  )
}

export default UserProfile
