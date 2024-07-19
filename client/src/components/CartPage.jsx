/* eslint-disable */
import React, { useEffect, useState } from 'react'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(null)
    const [photo, setPhoto] = useState('')
    const [relatedProducts, setRelatedProducts] = useState([])
    const [userData, setUserData] = useState(null)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const { productId } = useParams()
    const navigate = useNavigate()

    const apiURL = process.env.REACT_APP_API_URL

    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`${apiURL}/api/products/get-single-product/${productId}`, {
          method: 'GET',
          credentials: 'same-origin'
        })

        if (res.ok) {
          const data = await res.json()
          setProduct(data)
          setPhoto(`${apiURL}/api/products/get-product-photo/${productId}`)
          getRelatedProducts(data._id, data.category)
        } else {
          console.error('Error getting product!')
        }
      } catch (err) {
        console.error(err)
      }
    }

    const addToCart = async () => {
      if (!isLoggedIn) {
        setShowPopup(true)
        return
      }

      try {
        if (product) {

          const data = {
            title: product.name,
            price: product.price,
            image: photo,
            quantity: quantity
          }

        setLoading(true)
        const res = await fetch(`${apiURL}/api/cart/add`, {
          method: 'POST',
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })

        if (res.ok) {
          navigate('/products')
          setQuantity(1)
          setLoading(false)
        } else {
          setLoading(false)
          console.error('Error adding data')
        }
      } else {
        setLoading(false)
        console.error('No product selected')
      }
      } catch (err) {
        console.error(err)
      }
    }

    const getRelatedProducts = async (pid, cid) => {
      try {
        const res = await fetch(`${apiURL}/api/products/get-related-product/${pid}/${cid}`)

        if (res.ok) {
          const data = await res.json()
          setRelatedProducts(data)
        }
      } catch (err) {
        console.error(err);
      }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const starRating = () => {
        const starIcons = []
    
        for (let i = 0; i <= 5; i++) {
          starIcons.push(
            <i key={i} className="bx bx-star text-gray-300 text-base lg:text-xl"></i>
          )
        }
        return (
          <span className="flex items-center justify-center">{starIcons}</span>
        )
      }

      const checkLogin = async () => {
        try {
            const res = await fetch(`${apiURL}/api/users/me`, {
              method: "GET",
              credentials: "include"
            })
            if(res.ok) {
                const data = await res.json()
                setLoggedIn(data)
                setUserData(data)
            } else {
                setLoggedIn(false)
            }
        } catch (err) {
            console.error('Error fetching user info: ', err.message)
        }
    }

    const handlePopupClose = () => {
      setShowPopup(false)
  }

      useEffect(() => {
        fetchSingleProduct()
      }, [productId])

      useEffect(() => {
        checkLogin()
      },[])

  return (
    <>
        <NavBar1 />
        <section className='bg-slate-50/40 pt-8 pb-12'>
            <section className='lg:flex lg:max-w-full lg:w-full lg:gap-x-8'>
            <div className='flex items-center justify-center w-[82%] mx-auto lg:w-[500px] lg:ml-8'>
                <img className='h-[400px] sm:h-[550px] md:h-[780px] rounded-sm lg:h-[650px] lg:w-full w-full' src={product ? photo : ''} alt="" />
            </div>
            <div className='lg:w-[70%]'>
            <div className='text-center mt-4 lg:text-justify'>
               <p className='font-poppins font-semibold text-xl uppercase lg:text-3xl lg:font-bold'>{product ? product.name : 'Product Title'}</p>
               <p className='font-mont font-semibold text-slate-600 text-lg mt-2 lg:text-2xl lg:mt-5'>{product ? `$${product.price.toFixed(2)}` : '$0.00'}</p>
               <p className='font-mont font-normal sm:px-14 text-slate-500 text-sm px-8 mt-3 text-justify lg:text-base lg:font-semibold lg:text-slate-500 lg:-ml-4 lg:mt-6'>{product && product.description}</p>
            </div>
            <div className='lg:flex lg:items-center lg:justify-center mt-8 lg:mt-16 lg:space-x-64 lg:mr-5'>

            {/* Counter */}
            <div className='flex items-center justify-center'>
              <button onClick={increaseQuantity} className='border border-slate-400 px-4 py-2 lg:py-3 lg:px-5 rounded-l-sm lg:text-2xl transition-all duration-500 hover:bg-black/80 hover:text-white focus:outline-none'>+</button>
                <div className='border-y-[1px] border-slate-400 px-6 py-2 lg:py-[14px] lg:px-7 lg:text-lg'>{quantity}</div>
              <button onClick={decreaseQuantity} className='border border-slate-400 px-4 py-2 lg:py-3 lg:px-5 rounded-r-sm lg:text-2xl transition-all duration-500 hover:bg-black/80 hover:text-white focus:outline-none'>-</button>
            </div>

            <div className='text-center mt-6 mb-4 lg:mt-0 lg:mb-0'>
                <button onClick={addToCart} className='px-6 py-3 text-base uppercase lg:px-5 lg:py-4 lg:text-base lg:uppercase font-semibold border-2 border-black font-mont rounded-sm hover:bg-black hover:text-white transition-all duration-500'>
                {loading ? 
                <>
                    <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="ml-2">Adding...</span> 
                  </>  : 'Add To Cart'}
                </button>
            </div>
            </div>


            <div className='mt-8 ml-8 lg:ml-0 lg:mt-16'>
                <p className='font-mont font-semibold text-base sm:text-lg lg:text-xl'>Free shipping on orders over 50$!</p>
                <ul className='list-disc mt-2 ml-6 sm:ml-8 lg:ml-8'>
                    <li className='font-mont font-medium text-slate-600 text-sm text-justify sm:text-base lg:text-lg'>No-Risk Money Back Guarantee!</li>
                    <li className='font-mont font-medium text-slate-600 text-sm text-justify sm:text-base lg:text-lg'>Secure Payment!</li>
                    <li className='font-mont font-medium text-slate-600 text-sm text-justify sm:text-base lg:text-lg'>No Hassle Refunds!</li>
                </ul>
            </div>
            <div className='text-justify mt-4 ml-8 lg:hidden sm:mt-8'>
                <p className='font-mont font-semibold text-base sm:text-lg'>Reviews (0)</p>
                <p className='font-mont font-medium text-slate-500 text-sm sm:text-base mt-2'>No reviews yet</p>
            </div>
            </div>
            </section> 
          
           
            <div className='mt-8 ml-8 lg:mt-16 lg:ml-16'>
                <p className='font-poppins font-semibold uppercase text-lg sm:text-xl tracking-wide lg:text-2xl'>Related Products</p>
            </div>

            <div className='mt-8 sm:mt-16 lg:mt-24 grid items-center justify-center lg:grid-cols-3 gap-6 sm:gap-20 lg:gap-4 lg:ml-20 mb-4'>
                {relatedProducts.map((product) => (
                     <Link to={`/cartpage/${product._id}`} key={product._id} className='border border-slate-50 hover:shadow-2xl transition-all duration-1000 w-[300px] h-[520px] lg:h-[545px] rounded-sm sm:w-[350px] sm:h-[570px] lg:w-[300px]'>
                        <div className='text-center flex items-center justify-center sm:w-[350px]'>
                          <img className='h-[400px] sm:h-[400px] rounded-sm sm:w-full lg:h-[400px] lg:w-[400px] w-full' src={`/api/products/get-product-photo/${product._id}`} alt='' />
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
        <Footer2 />

        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
            <div className='bg-white p-6 lg:w-[30%] w-[80%] rounded-md text-center relative'>
                <div onClick={handlePopupClose} className='lg:absolute lg:top-4 lg:right-3 absolute top-4 right-5 cursor-pointer'>
                    <i className='bx bx-x text-3xl'></i>
                </div>
              <div className='text-center'>
                <i className='bx bxs-error-alt lg:text-[80px] text-[60px] text-amber-500'></i>
              </div>
              <div className='lg:text-2xl text-lg pt-6 text-center font-bold uppercase'>Please Log In First!</div>
              <div className='text-center mt-8'>
                <button className='px-5 py-2 border-2 uppercase border-black/80 font-bold lg:text-lg text-base rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins'>
                  <Link to={'/login'}>Login</Link>
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default CartPage