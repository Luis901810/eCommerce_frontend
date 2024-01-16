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
    const result = await createUserWithEmailAndPassword(auth, email, password)
    try {
      await createUser({
        email,
        password,
        firebaseUid: result.user.uid,
        requiredUserName: false,
        requiredPhoneNumber: false,
      })
    } catch (error) {}
  }

  const loginWithEmailAndPassword = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password)

  const logout = async () => signOut(auth)

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, googleProvider)
    // * Crear o actualizar usuario en el backend
    try {
      await createUser({
        email: result.user.email,
        firebaseUid: result.user.uid,
        requiredUserName: false,
        requiredPhoneNumber: false,
        requiredUserPassword: false,
      })
    } catch (error) {}
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

  const adminDeleteUser = async userToDelete => {
    if (!user) throw new Error('El admin debe estar logeado')
    // ! Crear la credencial de usuario administrador
    let adminCredential
    const providers = user.providerData.map(provider => provider.providerId)
    if (providers.includes(GoogleAuthProvider.PROVIDER_ID)) {
      // Si el administrador inició sesión con Google, utiliza GoogleAuthProvider
      adminCredential = GoogleAuthProvider.credentialFromResult(user)
    } else if (providers.includes(EmailAuthProvider.PROVIDER_ID)) {
      return console.log('EMAIL AND PASSWORD')
      // Si el administrador inició sesión con correo y contraseña, utiliza EmailAuthProvider
      adminCredential = EmailAuthProvider.credential(user.email, user.password)
    }
    // Reautenticar al administrador con el token personalizado
    return console.log({ adminCredential })
    await reauthenticateWithCredential(user, adminCredential)

    // Eliminar al usuario especificado por su UID
    await deleteFirebaseUser(auth, userToDelete.firebaseUid)
    await deleteUserBack({ id: userToDelete.id, hardDelete: true })
  }

  const delete2 = async userToDelete => {
    const userToDeleteRef = auth.getUser(userToDelete.firebaseUid)
    console.log({ userToDeleteRef })
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
        // adminDeleteUser: delete2,
      }}
    >
      {!loading && children}
    </authContext.Provider>
  )
}
