import Layout from '@/components/Layout'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'

const products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get('/api/products').then(res => {
            setProducts(res.data);
        })


    }, [])


    return (
        <Layout>
            <Link href={'/products/new'}
                className='btn-primary font-semibold p-4 '>Add New Product</Link>

            <table className='basic mt-4'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <th>{product.title}</th>
                            <td>Rs. {product.price}</td>
                            <td>
                                <Link href={'/products/edit/' + product._id}
                                    className='border-blue-600'
                                ><FaEdit className=' mx-1 text-black' />Edit
                                </Link>
                                <Link href={'/products/delete/' + product._id}
                                    className='border-red-600'><AiFillDelete className='mx-1 text-black  ' />Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}

export default products