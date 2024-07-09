import React from 'react'
import { Link } from 'react-router-dom'

const Footer2 = () => {
  return (
    <footer className='text-center font-poppins lg:mb-8 md:text-left border-t border-slate-200 pt-8 md:pt-12'>
    <div className='md:grid md:grid-cols-4 md:place-items-center md:justify-center md:gap-4 max-w-full'>
       <div className='md:mr-8 md:mb-16'>
           <p className='uppercase text-2xl font-bold'>Logo.</p>
           <p className='text-slate-500 mt-2'>Lorem ipsum dolor sit amet.</p>
       </div>
       <div className='md:mr-32 md:mb-5'>
           <p className='text-lg font-semibold mt-4 md:mt-0'>About Us</p>
           <ul className='mt-2 text-slate-500 justify-start'>
               <li className='mb-1 md:mb-2'><Link to={`/about`}>About Us</Link></li>
               <li className='mb-1 md:mb-2'><Link to={`/contacts`}>Contact Us</Link></li>
               <li className='mb-1 md:mb-2'>Customer Support</li>
           </ul>
       </div>
       <div className='md:mr-64'>
           <p className='text-lg font-semibold mt-4 md:mt-0'>Information</p>
           <ul className='mt-2 text-slate-500 md:whitespace-nowrap'>
               <li className='mb-1 md:mb-2'>FAQs</li>
               <li className='mb-1 md:mb-2'>Refund Policy</li>
               <li className='mb-1 md:mb-2'>Privacy Policy</li>
               <li className='mb-1 md:mb-2'>Terms & Conditions</li>
           </ul>
       </div>
       <div className='md:mr-40 md:mb-3'>
           <p className='text-lg font-semibold mt-4 md:mt-0'>Latest Updates</p>
           <p className='text-slate-500 mt-2'>Be the first to know!</p>
           <div className='flex flex-col items-center justify-center mt-3 md:flex-row'>
             <input className='bg-slate-50 md:bg-slate-50 border border-slate-200 px-4 py-2 md:py-3 rounded-sm w-[271px] md:w-[250px] focus:border-black transition-all duration-500 md:mr-4' type="text" placeholder='Your email here!' />
             <button className='px-24 md:px-4 py-2 border-2 border-black rounded-sm mt-4 hover:bg-black hover:text-white transition-all duration-700 md:mb-4'>Subscribe</button>
           </div>
       </div>
   </div>
   <div className='border-t border-slate-200 mt-4 pt-3 -mb-5 md:text-center md:flex items-center justify-between md:-mb-8 text-slate-500'>
      <div className='md:ml-4'>
       <p className='md:text-normal'>Copyright <span>&copy;</span> 2023. Powered by <span className='uppercase text-base font-bold'>Logo.</span></p>
       </div>
       <div className='md:mb-6'>
       <p className='mt-5 md:text-xl'>
         <i className='bx bxl-facebook mr-6'></i>
         <i className='bx bxl-instagram mr-6' ></i>
         <i className='bx bxl-twitter mr-6'></i>
         <i className='bx bxl-google mr-6'></i>
       </p>
       </div>
   </div>
   </footer>
  )
}

export default Footer2