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
  if (!context) {
    console.warn('No se encontró un proveedor de autenticación.')
    return {
      user: null,
      loading: false,
      signup: () => {},
      login: () => {},
      logout: () => {},
      loginWithGoogle: () => {},
    }
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const _createUserWithEmailAndPassword = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      return response
    } catch (error) {
      console.log(error)
      return { error: error.message }
    }
  }

  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password)

  const logout = async () => signOut(auth)

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
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
        createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
        login,
        logout,
        loginWithGoogle,
      }}
    >
      {!loading && children}
    </authContext.Provider>
  )
}
