import React, { useEffect } from 'react'
import NavBar1 from '../components/NavBar1'
import Footer2 from '../components/Footer2'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const { isLoggedIn, role } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn && role === 'admin') navigate('/adminPanel')  
  }, [role, isLoggedIn])

  return (
    <>
        <NavBar1 />
        <section className='bg-slate-50 py-20'>
        <div className='bg-white lg:w-[50%] w-[92%] mx-auto py-14 shadow-md'>
          <div className='text-center'>
            <i className='bx bx-error lg:text-[130px] text-[100px] text-amber-400'></i>
          </div>
        <div className='lg:text-3xl text-lg pt-6 text-center font-bold uppercase'>404 Not Found!</div>
        <div className='text-center py-6'>
          <p className='lg:text-xl text-[14px] font-semibold'>Page Not Found!</p>
        </div>
      </div>
      </section>
        <Footer2 />
    </>
  )
}

export default NotFound