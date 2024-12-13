import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import RightPanel from '@/components/RightPanel';
import { IoChevronForwardOutline } from "react-icons/io5";


const BlogPage: React.FC = () => {
  return (
    <>
      {/* Header */}
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
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Blog List</h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]">Blogs</span>
         </p>
       </div>
     </div>
   </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog List */}
          <div className="lg:col-span-2 space-y-8">
            {/* Blog Post 1 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="/assets/blog1.svg"
                width={871}
                height={520}
                alt="Blog Post 1"
                objectFit="cover"
                priority
              />
              <div className="p-6">
                <p className="text-gray-500">Feb 14, 2022 / 3 / Admin</p>
                <h2 className="text-2xl font-semibold mb-2">10 Reasons To Do A Digital Detox Challenge</h2>
                <p className="text-gray-600">At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                <a href="#" className="text-blue-500 hover:underline mt-4 block">Read More</a>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="assets/blog2.svg"
                width={871}
                height={520}
                alt="Blog Post 2"
                objectFit="cover"
                priority
              />
              <div className="p-6">
                <p className="text-gray-500">Feb 14, 2022 / 3 / Admin</p>
                <h2 className="text-2xl font-semibold mb-2">Traditional Soft Pretzels with Sweet Beer Cheese</h2>
                <p className="text-gray-600">At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                <a href="#" className="text-blue-500 hover:underline mt-4 block">Read More</a>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="/assets/blog3.svg"
                width={871}
                height={520}
                alt="Blog Post 3"
                objectFit="cover"
                priority
              />
              <div className="p-6">
                <p className="text-gray-500">Feb 14, 2022 / 3 / Admin</p>
                <h2 className="text-2xl font-semibold mb-2">The Ultimate Hangover Burger: Egg in a Hole Burger</h2>
                <p className="text-gray-600">At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                <a href="#" className="text-blue-500 hover:underline mt-4 block">Read More</a>
              </div>
            </div>

            {/* Blog Post 4 */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="assets/blog4.svg"
                width={871}
                height={520}
                alt="Blog Post 4"
                objectFit="cover"
                priority
              />
              <div className="p-6">
                <p className="text-gray-500">Feb 14, 2022 / 3 / Admin</p>
                <h2 className="text-2xl font-semibold mb-2">My Favorite Easy Black Pizza Toast Recipe</h2>
                <p className="text-gray-600">At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                <a href="#" className="text-blue-500 hover:underline mt-4 block">Read More</a>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hidden lg:block ">
            <RightPanel />
          </div>
        </div>
      </div>

    </>
  );
};

export default BlogPage;
