import React, { useState, useEffect } from 'react'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AccVerify = () => {
  const [validURL, setValidURL] = useState(null)
  const navigate = useNavigate()
  const params = useParams()

  const apiURL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const verifyEmailURL = async () => {
      try {
        const res = await fetch(`${apiURL}/api/auth/${params.id}/verify/${params.token}`, {
          method: 'GET',
          credentials: 'include',
        })

        if (res.ok) {
          setValidURL(true)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        } else {
          setValidURL(false)
        }
      } catch (err) {
        console.error('Error verifying email:', err)
        setValidURL(false)
      }
    }

    verifyEmailURL()
  }, [apiURL, navigate, params.id, params.token])

  return (
    <>
      <NavBar1 />
      {validURL === null ? (
        // Show a loading state or spinner while verifying
        <div className="flex items-center justify-center lg:h-[70vh] h-[30vh] lg:text-4xl text-lg font-semibold font-poppins">
          <>
            <svg aria-hidden="true" className="inline lg:w-10 lg:h-10 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="lg:ml-6 ml-2">Verifying your email, please wait....</span> 
          </> 
        </div>
      ) : validURL ? (
        <section className="bg-slate-50 py-20">
          <div className="bg-white w-[90%] lg:w-[50%] sm:w-[60%] mx-auto py-14 shadow-md">
            <div className="text-center">
              <i className="bx bxs-check-circle text-[50px] sm:text-[80px] lg:text-[100px] text-green-600"></i>
            </div>
            <div className="lg:text-3xl text-[22px] pt-6 text-center font-bold uppercase">
              Email Verified Successfully!
            </div>
            <div className="text-center py-6">
              <p className="lg:text-2xl sm:text-xl text-base font-semibold">
                Your Email Has Been Successfully Verified!
              </p>
            </div>
            <div className="text-center mt-8">
              <button className="px-10 py-3 border-2 border-black/80 font-bold lg:text-xl rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins">
                <Link to={'/login'}>Login To Your Account</Link>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-slate-50 py-20">
          <div className="bg-white w-[85%] lg:w-[50%] mx-auto py-14 shadow-md">
            <div className="text-center">
              <i className="bx bxs-x-circle text-[50px] lg:text-[100px] text-red-600"></i>
            </div>
            <div className="lg:text-3xl text-[22px] pt-6 text-center font-bold uppercase">
              Email Verification Failed!
            </div>
            <div className="text-center py-6 mt-2">
              <p className="lg:text-2xl text-lg font-semibold">Failed To Verify Your Email!</p>
            </div>
          </div>
        </section>
      )}
      <Footer2 />
    </>
  )
}

export default AccVerify