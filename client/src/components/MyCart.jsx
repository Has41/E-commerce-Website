/* eslint-disable */
import React, { useState, useEffect } from 'react'
import NavBar1 from './NavBar1'
import Footer2 from './Footer2'
import { Link } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js"

const MyCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState(null)
  const [stripe, setStripe] = useState(null)
  const [loading, setLoading] = useState(false)

  const totalPrice = () => {
    try {
      let total = 0
      cartItems?.map(item => { total = total + item.price})
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    } catch (err) {
      console.error(err)
    }
  }

  const getCartItems = async () => {
    try {
        const res = await fetch(`/api/cart/current`)
        if (res.ok) {
            const data = await res.json()
            setCartItems(data)
        } else {
            console.error(`Error getting items`)
        }
    } catch(err) {
        console.error(err.message)
    }
}

const checkLogin = async () => {
  try {
      const res = await fetch(`/api/users/me`)
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

const removeCartItems = async (id) => {
  try {
      const res = await fetch(`/api/cart/${id}`, {
          method: 'DELETE'
      })
      if (res.ok) {
          setCartItems(cartItems.filter((item) => item._id !== id))
      } else {
          console.error(`Error removing items from the cart!`)
      }
  } catch (err) {
      console.error(err.message)
  }
}

const createPayment = async () => {
  if (!stripe) {
    console.error('Stripe is not loaded yet.')
    return
  }

  try {
    setLoading(true)
    const res = await fetch('/api/products/create-checkout/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if (res.ok) {
      const data = await res.json()
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      })

      if (result.error) {
        setLoading(false)
        console.error(result.error)
      } else {
        setLoading(false)
        console.error('Error Stripe')
      }
    } else {
      setLoading(false)
      console.error('Unable to create payment')
    }
  } catch (err) {
    setLoading(false)
    console.error(err)
  }
}

useEffect(() => {
  const fetchStripe = async () => {
    const stripeObj = await loadStripe('pk_test_51OhVpzF9GzcJmZ26D2GM7G2vCziktOzOVxWuoYiiebeYCUY2i17Ku4YhI6laSByzsFLrsQwJO0HPRwiGeuNRqgbH00IgizWlOC')
    setStripe(stripeObj)
  }

  fetchStripe()
}, [])



useEffect(() => {
  getCartItems()
},[])

useEffect(() => {
  checkLogin()
},[])

  return (
    <>
    <NavBar1 />
      <section className='bg-slate-50 py-20'>

        {/* Mobile Mode */}
        <div data-aos="fade-up" data-aos-duration="1000" className='lg:hidden bg-white w-[90%] mx-auto py-14 shadow-sm'>
            <p className="font-poppins font-semibold uppercase tracking-wide text-xl relative after:h-[3px] after:rounded-lg after:w-[85%] after:bg-black/80 after:absolute after:bottom-[-20px] after:left-[1%] after:content-'' ml-8">My Cart</p>
             {isLoggedIn ? ( 
              <div className='ml-8'>
                {cartItems.length === 0 ? (
                  <p className='mt-12 font-mont font-medium text-slate-500 ml-4'>Your Cart is empty!</p>
                ) : (
                  <ul>
                    {cartItems.map((elements)=> {
                      return <div key={elements._id} className='mt-12 cursor-pointer hover:bg-slate-50 transition-all duration-500 w-[95%] py-5 px-6'>
                      <li className='flex'>
                      <div className='mr-6'>
                          <img className='h-[90px] w-[75px]' src={elements.image} alt="" />
                      </div>
                      <div className='flex flex-col gap-1 pr-[65px] w-[170px]'>
                        <span className='font-mont font-semibold'>{elements.title}</span>
                        <span>{elements.quantity} x ${elements.price}.00</span>
                      </div>
                      <div>
                          <i onClick={() => removeCartItems(elements._id)} className='bx bxs-x-circle text-3xl text-black/80 cursor-pointer hover:text-black/80 duration-500'></i>
                      </div>
                      </li>
                    </div>
                    })}
                </ul>
                )}
              </div> 
            ): (
              <p className='mt-12 font-mont font-medium text-slate-500 ml-4 text-lg'>Your Cart is empty!</p>
            )}
            <div className='mt-14 text-center'>
              <Link to={`/products`} className='px-10 py-3 border-2 border-black/80 text-black/80 rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins'>Return To Shopping</Link>
            </div>

            <div className='mt-20'>
                <table className="w-[60%] mx-auto text-sm text-left shadow-lg">
                    <thead className="text-base text-white uppercase bg-black/80">
                        <tr className='lg:text-lg text-base h-[50px]'>
                            <th className='pl-5'>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody className='uppercase'>
                            <tr className="bg-white border hover:bg-gray-50 text-base">
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-base lg:text-lg">
                                    <span className='font-bold text-black/80'>Total:</span>
                                    <span className='pl-4 font-semibold font-mont text-black/80'>{totalPrice()}</span>  
                                </td>
                            </tr>
                            <tr className='bg-white border hover:bg-gray-50 text-base text-center'>
                                <td scope="row" className="px-6 py-4 font-medium text-black/80 whitespace-nowrap">
                                  <button onClick={createPayment} className='px-10 py-3 border-2 border-black/80 rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins uppercase'>
                                  {loading ? 
                                    <>
                                      <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-white fill-black/80" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                      </svg>
                                      <span className="ml-2">Checking...</span> 
                                    </>  : 'Checkout'}
                                  </button>
                                </td>
                            </tr>
                      </tbody>
                </table> 
              </div>
        </div>

        {/* Desktop Mode */}
        <div data-aos="fade-up" data-aos-duration="1000" className='hidden lg:block'>
        {cartItems && cartItems.length > 0 ? (
                <div className='bg-white w-[90%] mx-auto pt-14 shadow-sm'>
                <div className='pb-10'>
                <table className="w-[80%] mx-auto text-sm text-left text-gray-500 shadow-lg">
                <thead className="text-base text-white uppercase bg-black/80">
                <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                        Order #
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>
                </thead>
                  <tbody className='uppercase'>
                {
                    cartItems?.map((items, index) => {
                        return <tr key={index} className="bg-white border hover:bg-gray-50 text-base text-center text-black/80">
                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                            # {index+1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-center">
                              <img width={'75px'} height={'90px'} src={items.image} alt={items.title} />
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-center">
                            {items.title}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-center">
                            ${items.price}.00
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-center lowercase">
                            x {items.quantity}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-center">
                              <button onClick={() => removeCartItems(items._id)} className='font-medium hover:text-red-600 duration-500 transition-all'>
                                  <i className='bx bxs-trash text-[22px]'></i>
                              </button>
                        </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            </div>
            <div className='py-10'>
                <div className='mt-5'>
                <table className="w-[30%] mx-auto text-sm text-left shadow-lg">
                    <thead className="text-base text-white uppercase bg-black/80 text-pretty">
                        <tr className='text-lg h-[50px]'>
                            <th className='pl-5'>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody className='uppercase text-black/80'>
                            <tr className="bg-white border hover:bg-gray-50 text-base">
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[18px]">
                                    <span className='font-bold'>Subtotal:</span>
                                    <span className='pl-4 font-semibold font-mont'>{totalPrice()}</span>  
                                </td>
                            </tr>
                            <tr className='bg-white border hover:bg-gray-50 text-base'>
                                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-[18px]">
                                    <span className='font-bold'>Total:</span>
                                    <span className='pl-4 font-semibold font-mont'>{totalPrice()}</span>  
                                </td>
                            </tr>
                            <tr className='bg-white border hover:bg-gray-50 text-base text-center'>
                                <td scope="row" className="px-6 py-4 font-medium text-black/80 whitespace-nowrap text-lg">
                                  <button onClick={createPayment} className='px-10 py-3 border-2 border-black/80 rounded-sm hover:bg-black/80 hover:text-white transition-all duration-300 font-poppins uppercase'>
                                  {!loading ? 
                                    <>
                                      <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-white fill-black/80" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                      </svg>
                                      <span className="ml-2">Checking...</span> 
                                    </>  : 'Checkout'}
                                  </button>
                                </td>
                            </tr>
                      </tbody>
                </table> 
                </div>               
            </div>

        </div>
            ) : (
                <div className='bg-white w-[90%] h-[400px] mx-auto flex items-center justify-center gap-x-4'>
                    <i className='bx bxs-shopping-bag text-[45px] text-black/70'></i>
                    <h1 className='text-black/70 font-bold text-4xl uppercase'>Your Cart Is Empty!</h1>
                </div>
            )}
        </div>
      </section>
      <Footer2 />
    </>
  )
}

export default MyCart