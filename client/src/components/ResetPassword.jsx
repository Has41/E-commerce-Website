import React,{ useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'

const ResetPassword = () => {
    const { id, token } = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const resetPassword = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.")
            return
        }

        try {
            setLoading(true)
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/auth/${id}/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: password }),
            })

            if (res.ok) {
                setMessage('Password reset successful!')
                navigate('/')
            } else {
                setErrorMessage('Password reset failed. Please try again.')
            }
        } catch (error) {
            console.error('Reset Password Error:', error.message)
            setErrorMessage('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }


  return (
    <>
    <NavBar1 />
    <section className='bg-slate-50 py-8 lg:py-28 max-w-full'>
        <div className='text-center bg-white py-8 lg:py-24 w-[90%] ml-4 sm:ml-8 sm:space-y-8 lg:ml-[360px] rounded-sm shadow-sm lg:w-[45%]'>
            <p className='uppercase font-mont lg:font-poppins lg:tracking-wider font-semibold text-black/80 text-xl lg:text-3xl lg:mb-8 lg:-mt-4'>Reset Password</p>
            {errorMessage && <div className='lg:text-red-800 lg:font-medium lg:bg-red-100 lg:text-xl lg:py-3 lg:mt-[-20px] lg:max-w-full lg:w-[75%] rounded-sm lg:mx-auto'>{errorMessage}</div>}
            {message && <div className='lg:text-green-700 lg:font-medium lg:bg-green-200 lg:text-xl lg:py-3 lg:mt-[-20px] lg:max-w-full lg:w-[75%] rounded-sm lg:mx-auto'>{message}</div>}
            <form onSubmit={resetPassword}>
                <div className='space-y-5 mt-4 lg:ml-0 sm:ml-32 sm:flex sm:flex-col lg:flex lg:flex-col lg:items-center lg:justify-center'>
                  <input className='py-2 lg:py-3 rounded-sm border border-slate-300 w-[250px] lg:w-[450px] sm:w-[350px]' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter New Password' />
                  <input className='py-2 lg:py-3 rounded-sm border border-slate-300 w-[250px] lg:w-[450px] sm:w-[350px]' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm New Password' />
                </div>
                <button type='submit' className='border-2 border-black/80 text-black/80 w-[250px] lg:w-[450px] sm:w-[350px] h-[40px]sm:h-[50px] sm:font-semibold sm:text-lg font-mont mt-5 px-[93px] lg:h-[50px] hover:bg-black/80 hover:border hover:border-black/80 hover:text-white transition-all duration-500 py-1 lg:py-2 lg:text-xl lg:font-semibold rounded-sm uppercase'>
                {loading ? 
                <>
                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="ml-2">Saving...</span> 
                  </>  : 'Save'}
                </button>
            </form>
        </div>
    </section>
    <Footer2 />
    </>
  )
}

export default ResetPassword