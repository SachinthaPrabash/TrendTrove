import Link from 'next/link'
import React from 'react'

const Freatured = ({ product }) => {
    return (
        <div className='bg-[#27374D] '>
            <div className="text-white p-10 m-auto  max-w-5xl ">

                <div className="grid grid-cols-1 md:grid-cols-3 ">
                    <div className='col-span-2 text-gray-400 flex  justify-between items-center '>
                        <div className="grid grid-flow-row">
                            <div className="">
                                <h1 className='text-xl md:text-4xl text-white font-bold mb-4 tracking-wide'>
                                    {product.title}
                                </h1>
                            </div>
                            <div className="">
                                <desc className='text-sm md:text-lg'>
                                    {product.description}
                                </desc>
                            </div>
                            <div className="flex gap-5 pt-3 text-xs md:text-base" >
                                <Link href={'/products/' + product._id}>
                                    <button className='btn-deafult '>Read more</button>
                                </Link>
                                <button className='btn-cart'>Add to cart</button>
                            </div>
                        </div>



                    </div>
                    <div className="flex justify-center">
                        <img src={product.images[0]} alt="" className='max-w-full h-full hover:origin-bottom hover:rotate-1' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Freatured