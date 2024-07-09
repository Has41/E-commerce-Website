/* eslint-disable */
import React, { useState, useEffect } from 'react'
import NavBar1 from '../components/NavBar1'
import Footer2 from '../components/Footer2'
import moment from 'moment'

const Order = () => {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/auth/orders')

            if (res.ok) {
                const data = await res.json()
                console.log(data.products);
                setOrders(data)
            } else {
                console.error('Error fetching orders!');
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])
  return (
    <>
    <NavBar1 />
    <section className='bg-slate-50 pt-16 lg:py-16 max-w-full w-full'>
        {orders && orders.length > 0 ? (
                <div className='bg-white w-[95%] mx-auto lg:bg-white pt-10 lg:w-[90%] lg:mx-auto lg:pt-14 lg:shadow-sm'>
                <div data-aos="fade-up" data-aos-duration="1000" className='pb-10 overflow-x-auto'>
                <table className="w-[80%] mx-auto text-sm text-left text-gray-500 shadow-lg">
                <thead className="lg:text-base text-sm text-white uppercase bg-black/80">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Order #
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
                </thead>
                <tbody className='uppercase text-sm lg:text-base'>
                {
                    orders?.map((items, index) => {
                        return <tr key={index} className="bg-white border hover:bg-gray-50 text-center">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {index+1}
                        </td>
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                            {items.status}
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
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                            {items.products.length}
                        </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
            </div>
            {orders.map((order, index) => (
            <div data-aos="fade-up" data-aos-duration="1000" className='py-10'>
                <div className='text-center text-xl lg:text-2xl font-bold uppercase pb-4'>Order # {index + 1}</div>
                <div className='overflow-x-auto'>
                <table className="w-[60%] mx-auto text-sm text-left shadow-lg">
                    <thead className="text-sm lg:text-base text-white uppercase bg-black/80">
                        <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3 text-right lg:text-center">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 lg:text-center text-right">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Quantity
                        </th>
                        </tr>
                        </thead>
                        <tbody className='uppercase lg:text-base text-sm'>
                        {order.products.map((product, index) => (
                        <tr key={index} className="bg-white border hover:bg-gray-50">
                            <td key={index} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {index+1}
                            </td>
                            <td key={index} scope="row" className="px-3 lg:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <div className='flex items-center gap-x-6 lg:gap-x-14'>
                                    <img width={'75px'} height={'80px'} src={product.image} alt={product.title} />
                                    {product.title}
                                </div>
                            </td>
                            <td key={index} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap lg:text-center text-right pl-28 lg:pl-0">
                                ${product.price}.00
                            </td>
                            <td key={index} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center lowercase">
                                x {product.quantity}
                            </td>
                        </tr>
                         ))}
                         </tbody>
                </table>
                </div>
                <div className='mt-10'>
                <table className="w-[60%] mx-auto text-sm text-left shadow-lg">
                    <thead className="text-base text-white uppercase bg-black/80">
                        <tr className='lg:text-lg text-base h-[50px]'>
                            <th className='pl-5'>Total Amount</th>
                        </tr>
                            <tr className="bg-white border hover:bg-gray-50 text-base">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-base lg:text-lg">
                                    <span className='font-bold'>Total:</span>
                                    <span className='pl-4 font-semibold font-mont'>${order.payment.amount}.00  </span>  
                                </td>
                            </tr>
                    </thead>
                </table> 
                </div>               
            </div>
        ))}
        </div>
            ) : (
                <div className='bg-white w-[90%] h-[400px] mx-auto flex items-center justify-center'>
                    <h1 className='text-black/80 font-bold text-4xl uppercase'>No Orders Placed Yet!</h1>
                </div>
            )}
    </section>
    <Footer2 />
    </>
  )
}

export default Order