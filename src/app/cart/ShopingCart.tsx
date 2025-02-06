'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, updateCartItemQuantity } from '@/lib/features/carts/cartsSlice';
import { RootState } from '@/lib/store';
import { urlFor } from '@/sanity/lib/image';

const ShoppingCart: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.carts?.cart);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

const handleQuantityChange = (index: number, newQuantity: number) => {
  if (cart) {
    const item = cart.items[index];
    dispatch(updateCartItemQuantity({
      id: item.id, quantity: newQuantity,
      attributes: []
    }));
  }
};

  const handleRemoveItem = (index: number) => {
    if (cart) {
      const item = cart.items[index];
      dispatch(removeCartItem({ id: item.id, attributes: item.attributes }));
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
    }
  };

  const handleProceedToCheckout = () => {
    router.push('/checkOut');
  };

  const cartSubtotal = cart ? cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const shippingCharges = 30.0;
  const totalAmount = cartSubtotal - cartSubtotal * discount + shippingCharges;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center space-x-4">
                      <Image 
                        src={urlFor(item.srcUrl).url()} 
                        alt={item.name}
                        width={48} 
                        height={48} 
                        className="rounded-md object-cover"
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="p-4">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                      className="w-20 text-center"
                      min="0"
                    />
                  </td>
                  <td className="p-4 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {cart && cart.items.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4 border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Image 
                    src={urlFor(item.srcUrl).url()} 
                    alt={item.name}
                    width={64} 
                    height={64} 
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Qty:</span>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                    className="w-20 text-center"
                    min="0"
                  />
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Section */}
        <div className="mt-8 space-y-6 lg:space-y-0 lg:flex lg:space-x-8">
          {/* Coupon Section */}
          <div className="lg:flex-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Have a Coupon?</h2>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1"
                />
                <Button 
                  onClick={handleApplyCoupon}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span>-${(cartSubtotal * discount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>${shippingCharges.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 mt-6"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShoppingCart;