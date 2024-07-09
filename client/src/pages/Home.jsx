import React, { useState, useEffect } from 'react'
import HashLoader from "react-spinners/HashLoader"
import Navbar from '../components/Navbar'
import Main from './Main'
import Footer from './Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  const [loading, isLoading] = useState(false)

  useEffect(() => {
    isLoading(true)
    setTimeout(() => {
      isLoading(false)
    }, 2000)
  }, [])
  
  return (
    <>
    {loading ? (
      <>
      {/* For desktop */}
        <div className='lg:w-full lg:h-screen lg:bg-slate-50 lg:flex lg:flex-col lg:items-center lg:font-poppins hidden'>
        <div className='flex items-center justify-center gap-x-2 m-auto text-center'>
        <HashLoader
            color={'black'}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className='text-7xl text-black/80 font-extrabold uppercase animate-pulse'>Hass.</div>
        </div>
        <div className='text-xl pb-14'>Made by <span className='font-semibold'>Hassaan</span></div>
      </div>

      {/* For mobile */}
      <div className='w-full h-svh bg-slate-50 flex flex-col items-center font-poppins lg:hidden'>
        <div className='flex items-center justify-center gap-x-3 m-auto text-center'>
        <HashLoader
            color={'black'}
            loading={loading}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className='text-6xl text-black/80 font-extrabold uppercase animate-pulse'>Hass.</div>
        </div>
        <div className='text-xl pb-10'>Made by <span className='font-semibold'>Hassaan</span></div>
      </div>
      </>
    ) : (
<div>
  <div className='lg:bg-fixed bg-scroll bg-cover bg-center h-[70vh] w-full lg:h-[95vh] lg:w-auto' style={{ backgroundImage: 'url("/wepik.png")'}}>
    <div className='h-full bg-black/20 flex flex-col justify-center'>
      <Navbar />
      <div data-aos-duration="1000" data-aos="fade-up" className='text-center my-auto'>
        <p className='text-3xl sm:text-4xl lg:text-6xl text-white font-extrabold font-poppins leading-snug'>
          Raining Offers For Summer!
        </p>
        <p className='text-xl lg:text-4xl mt-10 text-white font-poppins font-semibold'>
          15% Off On All Products!
        </p>
        <div className='flex items-center justify-center gap-4 lg:gap-6 mt-8 lg:mt-16'>
          <Link 
            to={`/products`} 
            className='px-4 py-3 lg:px-6 lg:text-lg lg:py-4 text-black bg-white font-poppins font-medium hover:bg-black hover:text-white transition-all duration-500 rounded-sm'
          >
            Shop Now
          </Link>
          <Link 
            to={`about`} 
            className='px-4 py-[11px] lg:px-6 lg:py-4 lg:text-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-500 font-poppins font-medium rounded-sm'
          >
            Find More
          </Link>
        </div>
      </div>
    </div>
  </div>
  <Main />
  <Footer />
</div>
    )}
    </>

  )
}

export default Home