import { CartContext } from '@/components/CartContext'
import Header from '@/components/Header'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { OrderSuccess } from '@/components/OrderSuccess';

const cart = () => {
    const router = useRouter();
    const { cartProducts, addProduct, removeProduct, cartClear } = useContext(CartContext);
    const [products, setProducts] = useState([])


    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [country, setCountry] = useState('')



    useEffect(() => {

        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data)
                })
        } else {
            setProducts([])
        }


    }, [cartProducts])

    useEffect(() => {
        if (router.query.success) {
            cartClear();
        }
    }, [])


    const addMoreProducts = idx => {
        addProduct(idx)
    }

    const removeMoreProducts = idx => {
        removeProduct(idx)
    }

    async function goToPayment() {
        const response = await axios.post('/api/checkout', {
            name,
            email,
            city,
            postalCode,
            streetAddress,
            country,
            cartProducts
        })
        if (response.data.url) {
            window.location = response.data.url
        }
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }


    if (router.query.success) {
        return <OrderSuccess />;
    }



    // if (typeof window !== 'undefined' && window.location.href.includes('success')) {
    //     return (
    //         <>
    //             <Header />

    //             <div className="my-5">
    //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10 mx-10">
    //                     <div className="col-span-2 bg-white p-10 rounded-xl">
    //                         <div className='text-xl font-extrabold'>Thanks for Your Order</div>
    //                         <div>We will email you when your order will be sent.</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <>
            <Header />

            <div className="my-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10 mx-10">
                    <div className="col-span-2 bg-white p-10 rounded-xl">
                        {!cartProducts?.length && (
                            <div className="">Your Cart is Empty</div>
                        )}
                        {products?.length > 0 && (
                            <>
                                <h2 className='text-xl font-extrabold'>Cart</h2>
                                <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">

                                    <table className='w-full text-sm text-left mt-5 table-fixed'>
                                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 text-center'>
                                            <tr>
                                                <th className='px-6 py-3'>Product</th>
                                                <th className='px-6 py-3'>Quantity</th>
                                                <th className='px-6 py-3'>Unit price (Rs.)</th>
                                                <th className='px-6 py-3'>Total price (Rs.)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product._id} className='bg-white border-b'>
                                                    <td className='px-6 py-4 font-medium text-gray-900 '>
                                                        <img src={product.images[0]} alt="" className='w-28 h-32 object-fill' />
                                                        {product.title}</td>
                                                    <td className='px-6 py-3 '>
                                                        <div className="flex justify-center items-center">
                                                            <button
                                                                className='bg-gray-300 p-2 rounded-l-lg font-bold'
                                                                onClick={() => removeMoreProducts(product._id)}>-</button>
                                                            <p className="flex justify-center items-center text-lg px-1">
                                                                {cartProducts.filter(id => id === product._id).length}
                                                            </p>
                                                            <button
                                                                className='bg-gray-300 p-2 rounded-r-lg font-bold'
                                                                onClick={() => addMoreProducts(product._id)}
                                                            >+</button>

                                                        </div>

                                                    </td>
                                                    <td className='px-6 py-3 text-center'>{product.price}.00</td>
                                                    <td className='px-6 py-3 text-center'>{cartProducts.filter(id => id === product._id).length * product.price}.00</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-xl font-bold py-3">Rs.{total}.00</td>
                                            </tr>

                                        </tbody>

                                    </table>
                                    <div ></div>
                                </div>
                            </>
                        )}
                    </div>
                    {!!products?.length && (

                        <div className="bg-white p-10 rounded-xl flex-row justify-center items-center ">
                            <h1 className='text-2xl font-extrabold tracking-wider text-center'>Order Information</h1>

                            <div className="mt-8">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" className=" focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        name="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                    <label className="peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ">Name</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" className=" focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                    <label className="peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ">Email</label>
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-4">

                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" className=" focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            name="city"
                                            value={city}
                                            onChange={e => setCity(e.target.value)} />
                                        <label className="peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ">City</label>
                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" className=" focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "
                                            name="postalCode"
                                            value={postalCode}
                                            onChange={e => setPostalCode(e.target.value)} />
                                        <label className="peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ">Postal Code</label>
                                    </div>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" className=" focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        name="streetAddress"
                                        value={streetAddress}
                                        onChange={e => setStreetAddress(e.target.value)} />
                                    <label className="peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ">Street Address</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text" className=" focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        name="country"
                                        value={country}
                                        onChange={e => setCountry(e.target.value)} />
                                    <label className="peer-focus:font-medium peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6  ">Country</label>
                                </div>
                            </div>


                            <button onClick={goToPayment} className='bg-[#27374D] text-white w-full py-2 rounded-xl mt-4 '>Continue to Payment </button>


                        </div>
                    )}
                </div>
            </div>

        </>
    )
}

export default cart