import React, { useEffect, useState } from 'react'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'
import { Link, useNavigate } from 'react-router-dom'

const Success = () => {
  const [userData, setUserData] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(false)

  const checkLogin = async () => {
    try {
        const res = await fetch(`/api/users/me`)
        if(res.ok) {
            const data = await res.json()
            setLoggedIn(data)
            setUserData(data)
        } else {
            setLoggedIn(false)
        }
    } catch (err) {
        console.error('Error fetching user info: ', err.message)
    }
}

useEffect(() => {
  checkLogin()
},[])

  return (
    <>
        <NavBar1 />
        <section className='bg-slate-50 py-20'>
        <div className='bg-white lg:w-[50%] w-[92%] mx-auto py-14 shadow-md'>
          <div className='text-center'>
            <i className='bx bxs-check-circle lg:text-[100px] text-[60px] text-green-600'></i>
          </div>
          <div className='lg:text-3xl text-lg pt-6 text-center font-bold uppercase'>Payment Success!</div>
          <div className='text-center py-6'>
            <p className='lg:text-xl text-[14px] font-semibold'>Your Order Has Been Successfully Placed!</p>
          </div>
          <div className='text-center mt-8'>
              <button className='px-5 py-3 border-2 border-black/80 font-bold lg:text-lg text-base rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins'>
                <Link to={'/orders'}>Check Order Details</Link>
              </button>
          </div>
          <div className='text-center mt-8'>
              <button className='px-5 py-3 border-2 border-black/80 font-bold lg:text-lg text-base rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins'>
                <Link to={'/products'}>Continue To Shopping!</Link>
              </button>
          </div>
        </div>
        </section>
        <Footer2 />
    </>
  )
}

export default Success