/* eslint-disable */
import React, { useEffect, useState } from 'react'
import AdminSearch from './AdminSearch'

const Category = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState([])
    const [editable, setEditable] = useState(null)

    const handleEditClick = (id) => {
        // Set the category with id as editable
        setEditable(id)
      }

    const addCategory = async (e) => {
        e.preventDefault()

        if (!name) {
            console.log('Empty field!')
        }

      try {
          await fetch('/api/category/create-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        })

    } catch (err) {
        console.error(err)
    }
}

const getCategory = async () => {
    try {
        const res = await fetch('/api/category/get-category', {
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

const removeCategory = async (id) => {
    try {
        const res = await fetch(`/api/category/delete-category/${id}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            setCategory(category.filter((item) => item._id !== id))
        } else {
            console.error('Error removing category!')
        }
    } catch (err) {
        console.error(err)
    }
}

const handleSaveEdit = async (id, updatedName) => {
    try {
      const res = await fetch(`/api/category/edit-category/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName }),
      })
      if (res.ok) {
        // Refresh the category list after updating the category
        getCategory()
        setEditable(null) // Disable editing after saving
      } else {
        console.error('Error updating category!')
      }
    } catch (err) {
      console.error(err)
    }
}

useEffect(() => {
    getCategory()
}, [])

  return (
    <main className='w-[80%] bg-slate-50 fixed right-0 bottom-0 h-screen shadow-md overflow-y-auto'>
      <AdminSearch />
    <form onSubmit={addCategory} method='POST' className='flex items-center justify-center gap-5 mt-28'>
        <input className='rounded-sm w-[640px] border border-slate-400' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Add Categories' />
        <button className='text-white bg-black/85 border border-black/80 px-4 py-2 uppercase font-semibold rounded-sm hover:bg-white hover:text-black duration-500 transition-all'>Add Category</button>
    </form>  

<div className="relative overflow-x-auto mt-10">
    <table className="w-[80%] mx-auto text-sm text-left text-gray-500 shadow-lg">
        <thead className="text-base text-white uppercase bg-black/80">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Category name
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {category?.map((element) => {
                return <tr key={element._id} className="bg-white border hover:bg-gray-50 text-base">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {editable === element._id ? (
                        <input
                          type='text'
                          value={element.name}
                          className='border border-slate-300'
                          onChange={(e) => setCategory((prev) => {
                            const updatedCategory = [...prev]
                            const index = updatedCategory.findIndex((item) => item._id === element._id)
                            updatedCategory[index].name = e.target.value
                            return updatedCategory
                          })}
                        />
                      ) : (
                        element?.name
                      )}                     
                    </td>
                    <td className='px-6 py-4 text-right'>
                     {editable === element._id ? (
                       <button onClick={() => handleSaveEdit(element._id, element.name)} className='font-medium text-black/80 hover:text-blue-600 duration-500 transition-all mr-5'>
                         <i className='bx bx-check text-[28px]'></i>
                       </button>
                     ) : (
                       <button onClick={() => handleEditClick(element._id)} className='font-medium text-black/80 hover:text-green-600 duration-500 transition-all mr-5'>
                          <i className='bx bxs-edit-alt text-[22px]' ></i>
                       </button>
                     )}
                      <button onClick={() => removeCategory(element._id)} className='font-medium text-black/80 hover:text-red-600 duration-500 transition-all'>
                        <i className='bx bxs-trash text-[22px]'></i>
                      </button>
                    </td>
                    </tr>
                    })}
        </tbody>
    </table>
</div>
    </main>
  )
}

export default Category