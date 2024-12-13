import React from 'react'
import Image from 'next/image'
import { FaCheck } from 'react-icons/fa6'
import FoodCategory from '../components/FoodCategory'
import { FaPizzaSlice, FaHamburger, FaUtensils } from "react-icons/fa"; 
import { GiChefToque } from "react-icons/gi";
import Footer from '@/components/Footer';
import RestaurantNavbar from '@/components/RestaurantNavbar';
import MeetChef from '@/components/MeetChef';

function HomePage() {
  return (
    <>
    <RestaurantNavbar />
    
    <section className='bg-black px-3 md:px-[135px] flex flex-col justify-evenly md:flex-row  md:items-center py-[50px]'>
        {/* Heading */}
        <div className='text-white w-full md:w-[50%]'>
  <h1 className='md:text-[32px] text-[24px] font-normal text-[#FF9F0D] font whitespace-nowrap'>
    Its Quick & Amusing!
  </h1>

  <h1 className='text-[25px] md:text-[50px] font-bold whitespace-nowrap md:whitespace-normal'>

    <span className='text-[#FF9F0D]'>Th</span>e Art of speed food Quality
  </h1>

  <p className='text-[10px] md:text-[16px] font-normal'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue
  </p>

  <div className='flex flex-col md:flex-row items-center md:items-start'>

  <button className='bg-[#FF9F0D] text-white w-[100px] h-[30px] md:w-[190px] md:h-[60px] rounded-[40px] mt-[32px] hover:bg-yellow-800'>
    See More
  </button>
  </div>
</div>

        {/* Image */}

        <div className='mt-[50px] md:mt-100 '>   
            <Image 
                src="assets/hero-main.svg"
                alt='Hero Image'
                width={700}
                height={500}
                className=''
            />

        </div>
    </section>
        <section className="bg-black px-3 md:px-[135px] flex flex-col justify-evenly md:flex-row  md:items-center py-[50px]">
      

      {/* Image */}




      {/* Heading */}
      <div className="text-white w-full md:w-[50%]">
        <h1 className="md:text-[32px] text-[24px] font-normal text-[#FF9F0D] font whitespace-nowrap font-greatVibes">
          About us
        </h1>

        <h1 className="text-[20px] md:text-[50px] font-bold whitespace-nowrap md:whitespace-normal">
          <span className="text-[#FF9F0D]">We</span> Create the best foody
          product
        </h1>

        <p className="text-[10px] md:text-[16px] font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
          pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
          augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis
          sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in
          consequat.
        </p>

        <ul>
          <li className="text-[10px] md:text-[16px] font-normal mt-10 flex">
            <span className="mr-[10px]">
              <FaCheck />
            </span>{" "}
            Lacus nisi, et ac dapibus sit eu velit in consequat.
          </li>
          <li className="text-[10px] md:text-[16px] font-normal mt-10 flex">
            <span className="mr-[10px]">
              <FaCheck />
            </span>{" "}
            Quisque diam pellentesque bibendum non dui volutpat fringilla{" "}
          </li>
          <li className="text-[10px] md:text-[16px] font-normal mt-10 flex">
            <span className="mr-[10px]">
              <FaCheck />
            </span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </li>
        </ul>

        <div className="flex flex-col md:flex-row items-center md:items-start">
          <button className="bg-[#FF9F0D] text-white w-[100px] h-[30px] md:w-[190px] md:h-[60px] rounded-[40px] mt-[32px] hover:bg-yellow-800">
            See More
          </button>
        </div>
      </div>
      <div className="mt-[50px] md:mt-0 ">
        <Image src="/assets/main-about.svg"  alt="Hero Image" className="" width={660} height={330} />
        <div className="flex flex-col md:flex-row mt-[16px] md:mt-[0]">
          <Image src="/assets/main-about2.svg"  alt="Hero Image" className="mr-[16px] pt-[40px]" width={332} height={194} />
          <Image src="/assets/main-about3.svg"  alt="Hero Image" className="pt-[40px]" width={332} height={194} />
        </div>
      </div>
    </section>

    <section
      className="py-12 w-full bg-cover bg-center relative text-white text-center"
      style={{ backgroundImage: "url('assets/background.svg')" }} 
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
        {/* Stat Item 1 */}
        <div className="flex flex-col items-center">
          <GiChefToque className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-4xl font-bold">420</h3>
          <p>Professional Chefs</p>
        </div>

        {/* Stat Item 2 */}
        <div className="flex flex-col items-center">
          <FaHamburger className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-4xl font-bold">320</h3>
          <p>Items Of Food</p>
        </div>

        {/* Stat Item 3 */}
        <div className="flex flex-col items-center">
          <FaUtensils className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-4xl font-bold">30+</h3>
          <p>Years Of Experience</p>
        </div>

        {/* Stat Item 4 */}
        <div className="flex flex-col items-center">
          <FaPizzaSlice className="text-5xl text-orange-500 mb-4" />
          <h3 className="text-4xl font-bold">220</h3>
          <p>Happy Customers</p>
        </div>
      </div>
    </section>
     <MeetChef />
    <FoodCategory/>
    <Footer/>
    </>
  )
}

export default HomePage