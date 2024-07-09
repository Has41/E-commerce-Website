import React from 'react'

const Limited = () => {

  return (
    <section>
        <div className='w-full h-[50vh] lg:w-[99%] lg:ml-2 lg:rounded-sm lg:bg-fixed bg-scroll bg-cover bg-center lg:h-[65vh]' style={{ backgroundImage: 'url("/dress-min1.jpg")'}}>
            <div className='bg-black/30 w-full h-full flex items-center'>
                <div data-aos="fade-up" data-aos-duration="1000" className='text-center mx-auto my-auto sm:space-y-5'>
                  <p className='text-white font-poppins tracking-wide text-2xl font-bold sm:text-4xl lg:text-6xl'>Limited Time Offer!</p>
                  <p className='text-white font-mont font-semibold text-base sm:text-2xl mt-2 lg:text-4xl lg:mt-4'>Special Edition</p>
                  <p className='text-white text-sm px-[2px] mt-4 sm:px-8 sm:text-base lg:text-lg font-mont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero consequatur facilis unde illum.</p>
                  <button className='px-4 py-2 rounded-sm bg-white mt-4 font-poppins font-semibold hover:bg-black hover:text-white transition-all duration-500 lg:px-5 lg:py-4 lg:mt-8'>Shop Now</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Limited