"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa';


const RestaurantNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex flex-col items-center p-4 bg-black">
            <div className="flex items-center justify-between w-full">
                <span className="text-yellow-500 font-bold text-lg flex-grow text-center">
                    Food<span className="text-white">tuck</span>
                </span>
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
                    </button>
                </div>
            </div>

            {/* Main Navigation for Desktop */}
            <div className='hidden md:flex flex-row items-center justify-around w-full p-2 transition-all duration-300 ease-in-out'>
                <div className="flex items-center space-x-4">
                    <Link href="/" className='hover:text-yellow-500 text-white'>
                        Home
                    </Link>
                    <Link href="/Menu" className='hover:text-yellow-500 text-white'>
                        Menu
                    </Link>
                    <Link href="/BlogPage" className='hover:text-yellow-500 text-white'>
                        Blog
                    </Link>
                    <Link href="/Pages" className='hover:text-yellow-500 text-white'>
                        Pages
                    </Link>
                    <Link href="/About" className='hover:text-yellow-500 text-white'>
                        About
                    </Link>
                    <Link href="/ShopList" className='hover:text-yellow-500 text-white'>
                        Shop
                    </Link>
                    <Link href="/Contact" className='hover:text-yellow-500 text-white'>
                        Contact
                    </Link>
                </div>

                <div className="flex items-center mt-4 md:mt-0">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="pl-4 pr-10 py-2 rounded-full bg-black border border-yellow-500 text-white focus:outline-none" 
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                    </div>
                    <FaShoppingBag className="ml-4 text-white" />
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}">
                <div className="flex flex-col items-center space-y-2 mt-2">
                    <Link href="/" className='hover:text-yellow-500 text-white'>
                        Home
                    </Link>
                    <Link href="/Menu" className='hover:text-yellow-500 text-white'>
                        Menu
                    </Link>
                    <Link href="/BlogPage" className='hover:text-yellow-500 text-white'>
                        Blog
                    </Link>
                    <Link href="/Pages" className='hover:text-yellow-500 text-white'>
                        Pages
                    </Link>
                    <Link href="/About" className='hover:text-yellow-500 text-white'>
                        About
                    </Link>
                    <Link href="/ShopList" className='hover:text-yellow-500 text-white'>
                        Shop
                    </Link>
                    <Link href="/Contact" className='hover:text-yellow-500 text-white'>
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default RestaurantNavbar;