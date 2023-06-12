import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiFillHome, AiFillSetting, AiOutlineClose } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { FaHome, FaTasks } from 'react-icons/fa'
import { RiBankCardLine } from 'react-icons/ri'
import Logo from './Logo'

export const Nav = ({ show, onClose }) => {

    const inactiveLink = 'flex gap-1';
    const activeLink = inactiveLink + ' bg-white text-blue-500 rounded-l-lg';

    const router = useRouter();
    const { pathname } = router;

    async function logout() {
        await router.push('/');
        await signOut();
    }



    return (
        <aside className={(show ? "left-0" : "-left-full") + ` top-0 text-black p-4 pl-8 pr-0 fixed w-full h-full md:static md:w-auto transition-all  bg-white  `}>
            <div className=" mb-4  mr-4 flex items-center justify-between">
                <Logo />
                <button className='md:hidden' id='closebutton' onClick={onClose}>
                    <AiOutlineClose />
                </button>
            </div>
            <nav className='flex flex-col gap-2'>
                <Link href={'/'} className={`flex items-center gap-1 py-3 px-2  ${pathname === '/' ? activeLink : inactiveLink} `}>
                    <FaHome className='mx-2' />
                    Dashboard
                </Link>
                <Link href={'/products'} className={`flex items-center gap-1 py-3 px-2  ${pathname.includes('/products') ? activeLink : inactiveLink}`}>
                    <RiBankCardLine className='mx-2' />
                    Products
                </Link>
                <Link href={'/categories'} className={`flex items-center gap-1 py-3 px-2  ${pathname.includes('/categories') ? activeLink : inactiveLink}`}>
                    <RiBankCardLine className='mx-2' />
                    Categories
                </Link>
                <Link href={'/orders'} className={`flex items-center gap-1 py-3 px-2 ${pathname.includes('/orders') ? activeLink : inactiveLink}`}>
                    <FaTasks className='mx-2' />
                    Orders
                </Link>
                <Link href={'/setings'} className={`flex items-center gap-1 py-3 px-2 ${pathname.includes('/setings') ? activeLink : inactiveLink}`}>
                    <AiFillSetting className='mx-2' />
                    Settings
                </Link>
                <button onClick={logout} className={`flex items-center gap-1 py-3 px-2 inactiveLink`}>
                    <BiLogOut className='mx-2' />
                    LogOut
                </button>
            </nav>
        </aside>
    )
}
