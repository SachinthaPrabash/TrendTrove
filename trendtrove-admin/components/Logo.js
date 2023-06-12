import Link from 'next/link'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'

const Logo = () => {
    return (
        <Link href={'/'} className='flex gap-1 items-center ' >
            <AiFillHome />
            <span>Trend Trove</span>
        </Link >
    )
}

export default Logo