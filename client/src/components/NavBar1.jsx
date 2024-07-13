/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar1 = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [cartSidebar, setCartSidebar] = useState(false)
    const [userDropdown, setUserDropdown] = useState(false)
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [userData, setUserData] = useState(null)
    const [total, setTotal] = useState(0)

    const profilePic = "https://e-commerce-website-server-eta.vercel.app/api/users/me/photo"

    const navigate = useNavigate()

    useEffect(() => {
        if (mobileMenu) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
      }, [mobileMenu])

    useEffect(() => {
        if (cartSidebar) {
            document.body.style.overflow = "hidden"
          } else {
            document.body.style.overflow = "auto"
          }
    }, [cartSidebar])

    const mobileMenuAnimate = () => {
        if(mobileMenu) {
            return 'translate-x-0'
        } else {
            return 'translate-x-full'
        }
    }

    const toggleCartSidebar = () => {
        setCartSidebar(!cartSidebar)
    }

    const toggleUser = () => {
        setUserDropdown(!userDropdown)
    }

    const cartMenuAnimate = () => {
        if(cartSidebar) {
            return 'lg:translate-x-0'
        } else {
            return 'lg:translate-x-full'
        }
    }

    const getCartItems = async () => {
        try{
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/cart/current`)
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

    const totalItemsPrice = () => {
        let itemsTotal = 0
    
        cartItems.forEach((elements) => {
            itemsTotal += elements.price * elements.quantity
        })
    
        setTotal(itemsTotal)
    }
    

    const removeCartItems = async (id) => {
        try {
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/cart/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                setCartItems(cartItems.filter((item) => item._id !== id))
                totalItemsPrice()
                getCartItems()
            } else {
                console.error(`Error removing items from the cart!`)
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    const checkLogin = async () => {
        try {
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/users/me`, {
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

    const handleLogout = async () => {
        try {
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/auth/logout`, {
                method: 'POST',
                credentials: 'same-origin'
            })
            if(res.ok) {
                setUserData(null)
                setLoggedIn(false)
                setUserDropdown(false)
                navigate(`/login`)
            } else {
                console.error(`Error!`);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getCartItems()
        totalItemsPrice()
    },[cartSidebar])

    useEffect(() => {
        checkLogin()
    },[])

  return (
    <nav className='flex items-center justify-between py-8 font-poppins shadow-sm'>
    <Link to={`/`}>
      <div className='uppercase text-3xl font-bold ml-12'>
        HASS.
      </div>
    </Link>

    <div className='md:hidden flex'>
        <div className='text-3xl mr-4 cursor-pointer'>
          <Link to={`/myCart`}><i className='bx bxs-cart-alt'></i></Link>
        </div>
        <button onClick={() => setMobileMenu(!mobileMenu)} className='text-3xl mr-10 cursor-pointer'>
            {mobileMenu ? <i className='bx bx-x'></i> : <i className='bx bx-menu-alt-right'></i>}
        </button>
    </div>

    {/* Desktop menu */}
    <div className='hidden md:block'>
        <ul className='flex gap-12 text-base uppercase'>
            <li><Link to={`/`}>Home</Link></li>
            <li><Link to={`/products`}>Our Products</Link></li>
            <li><Link to={`/about`}>About Us</Link></li>
            <li><Link to={`/contacts`}>Contact Us</Link></li>
        </ul>
    </div>

    {/* Mobile menu */}
    <div className={`md:hidden fixed top-0 right-0 bottom-0 w-64 shadow-xl bg-white transition-transform transform ${mobileMenuAnimate()} duration-200 z-50`}>
         <button onClick={() => setMobileMenu(false)} className='absolute top-4 right-4 text-2xl'>
            <i className='bx bx-x'></i>
        </button>
        <ul className='flex flex-col gap-4 p-4 mt-10'>
            <li className='hover:bg-slate-200 cursor-pointer'><Link to={`/`}>Home</Link></li>
            <li className='hover:bg-slate-200 cursor-pointer'><Link to={`/products`}>Our Products</Link></li>
            <li className='hover:bg-slate-200 cursor-pointer'><Link to={`/about`}>About Us</Link></li>
            <li className='hover:bg-slate-200 cursor-pointer'><Link to={`/contacts`}>Contact Us</Link></li>
            {isLoggedIn ? (
                    <>
                    <Link to={'/orders'} className='hover:bg-slate-200 cursor-pointer'>My Orders</Link>
                    <li className='hover:bg-slate-200 cursor-pointer'><Link to={`/edit`}>Edit Profile</Link></li>
                    <li className='hover:bg-slate-200 cursor-pointer'><Link to={'/orders'}>My Orders</Link></li>
                    <li onClick={handleLogout} className='hover:bg-slate-200 cursor-pointer'>Logout</li>
                    </>
                ): (
                    <li className='hover:bg-slate-200 cursor-pointer'><Link to={`/login`}><i className='bx bxs-user text-xl'></i></Link></li>
                )}
        </ul>
    </div>


<div className={`hidden lg:block h-screen lg:fixed lg:top-0 lg:right-0 lg:bottom-0 lg:w-96 lg:shadow-xl lg:bg-white lg:transition-transform lg:transform lg:duration-500 ${cartMenuAnimate()} lg:shadow-xl lg:z-50`}>
    {cartSidebar && (
        <div onClick={toggleCartSidebar} className='lg:absolute lg:top-4 lg:right-3 cursor-pointer'>
            <i className='bx bx-x text-3xl'></i>
        </div>
    )}
    
    {/* Header Section */}
    <div className='hidden lg:block lg:mt-6 lg:ml-8'>
        <p className="font-poppins font-semibold text-xl tracking-wider relative after:h-[2px] after:w-[430px] after:bg-amber-500 after:absolute after:bottom-[-20px] after:left-[-9%] after:content-''">Shopping Cart</p>
    </div>
    
    {/* Main Content Section */}
    <div className='h-[calc(100%-200px)] overflow-y-auto flex items-center justify-center'>
        {isLoggedIn ? (
            <div className='h-full overflow-y-auto'>
                {cartItems.length === 0 ? (
                    <div>
                        <p className='font-mont font-medium text-slate-500 text-lg'>No Products In The Cart!</p>
                    </div>
                ) : (
                    <ul className='max-w-xl mt-12'>
                        {cartItems.slice(0, 5).map((item, idx) => (
                            <div className='w-[330px]' key={idx}>
                                <li className='py-4 flex items-center justify-center gap-6'>
                                    <div>
                                        <img className='h-[90px] w-[75px]' src={item.image} alt="" />
                                    </div>
                                    <div className='flex flex-col gap-1 pr-[65px] w-[170px]'>
                                        <span className='font-mont font-semibold'>{item.title}</span>
                                        <span>{item.quantity} x ${item.price}.00</span>
                                    </div>
                                    <div>
                                        <i onClick={() => removeCartItems(item._id)} className='bx bxs-x-circle text-3xl text-amber-500 cursor-pointer hover:text-amber-600 duration-500'></i>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        ) : (
            <div>
                <p className='font-mont font-medium text-slate-500 text-lg'>No Products In The Cart!</p>
            </div>
        )}
    </div>
    
    {/* Footer Section */}
    <div>
        {isLoggedIn && cartItems.length !== 0 ? (
            <div className='fixed bottom-0 right-0 left-0 p-4 bg-white shadow-inner'>
                <div className='flex items-center justify-between border-t border-b border-slate-400 py-3'>
                    <span className='uppercase font-semibold'>Subtotal:</span>
                    <span className='font-mont text-black font-semibold text-lg'>${total}.00</span>
                </div>
                <div className='mt-4 flex items-center justify-center'>
                    <Link to={`/myCart`}>
                        <button className='px-14 py-2 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-poppins text-lg transition-all duration-500 rounded-sm'>View Cart</button>
                    </Link>
                </div>
            </div>
        ) : (
            <div className='fixed bottom-0 right-0 left-0 p-4 bg-white shadow-inner'>
                <div className='mt-4 flex items-center justify-center'>
                    <Link to={`/products`}>
                        <button className='px-14 py-2 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white font-poppins text-lg transition-all duration-500 rounded-sm'>Continue Shopping</button>
                    </Link>
                </div>
            </div>
        )}
    </div>
</div>

    {/* Icons */}
    <div className='hidden md:flex gap-4 mr-10 cursor-pointer'>
            {isLoggedIn && cartItems.length !== 0 ? (
                    <div onClick={toggleCartSidebar} className="relative">
                        <i className='bx bxs-cart-alt text-xl'></i>
                        <span className="absolute top-[-6px] right-[-6px] w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-semibold text-white">{cartItems.length}</span>
                    </div>
            ) : (
                <div onClick={toggleCartSidebar} className="relative">
                    <i className='bx bxs-cart-alt text-xl'></i>
                </div>
            )}


        <div onClick={toggleUser} className='lg:transition-all lg:duration-500'>
            {userData ? (
                <div className='flex justify-center gap-x-2'>
                    <div>
                        <img className='rounded-full w-[30px] h-[30px] border-2 border-white' src={`=${profilePic}/${userData._id}`} alt="Photo" />
                    </div>
                    <div className=''>
                        <h2 className='text-[14px] font-semibold'>{userData.name}</h2>
                        <p className='text-[10px] font-medium'>{userData.bio}</p>
                    </div>
                </div>
                ) : (
                 <i className='bx bxs-user text-xl'></i> 
                )}

        {userDropdown && (
            <div className='lg:relative'>
                <div className='lg:absolute lg:-right-6 lg:mt-2 lg:py-2 lg:w-32 lg:bg-white lg:border lg:border-gray-slate-300 lg:rounded lg:shadow-lg z-50'>
                {isLoggedIn ? (
                    <>
                        <Link to={`/edit`} className='block px-4 py-2 font-poppins text-slate-600 text-base hover:text-black transition-all duration-300'>Edit Profile</Link>
                        <Link to={'/orders'} className='block px-4 py-2 font-poppins text-slate-600 text-base hover:text-black transition-all duration-300'>My Orders</Link>
                        <div onClick={handleLogout} className='block px-4 py-2 font-poppins text-slate-600 text-base hover:text-black transition-all duration-300'>Logout</div>
                    </>
                ) : (
                    <>
                        <Link to={`/login`} className='block px-4 py-2 font-poppins text-slate-600 text-base hover:text-black transition-all duration-300'>Login</Link>
                        <Link to={`/register`} className='block px-4 py-2 font-poppins text-slate-600 text-base hover:text-black transition-all duration-300'>Register</Link>
                    </>
                )}
            </div>
            </div>
                )}
        </div>
</div>

</nav>
)}

export default NavBar1