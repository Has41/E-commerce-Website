import React,{ useState } from 'react'
import NavBar1 from './NavBar1'
import { Link } from 'react-router-dom'
import Footer2 from './Footer2'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState(``)
  const [password, setPassword] = useState(``)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault()

    if (!email || !password) {
        setErrorMessage('Email and password are required!')
        return
    }

    const loginData = {
        email: email,
        password: password
    };

    try {
        setLoading(true)
        const loginRes = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
            credentials: 'include'
        })

        if (loginRes.ok) {
            setErrorMessage(null); 
            const userRes = await fetch(`/api/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (userRes.ok) {
                setLoading(false)
                const userData = await userRes.json()
                const isAdmin = userData.role === 'admin'
                isAdmin ? navigate('/adminPanel') : navigate('/')
             } else {
                setLoading(false)
                const userErrorData = await userRes.json()
                console.error('Failed to fetch user data:', userRes.status, userErrorData.message)
            }
        } else if (loginRes.status === 401) {
            setLoading(false)
            setErrorMessage('Incorrect email or password.')
        } else {
            setLoading(false)
            const errorData = await loginRes.json()
            setErrorMessage(errorData.message)
        }
    } catch (err) {
        setLoading(true)
        setErrorMessage('An unexpected error occurred. Please try again.')
        console.error('Login Error:', err.message)
    }
}

  return (
    <>
    <NavBar1 />
    <section className='bg-slate-50 py-8 lg:py-20 max-w-[400px] sm:max-w-[700px] lg:max-w-full w-full'>
        <div className='text-center bg-white sm:space-y-8 mx-auto sm:mx-auto py-8 lg:py-16 lg:mx-auto rounded-sm shadow-sm lg:w-[40%] lg:shadow-md'>
            <p className='uppercase font-mont lg:font-poppins lg:tracking-wider font-semibold text-black/80 text-2xl lg:text-4xl lg:mb-8 lg:-mt-4'>Login</p>
            {errorMessage && <div className='lg:text-red-800 lg:font-medium lg:bg-red-100 lg:text-xl lg:py-3 lg:mt-[-20px] lg:max-w-full lg:w-[75%] rounded-sm lg:mx-auto'>{errorMessage}</div>}
            <form onSubmit={login} method="POST">
                <div className='sm:w-[400px] w-[310px] lg:w-[85%] lg:mx-auto mx-auto sm:mx-auto'>
                <div className='space-y-5 mt-4 sm:flex sm:flex-col lg:flex lg:flex-col lg:items-center lg:justify-center'>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className='py-2 lg:py-3 rounded-sm border border-slate-300 w-full h-[40px] lg:w-full sm:w-full sm:h-[50px]' type="email" placeholder='Enter your email' />
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className='py-2 lg:py-3 rounded-sm border border-slate-300 w-full h-[40px] lg:w-full sm:w-full sm:h-[50px]' type="password" placeholder='Enter your password' />
                </div>
                <div className='flex items-center justify-center gap-x-32 space-x-1 mt-4'>
                    <div className='flex items-center justify-center gap-x-1'>
                        <input className='rounded-sm lg:text-lg border border-slate-300 active:border active:border-amber-500 checked:bg-amber-500 focus:border-transparent focus:ring-0' type="checkbox" />
                        <p className='font-poppins text-sm text-slate-500'>Remember me</p>
                    </div>
                    <div>
                        <Link to={'/forgot-password'} className='text-amber-500 hover:text-amber-700 font-semibold transition-all duration-500 cursor-pointer text-sm'>Forgot Password</Link>
                    </div>
                </div>
                <button type='submit' className='border-2 border-black/80 text-black/80 w-full h-[40px] sm:w-full sm:h-[50px] sm:font-semibold sm:text-lg font-mont mt-5 lg:w-full hover:bg-black/80 hover:border hover:border-black/80 hover:text-white transition-all duration-500 lg:text-lg lg:font-semibold rounded-sm uppercase'>
                {loading ? 
                <>
                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="ml-2">Logging in...</span> 
                  </>  : 'Login'}
                </button>
                </div>
                <div className='mt-4 lg:mt-8'>
                <pre className='font-mont font-medium text-sm text-slate-500 lg:text-base'>Don't have an account yet? <Link className='text-amber-500 hover:text-amber-700 font-semibold transition-all duration-500' to={`/register`}>Register Now!</Link></pre>
                </div> 
            </form>
        </div>
    </section>
    <Footer2 />
    </>
  )
}

export default Login