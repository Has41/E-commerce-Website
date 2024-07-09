import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Slider = ({ images }) => {
  //Responsive breakpoints for different screen sizes!
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <Carousel responsive={responsive} swipeable={true} draggable={true} showDots={true} keyBoardControl={true} customTransition='transform 700ms ease-in-out' transitionDuration={300} removeArrowOnDeviceType={['tablet', 'mobile']} arrows={false} autoPlay={true} autoPlaySpeed={4000} infinite={true} showThumbs={false} slidesToShow={4}>
      {images.map((img,idx) => { 
        return  (<div key={idx} data-aos="fade-up" data-aos-duration="1000" style={{ width: window.innerWidth <= 768 ? img.dimensions.mobile.width : img.dimensions.desktop.width , height: window.innerHeight <= 768 ? img.dimensions.mobile.height : img.dimensions.desktop.height }} className='flex items-center justify-center mx-auto'>
          <img className='h-full w-full object-contain' src={img.src} alt={`Slide ${idx}`} />
        </div>)
      })}
    </Carousel>
  )
}

export default Slider