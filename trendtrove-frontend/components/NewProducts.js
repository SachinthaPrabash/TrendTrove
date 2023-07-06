import React from 'react'
import ProductBox from './ProductBox'

const NewProducts = ({ products }) => {
    return (
        <>
            <div className="p-16  ">
                <div className="m-auto  max-w-5xl">
                    <h1 className='text-3xl font-[Poppins] font-extrabold py-5'>New Arrivals</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
                        {products?.length > 0 && products.map((product, idx) => (
                            <ProductBox key={idx} {...product} />
                        ))}

                    </div>

                </div>

            </div>
        </>
    )
}

export default NewProducts