import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const AdminRoutes = ({ children }) => {
  const { isLoggedIn, role, isVerified } = useAuth()

  if (isLoggedIn && isVerified && role === 'admin') {
    return <>{children}</>
  }

  return <Navigate to="/login" />
}

export default AdminRoutes
