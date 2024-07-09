import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const AdminSearch = () => {
  const [adminData, setAdminData] = useState(null)
  const [userDropdown, setUserDropdown] = useState(false)
  const navigate = useNavigate()

  const getAdminInfo = async () => {
    try {
      const res = await fetch('/api/users/me')

      if (res.ok) {
        const data = await res.json()
        setAdminData(data)
      } else {
        console.error('Error getting user info')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    try {
        const res = await fetch(`/api/auth/logout`, {
            method: 'POST',
            credentials: 'same-origin'
        })
        if(res.ok) {
          setAdminData(null)
          navigate(`/login`)
        } else {
            console.error(`Error!`)
            navigate('/login')
        }
    } catch (err) {
        console.error(err.message)
        navigate('/login')
    }
  }

  useEffect(() => {
    getAdminInfo()
  }, [])
  

  return (
    <nav className='w-[80%] flex items-center justify-around mb-24 bg-white h-[70px] px-4 gap-x-10 fixed right-0 shadow-sm'>
      <div className='flex items-center relative ml-8'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='absolute left-3 top-1/2 transform -translate-y-1/2' width="24" height="18" fill="none" stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          className='outline-none active:border-none active:outline-none border-none focus:outline-none appearance-none bg-slate-50 rounded-md pl-10 flex-1 w-[400px]'
          placeholder='Search'
          type="text"
          disabled
        />
      </div>
      <div className='flex items-center ml-48 gap-4'>
        <i className='bx bx-bell text-[22px] cursor-pointer'></i>
        <i className='bx bx-message-rounded-detail text-[22px] cursor-pointer'></i>
        <i className='bx bx-moon text-[22px]'></i>
      </div>
      <div onClick={() => setUserDropdown(!userDropdown)} className='cursor-pointer'>
        {/* <img className='rounded-full w-[50px] h-[50px]' src="no-pfp.jpg" alt="" /> */}
        {adminData && (
              <div className='flex justify-center gap-x-2 mr-4'>
                  <div>
                      <img className='rounded-full w-[35px] h-[35px] border-2 border-white' src={`/api/users/me/photo/${adminData._id}`} alt="" />
                  </div>
                  <div>
                    <h2 className='text-[14px] font-semibold'>{adminData.name}</h2>
                    <p className='text-[10px] font-medium'>{adminData.bio}</p>
                  </div>
              </div>
        )}
          {userDropdown && (
                <div className='lg:relative'>
                    <div className='hidden lg:block lg:absolute lg:-right-0 lg:mt-3 lg:py-2 lg:w-32 lg:bg-white lg:border lg:border-gray-slate-300 lg:rounded lg:shadow-lg'>
                                <div onClick={handleLogout} className='block px-4 py-2 font-poppins text-slate-600 text-base hover:text-black transition-all duration-300'>Logout</div> 
                    </div>
                </div>
                )}
      </div>
    </nav>
  )
}

export default AdminSearch