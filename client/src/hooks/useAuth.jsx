import { useState, useEffect } from 'react'

const useAuth = () => {
  const [role, setRole] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const checkLogin = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/users/me`, {
            method: 'GET',
            credentials: 'include'
        })

        if (res.ok) {
          const data = await res.json()
          console.log(data.role)
          setIsLoggedIn(true)
          setRole(data.role)    
        } else {
          setIsLoggedIn(false)
          setRole(null)
        }
      } catch (err) {
        console.error('Error fetching user info: ', err.message)
      } finally {
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return { role, isLoggedIn, loading }
}

export default useAuth