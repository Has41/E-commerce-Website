import React,{ useEffect, useState } from 'react'
import NavBar1 from './NavBar1'
import { Link } from 'react-router-dom'
import Footer2 from './Footer2'

const Register = () => {
  const [name, setName] = useState(``)
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)
  const [address, setAddress] = useState(``)
  const [phone, setPhone] = useState(``)
  const [bio, setBio] = useState(``)
  const [profilePic, setProfilePic] = useState(``)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const apiURL = process.env.REACT_APP_API_URL

  const register = async (e) => {
    e.preventDefault()

    if (!name || !password ||!email || !address || !phone || !bio) {
      setErrorMessage('Please Fill All Required Fields!')
    }

    const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('address', address)
      formData.append('bio', bio)
      formData.append('phone', phone)
      formData.append('profilePic', profilePic)

    try{
      setLoading(true)
        const res = await fetch(`${apiURL}/api/auth/register`, {
            method: `POST`,
            body: formData
            })

            if(res.ok) {
              setLoading(false)
              setMessage("An Email has been sent to your account!")

              setTimeout(() => {
                window.close()
              }, 60000)

            } else {
              setLoading(false)
              const errData = await res.json()
              setErrorMessage(errData.message)
            }
        } catch(err) {
          setLoading(false)
        }
    }

    const handlePhoneChange = (e) => {
      let formattedNumber = e.target.value.replace(/\D/g, '')
      formattedNumber = formattedNumber.slice(0, 10)
      formattedNumber = formattedNumber.replace(/^(\d{3})(\d{0,7})/, '$1-$2')
      setPhone(formattedNumber)
    }
    

  return (
    <>
    <NavBar1 />
    <section className='bg-slate-50 py-8 lg:py-20 max-w-[400px] sm:max-w-[700px] lg:max-w-full'>
        <div className='text-center bg-white py-8 lg:py-16 mx-auto sm:mx-auto lg:mx-auto lg:w-[40%] sm:space-y-8 rounded-sm shadow-sm lg:shadow-md'>
            <p className='uppercase font-mont lg:font-poppins lg:tracking-wider font-semibold text-black/80 text-xl lg:text-3xl lg:mb-8 lg:-mt-4'>Register</p>
            {errorMessage && <div className='text-red-800 font-medium bg-red-100 py-3 lg:mt-[-20px] mt-2 lg:text-base text-sm lg:max-w-full max-w-[80%] lg:w-[75%] rounded-sm mx-auto'>{errorMessage}</div>}
            {message && <div className='text-green-700 font-medium bg-green-200 lg:w-[85%] py-3 mt-2 lg:mt-[-20px] lg:text-base text-sm lg:max-w-full max-w-[80%] rounded-sm mx-auto'>{message}</div>}
            <form method='post' onSubmit={register}>
              <div className='sm:w-[400px] w-[310px] lg:w-[85%] mx-auto sm:mx-auto lg:mx-auto'>
              <div className='space-y-5 mt-4 lg:ml-0 sm:flex sm:flex-col sm:items-center sm:w-full lg:flex lg:flex-col lg:items-center lg:justify-center sm:overflow-hidden'>
                  <input value={name} onChange={(e) => setName(e.target.value)} className='py-2 focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none" lg:py-3 lg:text-base text-sm rounded-sm border border-slate-300 w-full h-[40px] lg:w-full sm:w-full' type="text" placeholder='Enter your name' />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className='py-2 focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none" lg:py-3 lg:text-base text-sm rounded-sm border border-slate-300 lg:w-full w-full h-[40px] sm:w-full' type="email" placeholder='Enter your email' />
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className='py-2 focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none" lg:py-3 lg:text-base text-sm rounded-sm border border-slate-300 w-full h-[40px] lg:w-full sm:w-full sm:h-[50px]' type="password" placeholder='Enter your password' />
                  <input value={address} onChange={(e) => setAddress(e.target.value)} className='py-2 focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none" lg:py-3 lg:text-base text-sm rounded-sm border border-slate-300 w-full h-[40px] lg:w-full sm:w-full' type="text" placeholder='Enter your address' />
                  <input value={bio} onChange={(e) => setBio(e.target.value)} className='py-2 focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none" lg:py-3 rounded-sm lg:text-base text-sm border border-slate-300 w-full h-[40px] lg:w-full sm:w-full' type="text" placeholder='Enter short bio (Optional)' />
                  <form className="w-full mx-auto">
                    <div className="flex items-center">
                      <div className="z-10 h-[39px] w-[60px] lg:text-base text-sm flex items-center justify-center py-2.5 px-4 font-medium text-center text-white bg-black/85">
                          +92
                      </div>
                      <div className="relative w-full">
                          <input type="phone" value={phone} onChange={handlePhoneChange} className="p-2.5 focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none w-full h-[40px] lg:text-base text-sm z-20 text-gray-900 rounded-sm border-s-0 border border-gray-300" pattern="[0-9]{3}-[0-9]{7}" placeholder="Enter phone number"/>
                      </div>
                  </div>
                </form>
                  <input className="block w-full h-[40px] text-sm border cursor-pointer bg-gray-50 focus:outline-none rounded-sm border-slate-300" onChange={(e) => setProfilePic(e.target.files[0])} type="file" />
                </div>
                <div className='flex items-center justify-center space-x-1 mt-4 lg:gap-1 lg:mt-8'>
                  <input className='rounded-sm lg:text-lg border border-slate-300 active:border active:border-amber-500 checked:bg-amber-500 focus:border-transparent focus:ring-0' type="checkbox" />
                  <p className='font-poppins text-sm text-slate-500'>Remember me</p>
                </div>
                <button type='submit' className='border-2 border-black/80 text-black/80 font-mont mt-5 w-full h-[40px] sm:w-full sm:h-[50px] sm:font-semibold sm:text-lg lg:w-full hover:bg-black/80 hover:border hover:border-black/80 hover:text-white transition-all duration-500 lg:text-lg lg:font-semibold rounded-sm uppercase'>
                {loading ? 
                <>
                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="ml-2">Registering...</span> 
                  </>  : 'Register'}
                </button>
              </div>
                <div className='mt-4 lg:mt-8'>
                <pre className='font-mont font-medium text-sm text-slate-500 lg:text-base'>Already have an account? <Link className='text-amber-500 hover:text-amber-700 font-semibold transition-all duration-500' to={`/login`}>Login Now!</Link></pre>
                </div> 
            </form>
        </div>
    </section>
    <Footer2 />
    </>
  )
}

export default Register