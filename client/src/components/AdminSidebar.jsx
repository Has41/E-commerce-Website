/* eslint-disable */
import React, { useState } from 'react'

const AdminSidebar = ({ onOptionClick }) => {
  const [isEyeVisible, setIsEyeVisible] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [dropDown, setDropDown] = useState(false)

  const handleOptionClick = (option) => {
      console.log(`Clicked option: ${option}`)

      if (onOptionClick) {
        onOptionClick(option)
      }
  }

  const activateDropdown = (drop) => {
    setDropDown(drop === 'Products' ? !dropDown : false)
  }


  return (
    <div className=''>
      <nav className='w-1/5 h-full bg-black/85 font-poppins py-2 px-3 fixed shadow-sm'>
        <div>
          <h3 className='text-white text-2xl font-semibold text-center py-8'>LOGO.</h3>
        </div>

        {/* Nav-Options */}
        <div className='flex flex-col justify-between '>
          <ul className='text-white ml-4'>
            <li className='h-[50px] mt-3 flex items-center cursor-pointer hover:bg-white hover:text-black hover:transition-all hover:duration-500 rounded-sm w-full' onClick={() => handleOptionClick('Dashboard')}>
              <i className='bx bxs-bar-chart-square text-xl min-w-[40px] flex items-center justify-center'></i>
              <p>Dashboard</p>
            </li>
            <li className={`h-[50px] mt-3 ${dropDown ? 'mb-24' : 'mb-0'}`} onClick={() => activateDropdown('Products')}>
              <div className='flex items-center cursor-pointer hover:bg-white hover:text-black hover:transition-all hover:duration-300 py-2'>
                <i className='bx bxs-bar-chart-square text-xl min-w-[40px] flex items-center justify-center'></i>
                <p>Products</p>
              {dropDown ? (
                <i className='bx bx-chevron-down ml-8 text-xl text-white hover:text-black'></i>
              ) : (
                <i className='bx bx-chevron-right ml-8 text-xl text-white hover:text-black'></i>
              )}
            </div>
              {dropDown && (
              <ul className='ml-8 mt-2'>
                <li className='hover:bg-white hover:text-black hover:transition-all hover:duration-300 cursor-pointer py-2 px-3 rounded-sm'>
                  <div onClick={() => handleOptionClick('Add-Products')} className='flex items-center gap-x-2'>
                    <i className='bx bx-cart-add text-xl'></i>
                    <p>Add Product</p>
                  </div>
                  </li>
                <li onClick={() => handleOptionClick('Show-Products')} className='hover:bg-white hover:text-black hover:transition-all hover:duration-300 cursor-pointer py-2 px-3 rounded-sm'>
                  <a className='flex items-center gap-x-2' href='#'>
                    <i className={`bx bxs-${isEyeVisible ? 'show' : 'low-vision'} text-xl`}></i>
                    <p>Show Product</p>
                  </a>
                </li>
              </ul>
              )}
            </li>
            <li className='h-[50px] mt-3 flex items-center cursor-pointer hover:bg-white hover:text-black hover:transition-all hover:duration-500 rounded-sm w-full' onClick={() => handleOptionClick('Category')}>
              <i className='bx bxs-bar-chart-square text-xl min-w-[40px] flex items-center justify-center'></i>
              <p>Categories</p>
            </li>
            <li className='h-[50px] mt-3 flex items-center cursor-pointer hover:bg-white hover:text-black hover:transition-all hover:duration-500 rounded-sm w-full' onClick={() => handleOptionClick('Orders')}>
              <i className='bx bxs-bar-chart-square text-xl min-w-[40px] flex items-center justify-center'></i> 
              <p>Orders</p>
            </li>
          </ul>
        </div>
      </nav>

    </div>
  )
}

export default AdminSidebar