import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Navbar from '@/components/Navbar';
import Image from "next/image";


const chefs = [
  { name: "Tahmina Rumi", role: "Chef", image: "/assets/chef1.svg" },
  { name: "Jorina Begum", role: "Chef", image: "/assets/chef2.svg" },
  { name: "M. Mohammad", role: "Chef", image: "/assets/chef3.svg" },
  { name: "Munna Kathy", role: "Chef", image: "/assets/chef4.svg" },
  { name: "Tahmina Rumi", role: "Cook", image: "/assets/chef5.svg" },
  { name: "Bisnu Devgon", role: "Chef", image: "/assets/chef6.svg" },
  { name: "Motin Molladst", role: "Chef", image: "/assets/chef7.svg" },
  { name: "William Rumi", role: "Chef", image: "/assets/chef8.svg" },
  { name: "Kets William Roy", role: "Chef", image: "/assets/chef9.svg" },
  { name: "Mahmud Kholil", role: "Chef", image: "/assets/chef10.svg" },
  { name: "Ataur Rahman", role: "Chef", image: "/assets/chef12.svg" },
  { name: "Monalisa Holly", role: "Chef", image: "/assets/chef11.svg" },
];

const OurChef = () => {
  return (
    <div className="p-6 mt-20"> 

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
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">404 Error</h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]">  404</span>
         </p>
       </div>
     </div>
   </header>
   
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {chefs.map((chef, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl ${
              index === 6
                ? "border-4 border-yellow-500" 
                : "border-4 border-transparent hover:border-yellow-500" 
            }`}
          >
            {/* Chef Image */}
            <div className="flex-1">
              <Image
                width={312}
                height={379.17}
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            {/* Static Information Section Below Image */}
            <div className="p-4 text-center">
              <h3 className="text-gray-800 font-bold text-lg">{chef.name}</h3>
              <p className="text-gray-600">{chef.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurChef;