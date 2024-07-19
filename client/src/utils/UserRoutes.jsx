import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const UserRoutes = ({ children }) => {
  const { isLoggedIn, role } = useAuth()

  if (isLoggedIn && role === 'user') {
    return <>{children}</>
  }

  return <Navigate to="/login" />
}

export default UserRoutes