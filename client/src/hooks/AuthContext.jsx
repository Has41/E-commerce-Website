// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const apiURL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${apiURL}/api/users/me`, {
          method: 'GET',
          credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          setIsLoggedIn(true)
          setRole(data.role)
        } else {
          setIsLoggedIn(false)
          setRole(null)
        }
      } catch (err) {
        console.error('Error fetching user info: ', err.message)
        setIsLoggedIn(false)
        setRole(null)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [apiURL])

  const logout = () => {
    setIsLoggedIn(false)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ role, setRole, isLoggedIn, setIsLoggedIn, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}