"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import AnimatedEllipsis from "./AnimatedEllipsis";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Label } from "../ui/label";
import { useForm ,  Controller} from "react-hook-form";
import { urlFor } from "@/sanity/lib/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  srcUrl: string;
  _id: string;
}

interface Cart {
  items: CartItem[];
}

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
  billingAddress?: string;
}

const Checkout: React.FC = () => {
  const cart = useSelector(
    (state: RootState) => state.carts.cart
  ) as Cart | null;
  const {
    register,
    handleSubmit,
    setValue,
    control, 
    formState: { errors },
  } = useForm<FormData>();

  const [isSameAsShipping, setIsSameAsShipping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setValue("billingAddress", isSameAsShipping ? "same-as-shipping" : "");
  }, [isSameAsShipping, setValue]);

  const saveCartToLocalStorage = useCallback(() => {
    if (cart) {
      localStorage.setItem("selectedProducts", JSON.stringify(cart.items));
    }
  }, [cart]);

  useEffect(() => {
    saveCartToLocalStorage();
  }, [cart]);

 const onSubmit = async (data: FormData) => {
  if (!cart || cart.items.length === 0) {
    toast.error("Your cart is empty. Please add products before checking out.");
    return;
  }

  setLoading(true);
  const loadingToast = toast.loading("Processing your order...");

  try {
    const orderData = {
      _type: "order",
      ...data,
      items: cart.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.srcUrl,
      })),
      total: cart.items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
      createdAt: new Date().toISOString(),
    };

    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    

    if (!response.ok) {
      throw new Error('Failed to process order.');
    }
    const result = await response.json();
    console.log('Order saved:', result);
    toast.success("Order processed successfully!", { id: loadingToast });
    router.push('/payment');
  } catch (error) {
    console.error("Error saving order:", error);
    toast.error("Failed to process order. Please try again.", { id: loadingToast });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Shipping Address Form */}
          <motion.div
            className="w-full lg:w-2/3 bg-white p-4 md:p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Shipping Address
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^(?:\+92|0)?3\d{9}$/,
                      message: "Enter a valid Pakistani phone number",
                    },
                  })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
  <Label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
    Country
  </Label>
  <Controller
    control={control}
    name="country"
    rules={{ required: "Country is required" }}
    render={({ field }) => (
      <Select
        onValueChange={field.onChange}
        value={field.value}
      >
        <SelectTrigger className="w-full border border-gray-300 focus:ring-1 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]">
          <SelectValue placeholder="Choose country" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Pakistan">Pakistan</SelectItem>
          <SelectItem value="Turkey">Turkey</SelectItem>
          <SelectItem value="USA">USA</SelectItem>
        </SelectContent>
      </Select>
    )}
  />
  {errors.country && (
    <span className="text-sm text-red-500">{errors.country.message}</span>
  )}
</div>


              {/* City */}
              <div className="space-y-2">
  <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
    City
  </Label>
  <Controller
    control={control}
    name="city"
    rules={{ required: "City is required" }}
    render={({ field }) => (
      <Select
        onValueChange={field.onChange}
        value={field.value}
      >
        <SelectTrigger className="w-full border border-gray-300 focus:ring-1 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]">
          <SelectValue placeholder="Choose city" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Karachi">Karachi</SelectItem>
          <SelectItem value="Istanbul">Istanbul</SelectItem>
          <SelectItem value="New York">New York</SelectItem>
        </SelectContent>
      </Select>
    )}
  />
  {errors.city && (
    <span className="text-sm text-red-500">{errors.city.message}</span>
  )}
</div>


              {/* Zip Code */}
              <div className="space-y-2">
                <Label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  {...register("zipCode", {
                    required: "Zip code is required",
                    pattern: {
                      value: /^\d{5}$/,
                      message: "Enter a valid zip code (5 digits)",
                    },
                  })}
                  className={`w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] ${
                    errors.zipCode ? "border-red-500" : ""
                  }`}
                />
                {errors.zipCode && (
                  <span className="text-sm text-red-500">
                    {errors.zipCode.message}
                  </span>
                )}
              </div>

              {/* Address 1 */}
              <div className="space-y-2">
                <Label
                  htmlFor="address1"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address 1
                </Label>
                <Input
                  id="address1"
                  {...register("address1", {
                    required: "Address 1 is required",
                  })}
                  className="w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]"
                />
                {errors.address1 && (
                  <span className="text-sm text-red-500">
                    {errors.address1.message}
                  </span>
                )}
              </div>

              {/* Address 2 */}
              <div className="space-y-2">
                <Label
                  htmlFor="address2"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address 2
                </Label>
                <Input
                  id="address2"
                  {...register("address2")}
                  className="w-full border-gray-300 focus:ring-[#ff9f0d] focus:border-[#ff9f0d]"
                />
              </div>

              {/* Same as shipping checkbox */}
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sameAsShipping"
                    checked={isSameAsShipping}
                    onCheckedChange={(checked) =>
                      setIsSameAsShipping(!!checked)
                    }
                  />
                  <Label
                    htmlFor="sameAsShipping"
                    className="text-sm font-medium text-gray-700"
                  >
                    Billing address same as shipping
                  </Label>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full md:w-1/2 py-3 text-gray-700 hover:bg-gray-50"
                >
                  <Link href="/cart">
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Back to Cart
                  </Link>
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-1/2 py-3 bg-[#ff9f0d] hover:bg-[#e08c0b] text-white"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      Proceeding to Payment
                      <AnimatedEllipsis />
                    </span>
                  ) : (
                    <>
                      Proceed to Payment
                      <ChevronRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="w-full lg:w-1/3 bg-white p-4 md:p-8 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cart?.items.map((item) => (
                <motion.div
                  key={item._id}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    {imageLoading && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                    )}
                    <Image
                      src={urlFor(item.srcUrl).url()}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="rounded-lg object-cover"
                      onLoadingComplete={() => setImageLoading(false)}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-[#ff9f0d] font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Total */}
            <div className="mt-8 pt-4 border-t">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cart?.items
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$54.76</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span>
                    $
                    {cart
                      ? (
                          cart.items.reduce(
                            (sum, item) => sum + item.price * item.quantity,
                            0
                          ) + 54.76
                        ).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
