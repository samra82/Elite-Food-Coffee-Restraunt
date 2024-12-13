"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
  
      <div className="container mx-auto flex  justify-around items-center bg-black text-white ">
        

        {/* Navigation */}
        <nav
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-black md:static md:w-auto md:flex`}
        >
          {/* Logo */}
        <div className="flex items-center justify-between w-full pr-24">
                <span className="text-yellow-500 font-bold text-lg flex-grow text-center">
                    Food<span className="text-white">tuck</span>
                </span>
        </div>

        {/* Hamburger menu (visible only on small screens) */}
        <button
          className="text-2xl md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li>
              <Link
                href="/"
                className=" font-bold block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/Menu"
                className="block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/BlogPage"
                className="block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/FAQPage"
                className="block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                Pages
              </Link>
            </li>
            <li>
              <Link
                href="/About"
                className="block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/ShopList"
                className="block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/Contact"
                className="block px-4 py-2 transition duration-300 hover:text-yellow-500 "
              >
                Contact
              </Link>
            </li>
          </ul>
           {/* Icons */}
        <div className="hidden md:flex space-x-4 items-center pl-24">
          <IoSearchOutline className="text-xl cursor-pointer" />
          <AiOutlineUser className="text-xl cursor-pointer" />
          <Link href={"/ShopList"}><HiOutlineShoppingBag className="text-xl cursor-pointer" /></Link>
        </div>  
        </nav>
    </div>
  );
};

export default Navbar;