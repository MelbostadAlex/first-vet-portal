import React, { useState } from 'react'
import MAIN_LOGO from '../assets/main_logo.png'

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    return (
        <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-white to-[#2c5364] border-y-2'>

            <div className='flex text-black '>
                <img src={MAIN_LOGO} alt="Logo" className='w-[300px] p-5' />
                <h1 className='p-5 text-2xl flex items-center font-bold'> Schedule Tool </h1>
            </div>

            {/* Menu */}

            <ul className='flex p-2 text-black'>
                <li><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'> Sign In </button></li>
                <li> <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'> Sign Up </button> </li>
            </ul>
        </div>
    )
}

export default Navbar