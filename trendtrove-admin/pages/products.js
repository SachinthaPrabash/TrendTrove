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
                className='bg-blue-700 text-white py-1 px-2 rounded-md'>Add New Product</Link>

            <table className='basic mt-4'>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Product Price</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product.title}</td>
                            <td>Rs. {product.price}</td>
                            <td>
                                <Link href={'/products/edit/' + product._id}><FaEdit className='mx-1 text-green-200' />Edit
                                </Link>
                                <Link href={'/products/delete/' + product._id}><AiFillDelete className='mx-1 text-green-200 ' />Delete
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