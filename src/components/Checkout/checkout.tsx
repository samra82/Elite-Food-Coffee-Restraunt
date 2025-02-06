"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { urlFor } from "@/sanity/lib/image";
import {  ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const Checkout: React.FC = () => {
  const cart = useSelector((state: RootState) => state.carts.cart);

  // Using react-hook-form for form validation
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const [isSameAsShipping, setIsSameAsShipping] = useState(false);

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    zipCode: string;
    address1: string;
    address2?: string;
  }

  const onSubmit = (data: FormData) => {
    console.log(data); // handle form submission here
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Shipping Address Form */}
          <motion.div
            className="md:w-2/3 bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName", { required: "First Name is required" })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${errors.firstName ? 'border-red-500' : ''}`}
                />
                {errors.firstName && <span className="text-sm text-red-500">{String(errors.firstName.message)}</span>}
              </div>
              <div>
                <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName", { required: "Last Name is required" })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${errors.lastName ? 'border-red-500' : ''}`}
                />
                {errors.lastName && <span className="text-sm text-red-500">{String(errors.lastName.message)}</span>}
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" }
                  })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <span className="text-sm text-red-500">{String(errors.email.message)}</span>}
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", { required: "Phone number is required" })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <span className="text-sm text-red-500">{String(errors.phone.message)}</span>}
              </div>

              <div>
                <Label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </Label>
                <Select {...register("country", { required: "Country is required" })}>
                  <SelectTrigger className="w-full border border-gray-300 focus:ring-1 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]">
                    <SelectValue placeholder="Choose country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                    <SelectItem value="Turkey">Turkey</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && <span className="text-sm text-red-500">{String(errors.country.message)}</span>}
              </div>

              <div>
                <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </Label>
                <Select {...register("city", { required: "City is required" })}>
                  <SelectTrigger className="w-full border border-gray-300 focus:ring-1 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]">
                    <SelectValue placeholder="Choose city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Karachi">Karachi</SelectItem>
                    <SelectItem value="Istanbul">Istanbul</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                  </SelectContent>
                </Select>
                {errors.city && <span className="text-sm text-red-500">{String(errors.city.message)}</span>}
              </div>

              <div>
                <Label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  {...register("zipCode", { required: "Zip code is required" })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${errors.zipCode ? 'border-red-500' : ''}`}
                />
                {errors.zipCode && <span className="text-sm text-red-500">{String(errors.zipCode.message)}</span>}
              </div>

              <div className="col-span-2">
                <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                  Address 1
                </label>
                <Input
                  id="address1"
                  {...register("address1", { required: "Address 1 is required" })}
                  className="w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]"
                />
                {errors.address1 && <span className="text-sm text-red-500">{String(errors.address1.message)}</span>}
              </div>

              <div className="col-span-2">
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                  Address 2
                </label>
                <Input
                  id="address2"
                  {...register("address2")}
                  className="w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]"
                />
              </div>
            </form>

            <div className="mt-6">
              <div className="flex items-center">
                <Checkbox
                  id="sameAsShipping"
                  onChange={() => setIsSameAsShipping(!isSameAsShipping)}
                />
                <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                  Same as shipping address
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-between gap-5">
              
              <Button
                variant="outline"
                className="w-2/4 text-gray-700 border-gray-300 hover:bg-gray-100 flex items-center justify-center"
              ><Link href={"/cart"}>
                <i className="mr-2">
                  <ChevronLeftIcon />
                </i>
                Back to cart</Link>
              </Button>
              <Button className="w-2/4 bg-[#ff9f0d] hover:bg-[#e08c0b] text-white flex items-center justify-center">
                Proceed to shipping
                <i className="ml-2">
                  <ChevronRightIcon />
                </i>
              </Button>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="md:w-1/3 bg-white p-8 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart &&
                cart.items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Image
                      src={urlFor(item.srcUrl).url()}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                      <p className="text-[#ff9f0d] font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Sub-total</span>
                <span>
                  ${cart
                    ? cart.items
                        .reduce((sum, item) => sum + item.price * item.quantity, 0)
                        .toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>25%</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>54.76$</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>432.65$</span>
              </div>
            </div>
            <Link href={"/"}>
            <Button className="w-full mt-6 bg-[#ff9f0d] hover:bg-[#e08c0b] text-white">
              Place an order<i className="ml-2">
                <ArrowRightIcon />
            </i>
            </Button></Link>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
