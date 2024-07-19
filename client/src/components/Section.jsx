import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Section = () => {
  const [products, setProducts] = useState([])

  const apiURL = process.env.REACT_APP_API_URL

  const productPic = `${apiURL}/api/products/get-product-photo`

    const starRating = () => {
        const starIcons = []

        for (let i = 0; i <= 5; i++) {
            starIcons.push(<i key={i} className='bx bx-star text-gray-300 text-xl sm:text-2xl'></i>)
        }
        return (
            <span className='flex items-center justify-center'>{starIcons}</span>
        )
    }

    const getProducts = async () => {
      try {
        const res = await fetch(`${apiURL}/api/products/get-product`)
    
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        } else {
          console.error('Error getting products')
        }
      } catch (err) {
        console.error(err)
      }
    }

    const getRandomProducts = (count) => {
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, count);
    };
  
    // Get 3 random products
    const randomProducts = getRandomProducts(3)

    useEffect(() => {
      getProducts()
    }, [])

  return (
    <section data-aos="fade-up" data-aos-duration="1000" className='bg-slate-50/50 pt-4 pb-8 sm:mt-8'>
    <div className='text-center mt-8'>
        <p className='text-sm font-mont sm:text-lg lg:text-xl text-slate-600'>New Arrivals</p>
        <p className='text-xl sm:text-2xl lg:text-3xl font-bold mt-4 font-poppins tracking-wider'>
            <span className='border-b-2 border-slate-500 pb-1 rounded-sm'>Featured Products</span>
        </p>
    </div>

    <div className='mt-8 sm:mt-16 lg:mt-24 grid items-center justify-center lg:grid-cols-3 gap-6 sm:gap-20 lg:gap-4 lg:ml-20 mb-4'>
    {randomProducts.map((product) => (
          <Link to={`/cartpage/${product._id}`} key={product._id} className='border border-slate-50 hover:shadow-2xl transition-all duration-1000 w-[300px] h-[520px] lg:h-[545px] rounded-sm sm:w-[350px] sm:h-[570px] lg:w-[300px]'>
            <div className='text-center flex items-center justify-center sm:w-[350px]'>
              <img className='h-[400px] sm:h-[400px] rounded-sm sm:w-full lg:h-[400px] lg:w-[400px] w-full' src={`${productPic}/${product._id}`} alt='Photo' />
            </div>
            <div className='sm:space-y-1'>
              <p className='text-center font-mont font-semibold mt-4 sm:text-lg'>{product.name}</p>
              <p className='text-center font-mont font-normal text-slate-500 sm:text-lg'>{product.category.name}</p>
              <p className='text-center font-mont font-medium sm:text-lg sm:font-semibold'>${product.price}</p>
              {starRating()}
            </div>
          </Link>
        ))}
    </div>
    </section>
  )
}

export default Section