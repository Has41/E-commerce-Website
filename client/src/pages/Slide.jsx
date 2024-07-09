import React from 'react'
import Slider from '../components/Slider'

const Slide = () => {
  // Our images and responsive width & height!
    const image = [
        { src: '/logo1.png', dimensions:{ desktop: { width: '200px', height: '200px' }, mobile: { width: '200px', height: '200px' } } },
        { src: '/logo2.jpg' , dimensions:{ desktop: { width: '200px', height: '200px' }, mobile: { width: '200px', height: '200px' } } },
        { src: '/logo3.png', dimensions:{ desktop: { width: '200px', height: '200px' }, mobile: { width: '200px', height: '200px' } } },
        { src: '/logo4.png', dimensions:{ desktop: { width: '200px', height: '200px' }, mobile: { width: '150px', height: '200px' } } },
        { src: '/logo5.jpeg', dimensions:{ desktop: { width: '100px', height: '200px' }, mobile: { width: '85px', height: '200px' } } },
        { src: '/logo6.png', dimensions:{ desktop: { width: '100px', height: '200px' }, mobile: { width: '100px', height: '200px' } } }
    ]
  return (
    <div className='md:mb-4'>
        <Slider images={image} />
    </div>
  )
}

export default Slide