/* eslint-disable */
import React, { useState, useEffect } from 'react'
import AdminSearch from './AdminSearch'

const AddProduct = () => {
const [categories, setCategories] = useState([])
const [photo, setPhoto] = useState('')
const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')
const [category, setCategory] = useState('')
const [quantity, setQuantity] = useState('')

const getCategory = async () => {
  try {
      const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/category/get-category', {
          method: 'GET',
          credentials: 'same-origin'
      })
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

const createProduct = async (e) => {
  e.preventDefault();

  const formData = new FormData()
  formData.append('name', name)
  formData.append('description', description)
  formData.append('price', price)
  formData.append('quantity', quantity)
  formData.append('category', category)
  formData.append('photo', photo)

  console.log(category)

  try {
    await fetch('https://e-commerce-website-server-eta.vercel.app/api/products/create-product', {
      method: 'POST',
      body: formData,
    })

  } catch (err) {
    console.error(err)
  }
}

useEffect(() => {
  getCategory()
}, [])

  return (
    <main className='w-[80%] bg-slate-50 fixed right-0 bottom-0 h-screen overflow-y-auto'>
      <AdminSearch />
      <div className='mt-24 my-8 text-center'>
      <div className='bg-white max-w-[600px] p-[30px] rounded-sm py-8 pb-14 shadow-md mx-auto'>

        <div>
          <h1 className='text-2xl uppercase font-bold text-center'>Add Product</h1>
        </div>

        <div className='mt-4'>

          <form action="">
            <div>
              <div className='h-[45px] mt-7'>
                <input className='px-4 rounded-sm border border-slate-300 h-full w-full' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter product name.' />
              </div>
              <div className='mt-7'>
                <textarea className='rounded-sm border border-slate-300 h-[300px] w-full resize-none' type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter product description.......' />
              </div>
              <div className='mt-7 h-[45px]'>
                <input className='py-4 rounded-sm border border-slate-300 w-full h-full' type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter product price.' />
              </div>
              <div className='mt-7 h-[45px]'>
                <input className='py-4 rounded-sm border border-slate-300 w-full h-full' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Enter product quantity.' />
              </div>
              <div className='mt-7'>
                <select className='py-4 text-base rounded-sm border border-slate-300 text-slate-400 pl-3 h-full w-full' placeholder='Select product category' onChange={(e) => {setCategory(e.target.value)}} required>
                  <option value='' disabled selected>Select product category</option>
                    {categories?.map((element) => (
                        <option key={element._id} value={element._id}>{element.name}</option>
                    ))}
                  </select>
              </div>
              <div className='mt-7'>
              <label className="flex flex-col items-center justify-center w-full h-[60%] border-2 border-dashed border-gray-300 rounded-sm cursor-pointer bg-slate-50/30">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>

                    {photo ? (
                      <span className="font-semibold text-base">{photo.name}</span>
                    ) : (
                      <>
                        <p className={`mb-2 text-sm ${photo ? 'hidden' : ''} text-gray-500 dark:text-gray-400`}>
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className={`text-xs ${photo ? 'hidden' : ''} text-gray-500 dark:text-gray-400`}>
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="hidden" />
                </label>
              </div>

              <div className='mt-7 h-[45px]'>
                <button type='submit' onClick={createProduct} className='border-2 border-black/80 text-black/80 font-mont mt-5 w-full h-full hover:bg-black/80 hover:border hover:border-black/80 hover:text-white transition-all duration-500 py-2 text-lg font-semibold rounded-sm uppercase'>Add Product</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </main>
  )
}

export default AddProduct