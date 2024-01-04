import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../../configFirebase.js'

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
    return await signInWithPopup(auth, googleProvider)
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
      }}
    >
      {!loading && children}
    </authContext.Provider>
  )
}
