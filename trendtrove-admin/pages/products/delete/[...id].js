import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DeleteItem = () => {

    const router = useRouter();

    const { id } = router.query;

    const [productInfo, setProductInfo] = useState()

    useEffect(() => {
        if (!id) {
            return
        }

        axios.get('/api/products?id=' + id)
            .then(res => {
                setProductInfo(res.data)
            })

    }, [id])

    const goBack = () => {
        router.push('/products')
    }

    const deleteProduct = async () => {
        await axios.delete('/api/products?id=' + id)
        goBack();
    }

    return (
        <Layout>
            <h1 className='font-bold text-center text-lg'>Do you realy want to delete &nbsp; "{productInfo?.title}"?</h1>
            <div className="flex justify-between mt-5">
                <button className='btn-red' onClick={deleteProduct}>Yes</button>
                <button className='btn-primary' onClick={goBack}>No</button>

            </div>

        </Layout>
    )
}

export default DeleteItem