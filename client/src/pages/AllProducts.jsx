/* eslint-disable */
import React, { useEffect, useState } from "react"
import NavBar1 from "../components/NavBar1"
import Footer2 from "../components/Footer2"
import RangeSlider from "../components/RangeSlider"
import { Link } from "react-router-dom"

const AllProducts = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(6)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  // const [priceRange, setPriceRange] = useState([10, 100])
  const [minValue, setMinValue] = useState(10)
  const [maxValue, setMaxValue] = useState(100)

  const apiURL = process.env.REACT_APP_API_URL

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [showSidebar]);

  const handleMinChange = (newMinValue) => {
    setMinValue(newMinValue)
  }

  const handleMaxChange = (newMaxValue) => {
    setMaxValue(newMaxValue)
  }

  const getProducts = async (latestData) => {
    try {
      setLoading(true)
      const res = await fetch(`${apiURL}/api/products/get-listed-product/${latestData.skip}/${latestData.limit}`, {
        method: 'GET',
        credentials: 'same-origin'
      });
  
      if (res.ok) {
        const data = await res.json()
        setProducts([...products, ...data])
        setLoading(false)
      } else {
        setLoading(false)
        console.error('Error getting products')
      }
    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  };
  

  const getSidebar = () => {
    let sidebarClass = ""
    if (showSidebar) {
      sidebarClass = "-translate-x-[27%]"
    } else {
      sidebarClass = "-translate-x-[150%]"
    }
    return sidebarClass
  };

  const getLgSidebar = () => {
    let sidebarLgClass = ""
    if (showSidebar) {
      sidebarLgClass = "lg:-translate-x-[16%]"
    } else {
      sidebarLgClass = "lg:-translate-x-[150%]"
    }
    return sidebarLgClass;
  }

  const starRating = () => {
    const starIcons = []

    for (let i = 0; i <= 5; i++) {
      starIcons.push(
        <i key={i} className="bx bx-star text-gray-300 text-xl"></i>
      )
    }
    return (
      <span className="flex items-center justify-center">{starIcons}</span>
    )
  }

  const getCategory = async () => {
    try {
        const res = await fetch(`${apiURL}/api/category/get-category`)
        if (res.ok) {
            const data = await res.json()
            setCategories(data)
        } else {
            console.error('Error fetching categories')
        }
    } catch (err) {
        console.error(err)
    }
}

  const handleCategorySelect = (categoryName) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter((category) => category !== categoryName)
      } else {
        return [...prevCategories, categoryName]
      }
    })
  }

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category.name);
    const isPriceMatch = product.price >= minValue && product.price <= maxValue;

    return isCategoryMatch && isPriceMatch;
  });



const getProductCount = async () => {
  try {
    const res = await fetch(`${apiURL}/api/products/get-product-count`)

    if (res.ok) {
      const data = await res.json()
      setTotalCount(data)
    }
  } catch (err) {
    console.error(err);
  }
}

const loadMore = async () => {
  try {
    const newSkip = skip + limit 

    const latestData = {
      skip: newSkip,
      limit: limit
    }

    await getProducts(latestData)

  } catch (err) {
    console.error(err)
  }
}


  useEffect(() => {
      const latestData = {
        skip: skip,
        limit: limit
      }
      getProducts(latestData)
      getProductCount()
      getCategory()

  }, [skip, limit])

  return (
    <>
      <NavBar1 />
      <section className="bg-slate-50/40 pb-4">
        <div data-aos="fade-up" data-aos-duration="1000" className="pt-10 lg:flex lg:items-center lg:justify-center lg:space-x-96">
          <div className="flex items-center justify-center space-x-16 sm:space-x-20 lg:space-x-5 lg:pr-32">
            <button
              className="flex items-center space-x-1 pl-4 lg:pl-0 sm:pr-60 lg:pr-0"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <div className="pt-1">
                <i className="bx bx-filter text-xl lg:text-3xl"></i>
              </div>
              <p className="font-mont font-medium text-slate-500 lg:font-semibold lg:text-xl">
                Filter
              </p>
            </button>

            {/* Side button for filter */}
            <div
              className={`${getSidebar()} ${getLgSidebar()} shadow-lg top-0 left-0 w-60 lg:w-96 bg-white h-full fixed transition-all duration-500 ease-in-out overflow-y-auto`}
            >
              {showSidebar && (
                <button
                  onClick={() => setShowSidebar(false)}
                  className="absolute top-4 right-4 text-slate-400"
                >
                  <i className="bx bx-x text-2xl"></i>
                </button>
              )}

                {/* Filter Section */}
              <div className="mt-20 ml-6 lg:ml-20">
                <p className="font-poppins font-semibold text-base uppercase tracking-wide lg:text-xl lg:font-poppins">
                  Product Categories
                </p>
                <div>
                  <ul className="space-y-2 mt-5 lg:text-lg">
                    {categories?.map((items, index) => {
                     return  <li key={index} className={`font-mont cursor-pointer font-semibold text-amber-500 ${selectedCategories.includes(items.name) ? "text-amber-700" : ""}`} onClick={() => handleCategorySelect(items.name)}>
                          {items.name}
                      </li>
                    })}
                  </ul>
                </div>

                <div className="mt-8">
                  <p className="font-poppins font-semibold uppercase tracking-wide lg:text-xl">
                    Price Range
                  </p>
                  <p className="font-mont font-medium text-slate-500 text-sm lg:text-lg mx-auto mt-4">
                    Price: $10 to $100
                  </p>
                  <RangeSlider
                    minValue={minValue}
                    maxValue={maxValue}
                    onMinChange={handleMinChange}
                    onMaxChange={handleMaxChange}
                    />
                  <div></div>
                </div>
              </div>

            </div>
            <div>
              <p className="text-slate-500 font-mont text-sm lg:font-medium lg:text-base">
                Showing 1-6 of 12 results
              </p>
            </div>
          </div>

          <button className="flex items-center space-x-4 pl-4 lg:relative lg:bottom-4">
            <p className="font-mont font-medium text-slate-500 pl-4 pt-8 lg:text-lg">
              Sort by popularity
            </p>
            <div className="pt-9">
              <i class="bx bx-chevron-down text-xl lg:text-3xl"></i>
            </div>
          </button>
        </div>


    {/* Cards */}
    {loading && products.length !== 0 ? (
      <div className='mt-8 lg:mt-24 grid items-center justify-center lg:grid-cols-3 gap-10 sm:gap-20 lg:gap-x-8 lg:gap-y-12 lg:ml-14 mb-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='border border-slate-50 hover:shadow-2xl transition-all duration-1000 w-[300px] h-[520px] lg:h-[545px] rounded-sm sm:w-[350px] sm:h-[630px] lg:w-[320px] animate-pulse'>
            <div className='text-center flex items-center justify-center sm:w-[350px] lg:w-[320px]'>
              <div className='h-[400px] sm:h-[450px] rounded-sm sm:w-[350px] lg:h-[400px] w-full bg-slate-50/100 relative'>
                {/* Gray lines to simulate loading effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse' />
                <div className='absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse' />
              </div>
            </div>
            <div className="p-4">
              <p className='rounded-full bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse w-[300px] h-6 mb-4'></p>
              <p className='rounded-full bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse w-[300px] h-6 mb-4'></p>
              <p className='rounded-full bg-gradient-to-r from-slate-50 to-slate-100 animate-pulse w-[300px] h-6 mb-4'></p>
            </div>
            {starRating()}
          </div>
        ))}
    </div>

    ) : (
      <div data-aos="fade-up" data-aos-duration="1000" className='mt-8 lg:mt-24 grid items-center justify-center lg:grid-cols-3 gap-10 sm:gap-20 lg:gap-x-8 lg:gap-y-12 lg:ml-14 mb-4'>
          <>
          {filteredProducts.map((product) => (
            <Link key={product._id} to={`/cartPage/${product._id}`} className='border border-slate-50 hover:shadow-2xl transition-all duration-1000 w-[300px] h-[520px] lg:h-[545px] rounded-sm sm:w-[350px] sm:h-[630px] lg:w-[320px]'>
            <div className='text-center flex items-center justify-center sm:w-[350px] lg:w-[320px]'>
              <img className='h-[400px] sm:h-[450px] rounded-sm sm:w-[350px] lg:h-[400px] w-full' src={`/api/products/get-product-photo/${product._id}`} alt={product.name} />
            </div>
            <p className='text-center font-mont font-semibold mt-4 sm:text-lg'>{product.name}</p>
            <p className='text-center font-mont font-normal text-slate-500 sm:text-lg'>{product.category.name}</p>
            <p className='text-center font-mont font-medium sm:text-lg sm:font-semibold'>${product.price}.00</p>
            {starRating()}
            </Link>
          ))}
          </>
    </div>

    )}


    {products && products.length < totalCount && (
        <div className="text-center mb-8 mt-8">
          <button onClick={loadMore} className="px-6 py-3 text-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-700 rounded-sm font-medium font-poppins">
            {loading ? 
            <>
              <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="ml-2">Loading...</span> 
            </>  : 'Load More'}
          </button>
        </div>
     )} 

      </section>
      <Footer2 />
    </>
  )
}

export default AllProducts