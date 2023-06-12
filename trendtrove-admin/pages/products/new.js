import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm'
import React, { useState } from 'react'

const newProduct = () => {

    return (
        <Layout>
            <div className="text-blue-600 mb-2">
                <h2 className='font-bold text-2xl'>Add Product</h2>
            </div>
            <ProductForm />
        </Layout>
    )

}

export default newProduct