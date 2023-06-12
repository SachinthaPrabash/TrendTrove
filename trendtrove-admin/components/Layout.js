import { FcGoogle } from 'react-icons/fc'
import { useSession, signIn } from "next-auth/react"
import { Nav } from '@/components/Nav'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import Logo from './Logo'


export default function Layout({ children }) {

    const [showNav, SetshowNav] = useState(false)

    const { data: session } = useSession()

    const closeNav = () => {
        SetshowNav(!showNav);
    };

    if (!session) {
        return (
            <div className="bg-blue-600 w-screen h-screen flex items-center justify-center">
                <div className="flex flex-row justify-center items-center bg-white  text-center rounded-md " >
                    <FcGoogle className='w-7 h-7 ml-2' />
                    <button className='  px-5 py-3 font-bold' onClick={() => signIn('google')}>
                        Loging with Google Account</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen ">
            <div className=" md:hidden flex  h-full p-2">
                <button onClick={() =>
                    SetshowNav(true)
                } className=' '>
                    <GiHamburgerMenu />
                </button>
                <div className="flex grow justify-center mr-6">
                    <Logo />

                </div>
            </div>
            <div className=" flex">
                <Nav show={showNav} onClose={closeNav} />
                <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4 ">{children} </div>
            </div>

        </div>
    )
}
