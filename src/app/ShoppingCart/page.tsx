"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { IoChevronForwardOutline } from "react-icons/io5";
import Navbar from '@/components/Navbar';
import Image from "next/image";


const initialCartItems = [
  { name: "Burger", price: 10.99, quantity: 2, image: "/assets/food1.svg" },
  { name: "Fresh Lime", price: 3.49, quantity: 1, image: "/assets/food2.svg" },
  { name: "Pizza", price: 9.99, quantity: 4, image: "assets/food3.svg" },
  { name: "Chocolate Muffin", price: 4.49, quantity: 1, image: "/assets/food4.svg" },
  { name: "Cheese Butter", price: 11.99, quantity: 3, image: "/assets/product5.svg" },
];

const ShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCharges = 30.0;
  const totalAmount = cartSubtotal - cartSubtotal * discount + shippingCharges;

  return (
    <div className="bg-white font-sans">
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
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">Shopping Cart</h1>
         <p className="text-sm md:text-base lg:text-lg mt-2 flex items-center gap-2">
           <span className="text-white">Home</span>
           <IoChevronForwardOutline />
           <span className="text-[#FF9F0D]">Shop</span>
         </p>
       </div>
     </div>
   </header>

      <main className="py-12 px-6 md:px-16 lg:px-28">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Product</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Quantity</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 flex items-center">
                  <Image width={64} height={64} src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <span>{item.name}</span>
                </td>
                <td className="p-4">${item.price.toFixed(2)}</td>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                    className="w-16 border rounded px-2 py-1 text-center"
                    min="0"
                  />
                </td>
                <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-4 text-red-500 cursor-pointer" onClick={() => handleRemoveItem(index)}>
                  &times;
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-10">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold mb-2">Coupon Code</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter your code"
                className="flex-grow border rounded-l px-4 py-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-orange-500 text-white px-6 py-2 rounded-r font-semibold"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex justify-between mb-4">
                <span>Cart Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Discount</span>
                <span>${(cartSubtotal * discount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping Charges</span>
                <span>${shippingCharges.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <Link href={"/CheckoutPage"}><button className="w-full bg-orange-500 text-white mt-4 py-3 rounded font-semibold">
                Proceed to Checkout
              </button></Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;