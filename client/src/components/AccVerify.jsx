import React, { useState, useEffect } from 'react'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AccVerify = () => {
    const [validURL, setValidURL] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
      const verifyEmailURL = async () => {
          try {
              const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/auth/${params.id}/verify/${params.token}`)

              if (res.ok) {
                  setValidURL(true)

                  // Wait for 2 seconds before closing window
                  setTimeout(() => {
                    navigate('/login')
                      // window.close()
                  }, 2000)
              } else {
                  const data = await res.json()
                  console.error('Failed To Verify Email:', data.message)
                  setValidURL(false)
              }
          } catch (err) {
              console.error(err)
              setValidURL(false)
          }
      }

      // Only run the effect once when component mounts
      if (!validURL) {
          verifyEmailURL()
      }
  }, [validURL, params.id, params.token])

  return (
    <>
        <NavBar1 />
            {validURL ? (
              <section className='bg-slate-50 py-20'>
              <div className='bg-white w-[90%] lg:w-[50%] sm:w-[60%] mx-auto py-14 shadow-md'>
                <div className='text-center'>
                  <i className='bx bxs-check-circle text-[50px] sm:text-[80px] lg:text-[100px] text-green-600'></i>
                </div>
                <div className='lg:text-3xl text-[22px] pt-6 text-center font-bold uppercase'>Email Verified Successfully!</div>
                <div className='text-center py-6'>
                  <p className='lg:text-2xl sm:text-xl text-base font-semibold'>Your Email Has Been Successfully Verified!</p>
                </div>
                <div className='text-center mt-8'>
                    <button className='px-10 py-3 border-2 border-black/80 font-bold lg:text-xl rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins'><Link to={'/login'}>Login To Your Account</Link></button>
                </div>
              </div>
              </section>
            ) : (
                <section className='bg-slate-50 py-20'>
                <div className='bg-white w-[85%] lg:w-[50%] mx-auto py-14 shadow-md'>
                  <div className='text-center'>
                    <i className='bx bxs-x-circle text-[50px] lg:text-[100px] text-red-600'></i>
                </div>
                <div className='lg:text-3xl text-[22px] pt-6 text-center font-bold uppercase'>Email Verification Failed!</div>
                <div className='text-center py-6 mt-2'>
                  <p className='lg:text-2xl text-lg font-semibold'>Failed To Verify Your Email!</p>
                </div>
              </div>
              </section>
            )}
        <Footer2 />
    </>
  )
}

export default AccVerify