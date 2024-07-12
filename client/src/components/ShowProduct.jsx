/* eslint-disable */
import React, { useState, useEffect } from 'react'
import AdminPanel from '../pages/AdminPanel'
import AdminSearch from './AdminSearch'

const ShowProduct = () => {
    const [products, setProducts] = useState([])
    const [editable, setEditable] = useState(null)
    const [category, setCategory] = useState([])
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: '',
        quantity: '',
    })

    const getAllProducts = async () => {
        try {
            const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/products/get-product')

            if (res.ok) {
                const data = await res.json()
                setProducts(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleSaveEdit = async (id) => {
        try {
            const editedProduct = products.find((item) => item._id === id);
            
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/products/update-product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct),
            });

            if (res.ok) {
                getAllProducts();
                setEditable(null); // Disable editing after saving
                setEditedProduct({
                    name: '',
                    price: '',
                    quantity: '',
                });
            } else {
                console.error('Error updating product!');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const removeProduct = async (id) => {
        try {
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/products/delete-product/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                getAllProducts();
                setProducts(prev => prev.filter(item => item._id !== id));
            } else {
                console.error('Error removing category!')
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = async (categoryId, e) => {
        try {
            const { value } = e.target
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/category/update-category/${categoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: value })
            })

            if (res.ok) {
                getAllProducts()
                setEditable(null)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getCategory = async () => {
        try {
            const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/category/get-category', {
                method: 'GET',
                credentials: 'same-origin'
            })
            if (res.ok) {
                const data = await res.json()
                setCategory(data)
            } else {
                console.error('Error fetching categories')
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    useEffect(() => {
        getCategory()
    }, [])

  return (
    <main className='w-[80%] bg-slate-50 fixed right-0 rounded-md bottom-0 h-screen shadow-md overflow-y-auto'>
        <AdminSearch />
        <div>
        <div className='bg-slate-50 w-[90%] mx-auto pt-14 shadow-sm mt-20 mb-12'>
                <table className="w-[80%] mx-auto text-sm text-left text-gray-500 shadow-lg">
                <thead className="text-base text-white uppercase bg-black/80">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        #
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                </tr>
                        {products?.map((items, index) => {
                              return  <tr key={index} className="bg-white border hover:bg-gray-50 text-base">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {index+1}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                        <img width={'75px'} height={'90px'} src={`/api/products/get-product-photo/${items._id}`} alt="" />
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {editable === items._id ? (
                                    <input
                                        type='text'
                                        value={items.name}
                                        className='border border-slate-300 w-[100px]'
                                        onChange={(e) => setEditedProduct((prev) => ({ ...prev, name: e.target.value }))}
                                        />
                                        ) : (
                                        items?.name
                                        )}  
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                    {editable === items._id ? (
                                    <input
                                        type='text'
                                        value={items.price}
                                        className='border border-slate-300 w-[40px]'
                                        onChange={(e) => setEditedProduct((prev) => ({ ...prev, price: e.target.value }))}
                                        />
                                        ) : (
                                        `$${items?.price}.00`
                                        )}  
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                        {editable === items._id ? (
                                            <select className='w-[160px] pl-2 py-1 border border-slate-300 focus:outline-none focus:border-none focus:shadow-none' value={items.category} onChange={(e) => handleChange(items._id, e)} name="" id="">
                                                {category?.map((elements, index) => (
                                                    <option key={index} value={elements.name}>{elements.name}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            `${items?.category.name}`
                                        )}
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center lowercase">
                                    {editable === items._id ? (
                                    <input
                                        type='text'
                                        value={items.quantity}
                                        className='border border-slate-300 w-[50px]'
                                        onChange={(e) => setEditedProduct((prev) => ({ ...prev, quantity: e.target.value }))}
                                        />
                                        ) : (
                                        `x ${items?.quantity}`
                                        )}  
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center lowercase">
                                    {editable === items._id ? (
                                        <button onClick={() => {
                                            handleSaveEdit(items._id);
                                            setEditable(null); // Reset the editable state after saving
                                        }} className='font-medium text-black/80 hover:text-blue-600 duration-500 transition-all mr-5'>
                                            <i className='bx bx-check text-[28px]'></i>
                                        </button>
                                    ) : (
                                        <button onClick={() => setEditable(items._id)} className='font-medium text-black/80 hover:text-green-600 duration-500 transition-all mr-5'>
                                            <i className='bx bxs-edit-alt text-[22px]' ></i>
                                        </button>
                                    )}
                                    <button onClick={() => removeProduct(items._id)} className='font-medium text-black/80 hover:text-red-600 duration-500 transition-all'>
                                        <i className='bx bxs-trash text-[22px]'></i>
                                    </button>
                                    </td>
                                </tr>
                        })}
                </thead>
            </table>
            </div>    
    </div>

    </main>
  )
}

export default ShowProduct