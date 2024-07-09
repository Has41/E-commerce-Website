import React from 'react'
// import AboutHero from '../components/AboutHero'
import Navbar from '../components/Navbar'
import Other from '../components/Other'
import Footer from '../pages/Footer'

const About = () => {
  return (
    <>
    <div className='md:bg-fixed bg-scroll bg-cover bg-center h-[40vh] w-full lg:h-[60vh] lg:w-auto' style={{ backgroundImage: 'url("/wepik.png")'}}>
      <div className='h-[40vh] lg:h-full bg-black/10 flex flex-col justify-center'>
        <Navbar />
        {/* <AboutHero /> */}
        <div data-aos="fade-up" data-aos-duration="1000" className='text-center my-auto mx-auto'>
          <p className='text-4xl tracking-wider md:text-6xl text-white font-extrabold font-poppins leading-snug'>About Us</p>
        </div>
      </div>
    </div>
    <Other />
    <Footer />
  </>
  )
}

export default About