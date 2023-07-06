import Link from 'next/link'
import React, { useContext } from 'react'
import { styled } from 'styled-components'
import { CartContext } from './CartContext'


const Header = () => {

    const { cartProducts } = useContext(CartContext)

    return (

        <header className='bg-[#27374D]   '>
            <div className="m-auto flex justify-between py-8 max-w-4xl ">


                <Link href={'/'} className='text-white text-2xl font-extrabold tracking-wider pl-3 md:pl-0'>Trend-Trove</Link>

                <nav className='text-gray-400 gap-5 hidden md:inline-flex '>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/products'}>All Products</Link>
                    <Link href={'/categories'}>Categories</Link>
                    <Link href={'/account'}>Account</Link>
                    <Link href={'/cart'}>Cart ({cartProducts.length})</Link>

                </nav>


            </div>
        </header>

    )
}

export default Header