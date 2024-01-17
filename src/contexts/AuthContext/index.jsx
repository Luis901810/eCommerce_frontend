import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  reauthenticateWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser as deleteFirebaseUser,
} from 'firebase/auth'
import { auth } from '../../configFirebase.js'
import createUser from '../../services/User/createUser.jsx'
import updateUser from '../../services/User/updateUser.jsx'
import findOneUser from '../../services/User/findOne.js'
import deleteUserBack from '../../services/User/deleteUser.jsx'
import { API_URL } from '../../redux/actions-type.js'
import axios from 'axios'

const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) throw new Error('No se encontró un proveedor de autenticación.')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createWithEmailAndPassword = async (email, password) => {
    try {
      // Validar usuario existente
      await findOneUser({ userEmail: email, findType: 'email' })
      return { error: 'El usuario ya existe' }
    } catch (error) {
      try {
        // Crear usuario en Firebase
        const result = await createUserWithEmailAndPassword(auth, email, password)
        // Crear usuario en el Backend
        const { data: roles } = await axios(API_URL + '/user-rol')
        const clientRol = roles.find(rol => rol.rol === 'Cliente')
        await createUser({
          email,
          password,
          firebaseUid: result.user.uid,
          requiredUserName: false,
          requiredPhoneNumber: false,
          roleId: clientRol.id
        })
        return { error: false }
      } catch (error) {
        return { error: 'Error al crear usuario' }
      }
    }
  }

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      // Validar usuario existente
      await findOneUser({ userEmail: email, findType: 'email' })
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error('El usuario no existe')
    }
  }

  const logout = async () => signOut(auth)

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, googleProvider)
    // * Crear o actualizar usuario en el backend
    const { data: roles } = await axios(API_URL + '/user-rol')
    const clientRol = roles.find(rol => rol.rol === 'Cliente')
    try {
      await createUser({
        email: result.user.email,
        firebaseUid: result.user.uid,
        requiredUserName: false,
        requiredPhoneNumber: false,
        requiredUserPassword: false,
        roleId: clientRol.id
      })
    } catch (error) { }
  }

  const deleteUser = async () => {
    if (!user) throw new Error('No hay usuario a eliminar')
    const providers = user.providerData.map(provider => provider.providerId)
    if (providers.includes(GoogleAuthProvider.PROVIDER_ID)) {
      const provider = new GoogleAuthProvider()
      await reauthenticateWithPopup(user, provider)
      await user.delete()
    } else if (providers.includes(EmailAuthProvider.PROVIDER_ID)) {
      await user.delete()
    }
  }

  const adminDeleteUser = async (userToDelete, adminPassword) => {
    if (!user) throw new Error('El admin debe estar logeado')
    // ! Crear la credencial de usuario administrador
    let adminCredential
    const providers = user.providerData.map(provider => provider.providerId)
    if (providers.includes(GoogleAuthProvider.PROVIDER_ID)) {
      // Si el administrador inició sesión con Google, utiliza GoogleAuthProvider
      adminCredential = GoogleAuthProvider.credentialFromResult(user)
    } else if (providers.includes(EmailAuthProvider.PROVIDER_ID)) {
      // Si el administrador inició sesión con correo y contraseña, utiliza EmailAuthProvider
      console.log(user.email, adminPassword);
      adminCredential = EmailAuthProvider.credential(user.email, adminPassword)
    }
    try {
      // Reautenticar al administrador con el token personalizado
      await reauthenticateWithCredential(user, adminCredential)
      // Eliminar al usuario especificado por su UID
      await auth.deleteUser(userToDelete.firebaseUid)
      // await deleteFirebaseUser(auth, userToDelete.firebaseUid)
      // await deleteUserBack({ id: userToDelete.id, hardDelete: true })
      console.log({ adminCredential });
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        createWithEmailAndPassword,
        loginWithEmailAndPassword,
        logout,
        loginWithGoogle,
        deleteUser,
      }}
    >
      {!loading && children}
    </authContext.Provider>
  )
}
