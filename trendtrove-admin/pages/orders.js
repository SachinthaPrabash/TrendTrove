import Layout from '@/components/Layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const orders = () => {

    const [order, setOrder] = useState([])
    useEffect(() => {
        axios.get('/api/orders')
            .then(response => {
                setOrder(response.data)
            })
    }, [])

    return (
        <Layout>

            <div className="mb-4 text-2xl uppercase font-bold justify-center flex"> Order</div>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Paid</th>
                        <th>Recipient</th>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    {order.length > 0 && order.map(order => (
                        <tr>
                            <td>{order._id}</td>
                            <td className={order.paid ? 'text-green-700' : 'text-red-800'}>{order.paid ? 'YES' : 'NO'}</td>
                            <td>
                                {order.name} {order.email} <br />
                                {order.streetAddress} {order.city} {order.postalCode}
                            </td>
                            <td>
                                {order.line_items.map(l => (
                                    <>
                                        {l.price_data?.product_data.name} * {l.quantity}
                                        {/* {JSON.stringify(l)} */}
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default orders