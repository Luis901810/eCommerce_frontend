import { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { getUserByEmail, updateUser } from '../../redux/actions'
import { useAuth } from '../../contexts/AuthContext'
import DeleteAccount from './DeleteAccount'
import UserOptions from './UserOptions/UserOptions'
import { useDispatch, useSelector } from 'react-redux'

const UserProfile = () => {
  const dispatch = useDispatch()
  const idUser = useSelector(state => state.User.id)
  console.log("ID del REDUX",idUser)
  const {user} = useAuth();
  console.log("ESTE ES EL USUARIO",user.email)
  
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    dispatch(getUserByEmail(user.email));
    const loadUserProfile = async (idUser) => {
      try {
        console.log('Info User')
        const userInfo = await updateUser(idUser, {})
        setUsuario(userInfo)
      } catch (error) {
        console.error('Error al cargar el perfil del usuario:', error)
      }
    }
    if (idUser) loadUserProfile(idUser)
  }, [idUser])

  return (
    <div>
      <NavBar />

      <h1>User Profile:</h1>
      <UserOptions/>
      <h3>Name: {usuario.name}</h3>
      <h3>Email: {usuario.email}</h3>
      <h3>Password: **********</h3>

      <div>
        <DeleteAccount />
      </div>
    </div>
  )
}

export default UserProfile
