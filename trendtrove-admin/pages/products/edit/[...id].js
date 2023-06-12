import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ProductForm from '@/components/ProductForm'

const EditProductPage = () => {
    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) { return }
        axios.get('/api/products?id=' + id)
            .then(res => {
                setProductInfo(res.data)
            })
    }, [id])

    return (
        <Layout>
            <div className="text-blue-600 mb-2">
                <h2 className='font-bold text-2xl'>Edit Product</h2>
            </div>
            {productInfo && (
                <ProductForm {...productInfo} />

            )}
        </Layout>
    )
}

export default EditProductPage