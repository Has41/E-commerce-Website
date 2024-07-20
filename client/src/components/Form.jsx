import React, { useState } from 'react'

const Form = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const apiURL = process.env.REACT_APP_API_URL

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            name: name,
            email: email,
            comment: comment
        }
    
        try {
          setLoading(true)
          const response = await fetch(`${apiURL}/api/mail/send-mail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            setLoading(false)
            setName('');
            setEmail('');
            setComment('');
          } else {
            setLoading(false)
            console.error('Failed to send email');
          }
        } catch (error) {
          setLoading(false)
          console.error('Error:', error);
        }
      }

  return (
        <>
        <section data-aos="fade-up" data-aos-duration="1000" className='bg-slate-50 pt-16 lg:py-16'>
        <div className='text-center'>
            <p className="font-mont text-sm tracking-wider mb-4 lg:text-lg">Any Queries?</p>
            <p className="font-poppins text-xl relative tracking-wider font-semibold lg:text-3xl after:h-[2px] lg:after:h-[4px] after:rounded-lg after:w-[100px] lg:after:w-[150px] after:bg-amber-500 after:absolute lg:after:left-[44%] lg:after:bottom-[-15px] after:bottom-[-9px] after:left-[37%] after:content-''">We're glad to help!</p>
        </div>
 
        <div className='max-w-full lg:max-w-[95%] lg:mx-auto flex flex-col items-center justify-center mt-16 lg:flex lg:flex-row lg:items-center lg:justify-center lg:space-x-7'>
            <div className='bg-white mb-4 w-[80%] text-center py-8 space-y-5 rounded-md shadow hover:shadow-xl transition-all duration-700 lg:w-[28%]'>
                <p className='font-poppins font-semibold text-lg lg:text-xl lg:tracking-wider'>Sales</p>
                <p className='font-mont font-medium whitespace-break-spaces text-sm text-slate-500 lg:px-4 lg:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, commodi.</p>
                <p className='font-mont font-semibold text-base text-amber-500 hover:text-amber-700 transition-all duration-500 lg:text-base'>+1200 6696 6889</p>
            </div>
            <div className='bg-white mb-4 w-[80%] text-center py-8 space-y-5 rounded-md shadow hover:shadow-xl transition-all duration-700 lg:w-[28%]'>
                <p className='font-poppins font-semibold text-lg lg:text-xl lg:tracking-wider'>Marketing</p>
                <p className='font-mont font-medium whitespace-break-spaces text-sm text-slate-500 lg:px-4 lg:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, commodi.</p>
                <p className='font-mont font-semibold text-base text-amber-500 hover:text-amber-700 transition-all duration-500 lg:text-base'>+1700 9933 7433</p>
            </div>
            <div className='bg-white mb-4 w-[80%] text-center py-8 space-y-5 rounded-md shadow hover:shadow-xl transition-all duration-700 lg:w-[28%]'>
                <p className='font-poppins font-semibold text-lg lg:text-xl lg:tracking-wider'>Complaints</p>
                <p className='font-mont font-medium whitespace-break-spaces text-sm text-slate-500 lg:px-4 lg:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, commodi.</p>
                <p className='font-mont font-semibold text-base text-amber-500 hover:text-amber-700 transition-all duration-500 lg:text-base'>+1237 9996 1234</p>
            </div>
            <div className='bg-white mb-4 w-[80%] text-center py-8 space-y-5 rounded-md shadow hover:shadow-xl transition-all duration-700 lg:w-[28%]'>
                <p className='font-poppins font-semibold text-lg lg:text-xl lg:tracking-wider'>Returns</p>
                <p className='font-mont font-medium whitespace-break-spaces text-sm text-slate-500 lg:px-4 lg:text-base'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, commodi.</p>
                <p className='font-mont font-semibold text-base text-amber-500 hover:text-amber-700 transition-all duration-500 lg:text-base'>mail@mail.com</p>
            </div>
        </div>
    </section>

    <section data-aos="fade-up" data-aos-duration="1000" className='mt-16 lg:mt-10 lg:ml-4 lg:flex lg:items-center lg:justify-center lg:max-w-[95%]'>
        <div className='border-b border-slate-200 lg:border-none pb-10 lg:pb-10 lg:w-[50%]'>
            <div className='text-center mb-14'>
                <p className='font-poppins font-semibold text-xl tracking-wide mb-1 lg:mb-4 lg:text-3xl'>Get In Touch</p>
                <p className='font-mont font-normal text-base px-4 lg:px-2 text-slate-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, a. Reprehenderit, error neque? Esse?</p>
            </div>

            <div className='text-center space-y-10'>
                <div className='space-y-2'>
                    <span>
                        <i className='bx bx-current-location text-amber-500 text-2xl lg:text-4xl'></i>
                    </span>
                    <p className='font-mont font-medium text-base tracking-wider text-amber-600 lg:text-lg lg:font-semibold'>Visit Us</p>
                    <p className='font-mont font-medium text-base text-slate-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>

                <div className='space-y-2'>
                    <span>
                        <i className='bx bxs-envelope text-amber-500 text-2xl lg:text-4xl'></i>
                    </span>
                    <p className='font-mont font-medium text-base tracking-wider text-amber-600 lg:text-lg lg:font-semibold'>Email Us</p>
                    <p className='font-mont font-medium text-base text-slate-600'>Company@gmail.com</p>
                </div>

                <div className='space-y-2'>
                    <span>
                        <i className='bx bxs-phone-call text-amber-500 text-2xl lg:text-4xl'></i>
                    </span>
                    <p className='font-mont font-medium text-base tracking-wider text-amber-600 lg:text-lg lg:font-semibold'>Call Us</p>
                    <p className='font-mont font-medium text-base text-slate-600'>+92 332 1234567</p>
                </div>
            </div>
        </div>

        <div className='text-center py-20 lg:w-[50%]'>
            <p className='font-poppins font-medium text-xl tracking-wide lg:text-3xl lg:font-semibold'>Don't Be A Stranger!</p>
            <p className='font-poppins font-normal text-sm tracking-wider mt-2 text-slate-500 lg:text-lg'>Drop In A Line Or Two!</p>

            <form onSubmit={handleSubmit} className='space-y-8 mt-8 max-w-[70%] mx-auto' action="#">
                <div className='relative'>
                    <i className='bx bxs-user-pin text-xl text-amber-500 lg:text-3xl absolute top-3 left-3 hidden lg:block'></i>
                    <input className='border focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none border-slate-400 rounded-sm py-4 lg:pl-12 sm:pl-6 w-full text-sm lg:text-base lg:py-4 lg:w-full' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Type Full Name Here!' />
                </div>

                <div className='relative'>
                    <i className='bx bxs-envelope text-xl text-amber-500 lg:text-3xl absolute top-3 left-3 hidden lg:block'></i>
                    <input className='border focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none border-slate-400 rounded-sm py-4 lg:pl-12 sm:pl-6 w-full text-sm lg:text-base lg:py-4 lg:w-full' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Type Your Email Here!' />
                </div>

                <div className='relative'>
                    <i className='bx bxs-comment-dots text-xl text-amber-500 lg:text-3xl absolute top-3 left-3 hidden lg:block'></i>
                    <input className='border focus:outline-none focus:ring-0 focus:border-black/80 focus:shadow-none border-slate-400 rounded-sm py-4 pb-24 lg:pl-12 sm:pl-6 w-full text-sm lg:text-base lg:pt-4 lg:pb-40 lg:w-full' value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder='Type Comment Here!' />
                </div>

                <button type='submit' className='w-full sm:w-full lg:w-full py-3 text-lg lg:text-xl lg:tracking-wider lg:font-medium font-medium bg-amber-500 hover:bg-amber-600 transition-all duration-500 text-white rounded-sm font-poppins'>
                {loading ? 
                <>
                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-white fill-amber-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="ml-2">Submitting...</span> 
                  </>  : 'Submit'}
                </button>
            </form>
        </div>
    </section>
    </>
  )
}

export default Form