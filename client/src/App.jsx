import React, { useEffect } from 'react'
import HashLoader from "react-spinners/HashLoader"
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import { Route, Routes } from "react-router-dom"
import AllProducts from "./pages/AllProducts"
import CartPage from './components/CartPage'
import MyCart from './components/MyCart'
import Login from './components/Login'
import Register from './components/Register'
import EditProfile from './components/EditProfile'
import AdminPanel from './pages/AdminPanel'
import Dashboard from './components/Dashboard'
import AddProduct from './components/AddProduct'
import Success from './components/Success'
import Cancel from './components/Cancel'
import Order from './pages/Order'
import OrderPlace from './components/OrderPlace'
import AccVerify from './components/AccVerify'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import useAuth from './hooks/useAuth'
import NotFound from './pages/NotFound'

const App = () => {
  const { isLoggedIn, role, loading } = useAuth()

  useEffect(() => {
    AOS.init()

    return () => {
      // Cleanup to avoid memory leaks
      AOS.refresh()
    }
  }, [])

  if (loading) {
    return (
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
    )
  }

  const adminRoutes = (
    <>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/adminPanel' element={<AdminPanel />} />
      <Route path='/orders' element={<Order />} />
    </>
  )

  const userRoutes = (
    <>
      <Route path='/edit' element={<EditProfile />} />
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel />} />
      <Route path='/users/:id/reset-password/:token' element={<ResetPassword />} />
    </>
  )

  const publicRoutes = (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </>
  )

  return (
    <>
      <div className='overflow-hidden'>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contact />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/cartPage/:productId' element={<CartPage />} />
          <Route path='/myCart' element={<MyCart />} />
          {isLoggedIn && role === 'admin' && adminRoutes}
          {isLoggedIn && role === 'user' && userRoutes}
          {!isLoggedIn && publicRoutes}
          <Route path='/place-order' element={<OrderPlace />} />
          <Route path='/users/:id/verify/:token' element={<AccVerify />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App