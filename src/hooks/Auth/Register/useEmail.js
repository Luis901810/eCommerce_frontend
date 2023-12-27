import { useState } from 'react'
import { isEmail } from '../../../utils/validators/isEmail'

export function useEmail() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const setEmailError = (email) => setError(!isEmail(email))

    return {
        email,
        setEmail,
        emailError: error,
        setEmailError,
    }
}
