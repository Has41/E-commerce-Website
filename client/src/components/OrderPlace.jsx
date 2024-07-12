/* eslint-disable */
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import AdminSearch from './AdminSearch'

const OrderPlace = () => {
    const [status, setStatus] = useState(['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
    // const [changeStatus, setChangeStatus] = useState('')
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const res = await fetch('https://e-commerce-website-server-eta.vercel.app/api/auth/get-orders')

            if (res.ok) {
                const data = await res.json()
                setOrders(data)
            } else {
                console.error('Error fetching orders!');
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = async (orderId, e) => {
        try {
            const { value } = e.target
            const res = await fetch(`https://e-commerce-website-server-eta.vercel.app/api/auth/update-orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: value })
            })

            if (res.ok) {
                fetchOrders()
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])
  return (
    <main className='w-[80%] bg-slate-50 fixed right-0 rounded-md bottom-0 h-screen shadow-md overflow-y-auto'>
        <AdminSearch />
        {orders && orders.length > 0 ? (
                <div className='bg-slate-50 w-[90%] mx-auto pt-14 shadow-sm mt-20'>
                {/* <h3>Orders</h3> */}
                <table className="w-[80%] mx-auto text-sm text-left text-gray-500 shadow-lg">
                <thead className="text-base text-white uppercase bg-black/80">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        #
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Buyer
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                        Quantity
                    </th>
                </tr>
                {
                    orders?.map((items, index) => {
                        return <tr className="bg-white border hover:bg-gray-50 text-base">
                        <td key={index} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {index+1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                            <select className='px-6 py-1 border border-slate-300 focus:outline-none focus:border-none focus:shadow-none' value={items.status} onChange={(e) => handleChange(items._id, e)} name="" id="">
                                {status?.map((items, index) => (
                                    <option key={index} value={items}>{items}</option>
                                ))}
                            </select>
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                            {items.buyer.name}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                            {moment(items.createAt).fromNow()}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                            {items.payment.condition}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center lowercase">
                            x{items.products.length}
                        </td>
                        </tr>
                    })
                }
                </thead>
            </table>
            </div>
                ) : (
                <div className='bg-slate-50 text-center w-full h-full grid place-items-center'>
                    <h1 className='text-black/80 font-bold text-4xl uppercase'>No Orders Placed Yet!</h1>
                </div>
            )}
    </main>
  )
}

export default OrderPlace