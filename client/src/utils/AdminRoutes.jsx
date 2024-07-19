import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthContext'

const AdminRoutes = ({ children }) => {
  const { isLoggedIn, role } = useAuth()

  if (isLoggedIn && role === 'admin') {
    return <>{children}</>
  }

  return <Navigate to="/login" />
}

export default AdminRoutes
