import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../confgFireBase.js";

export const authContext = createContext()

export const useAuth = () =>{
    const context = useContext(authContext)

    if(!context) throw new Error("no hay Provider")
    return context;
}
export function AuthProvider( { children } ){
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)



    const signup = async( email, password ) => await  createUserWithEmailAndPassword(auth, email, password)
    const login = async (email, password) => await signInWithEmailAndPassword(auth, email, password)
    const logaut = async ()=> signOut(auth)
    const loginWithGoogle = () =>{
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
    }

    useEffect(() =>{
        onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        setLoading(false)

    })
}, [])
return(
    <authContext.Provider value={{user,loading,signup,login,logaut,loginWithGoogle}}>
        {!loading && children}
    </authContext.Provider>
)
}
