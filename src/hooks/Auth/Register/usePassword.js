import { useState } from 'react'

export function usePassword() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const setPasswordError = (password) => {
        const regex = /^.{6,}$/
        setError(!regex.test(password))
    }

    return {
        password,
        setPassword,
        passwordError: error,
        setPasswordError,
    }
}
