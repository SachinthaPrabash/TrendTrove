import Link from 'next/link'
import React, { useContext } from 'react'
import { BsCartPlusFill } from 'react-icons/bs'
import { CartContext } from './CartContext'

const ProductBox = ({ _id, title, description, price, images }) => {
    const { addProduct } = useContext(CartContext)
    const uri = '/product/' + _id;
    return (
        <div className=' mb-5'>
            <Link href={uri} className="flex justify-center items-center bg-white p-5 rounded-2xl cursor-pointer">
                <img src={images[0]} alt={title}
                    className='w-fit h-40' />
            </Link>
            <div className="grid grid-rows-2 ">
                <div className="px-2">
                    <h1 className='mt-1 text-lg line-clamp-1'>{title}</h1>
                </div>
                <div className="px-2">
                    <div className="flex justify-between mt-2">
                        <p className='font-extrabold text-lg flex justify-center items-center'>Rs.{price}.00</p>
                        <button className='btn-cart'><BsCartPlusFill className='text-white text-sm block md:hidden' /><p className='hidden md:block' onClick={() => addProduct(_id)}>Add to Cart</p> </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductBox