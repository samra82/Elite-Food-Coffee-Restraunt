import React from 'react';
import Image from 'next/image';
import { IoChevronForwardOutline } from "react-icons/io5";
import Navbar from '@/components/Navbar';
import RightPanel from '@/components/RightPanel';
const BlogDetails: React.FC = () => {
  return (
    <div className="bg-white">
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
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Blog Detail </h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]">Blog</span>
         </p>
       </div>
     </div>
   </header>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image
                src="assets/blogdetail.svg"
                alt="Blog Post"
                width={872}
                height={520}
                objectFit="cover"
              />
              <div className="p-6">
                <p className="text-gray-500">Feb 14, 2022 / 3 Comments / Admin</p>
                <h2 className="text-2xl font-semibold mb-4">10 Reasons To Do A Digital Detox Challenge</h2>
                <p className="text-gray-600 mb-6">
                  Netus pretium tellus nulla commodo massa adipiscing in elementum magna congue
                  convallis placerat habitasse parturient ac est a. Quisque tristique eleifend vivamus
                  et condimentum sociis orci sem. Elit praesent nec volutpat ultricies purus 
                  sollicitudin augue tempus faucibus quam ac aliquot habitant suspendisse
                  lacus integer leo erat aliquam ut.
                </p>

                <blockquote className="bg-orange-100 p-4 italic text-orange-600 rounded-md mb-6">
                &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.!&quot
                </blockquote>

                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper at amet pharetra mi...
                </p>

                <Image
                  src="assets/detail1.svg"
                  alt="Food"
                  width={872}
                  height={520}
                  objectFit="cover"
                />
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Comments - 03</h3>
              <div className="space-y-6">
                {/* Comment 1 */}
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-bold">MD Sojib Khan <span className="text-gray-500 text-sm">- June 22, 2020</span></p>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <button className="text-sm text-orange-500">Reply</button>
                  </div>
                </div>

                {/* More comments... */}
              </div>

              {/* Comment Form */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Post a Comment</h4>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="border p-2 rounded w-full"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <textarea
                    placeholder="Write a comment"
                    className="border p-2 rounded w-full mt-4"
                    rows={4}
                  ></textarea>
                  <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
          <RightPanel />
        </div>
         
      </div>
    </div>
  );
};

export default BlogDetails;