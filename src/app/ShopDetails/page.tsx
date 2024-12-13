import ProductDetails from '@/components/ProductDetails';
import SimilarProducts from '@/components/SimilarProducts';
import React from 'react';
import { IoChevronForwardOutline } from "react-icons/io5";
import Navbar from '@/components/Navbar';
import Image from "next/image";


const ShopDetails: React.FC = () => {
  return (
    <div className="shop-details-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="relative bg-black w-full ">
     <Navbar/>

     {/* Background Image */}
     <div className="h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center relative">
       <Image
         src="/assets/header.svg"
         alt="Header Image"
         layout="fill"
         objectFit="cover"
         priority
       />
       

       {/* Centered Text */}
       <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Shop Detail</h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]">  404</span>
         </p>
       </div>
     </div>
   </header>
   
      <ProductDetails/>
      <SimilarProducts/>
    </div>
  );
};

export default ShopDetails;