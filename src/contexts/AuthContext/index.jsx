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
} from 'firebase/auth'
import { auth } from '../../configFirebase.js'
import createUser from '../../services/User/createUser.jsx'

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
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password)

  const logout = async () => signOut(auth)

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, googleProvider)
    // * Registrar usuario si se loguea por primera vez
    const { isNewUser } = getAdditionalUserInfo(result)
    const userCredential = result.user
    const { email } = userCredential
    if (isNewUser) {
      await createUser({
        email,
        requiredUserName: false,
        requiredPhoneNumber: false,
        requiredUserPassword: false,
      })
    }
  }

  const reauthenticate = async () => {
    const provider = new GoogleAuthProvider()
    await reauthenticateWithPopup(user, provider)
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
        login,
        logout,
        loginWithGoogle,
        reauthenticate,
      }}
    >
      {!loading && children}
    </authContext.Provider>
  )
}
