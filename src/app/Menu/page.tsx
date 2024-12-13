import React from 'react';
import Image from 'next/image'; 
import { IoChevronForwardOutline} from "react-icons/io5";
import { FaPizzaSlice, FaHamburger, FaUtensils } from "react-icons/fa"; 
import { GiChefToque } from "react-icons/gi";
import Navbar from '@/components/Navbar';


const Menu = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      
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
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Menu Page</h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]"> Menu</span>
         </p>
       </div>
     </div>
   </header>
         {/* Starter Menu */}
      <section className="w-full max-w-4xl my-12 px-4 flex flex-col md:flex-row gap-8 items-center">
        <Image
          src="/assets/starter menu.svg"
          alt="Starter Menu"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">Starter Menu</h2>
          <ul className="text-gray-600 space-y-4">
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Alder Grilled Chinook Salmon</h3>
              <p className="text-sm">Toasted French bread topped with romano, cheddar</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">32$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Berries and Creme Tart</h3>
              <p className="text-sm">Gorgonzola, ricotta, mozzarella, taleggio</p>
              <p className="text-xs text-gray-500">700 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">43$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Tormentoso Bush Pizza Pintage</h3>
              <p className="text-sm">Ground cumin, avocado, peeled and cubed</p>
              <p className="text-xs text-gray-500">1000 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">14$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Spicy Vegan Potato Curry</h3>
              <p className="text-sm">Spreadable cream cheese, crumbled blue cheese</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">35$</span>
          </li>
        </ul>
         
        </div>
      </section>

      {/* Main Course */}
      <section className="w-full max-w-4xl my-12 px-4 flex flex-col md:flex-row gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">Main Course</h2>
          <ul className="text-gray-600 space-y-4">
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Optic Big Breakfast Combo Menu</h3>
              <p className="text-sm">Toasted French bread topped with romano, cheddar</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">32$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Cashew Chicken With Stir-Fry</h3>
              <p className="text-sm">Gorgonzola, ricotta, mozzarella, taleggio</p>
              <p className="text-xs text-gray-500">700 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">43$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Vegetables & Green Salad</h3>
              <p className="text-sm">Ground cumin, avocado, peeled and cubed</p>
              <p className="text-xs text-gray-500">1000 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">14$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Spicy Vegan Potato Curry</h3>
              <p className="text-sm">Spreadable cream cheese, crumbled blue cheese</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">35$</span>
          </li>
        </ul>
        </div>
        <Image
          src="/assets/MAIN CORSE.svg"
          alt="Main Course"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
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

      {/* Dessert */}
      <section className="w-full max-w-4xl my-12 px-4 flex flex-col md:flex-row gap-8 items-center">
        <Image
          src="assets/desert.svg"
          alt="Dessert"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">Dessert</h2>
          <ul className="text-gray-600 space-y-4">
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Fig and Lemon Cake</h3>
              <p className="text-sm">Toasted French bread topped with romano, cheddar</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">32$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Creamy Mascarpone Cake</h3>
              <p className="text-sm">Gorgonzola, ricotta, mozzarella, taleggio</p>
              <p className="text-xs text-gray-500">700 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">43$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Pastry, Blueberries, Lemon Juice</h3>
              <p className="text-sm">Ground cumin, avocado, peeled and cubed</p>
              <p className="text-xs text-gray-500">1000 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">14$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Pain au Chocolat</h3>
              <p className="text-sm">Spreadable cream cheese, crumbled blue cheese</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">35$</span>
          </li>
        </ul>
        </div>
      </section>

      {/* Drinks */}
      <section className="w-full max-w-4xl my-12 px-4 flex flex-col md:flex-row gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">Drinks</h2>
          <ul className="text-gray-600 space-y-4">
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Caffè Macchiato</h3>
              <p className="text-sm">Toasted French bread topped with romano, cheddar</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">32$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Aperol Spritz Cappuccino</h3>
              <p className="text-sm">Gorgonzola, ricotta, mozzarella, taleggio</p>
              <p className="text-xs text-gray-500">700 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">43$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Caffè Latte Campuri</h3>
              <p className="text-sm">Ground cumin, avocado, peeled and cubed</p>
              <p className="text-xs text-gray-500">1000 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">14$</span>
          </li>
          <li className="flex justify-between">
            <div>
              <h3 className="font-bold">Tormentoso Bush Tea Pintage</h3>
              <p className="text-sm">Spreadable cream cheese, crumbled blue cheese</p>
              <p className="text-xs text-gray-500">560 CAL</p>
            </div>
            <span className="text-orange-500 font-bold">35$</span>
          </li>
        </ul>
        </div>
        <Image
          src="assets/drinks.svg"
          alt="Drinks"
          width={400}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </section>
    </div>
  );
};

export default Menu;
