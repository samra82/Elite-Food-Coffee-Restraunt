"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react"; // Icon for success message

const OrderSuccessPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 to-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg text-center">
        <div className="flex flex-col items-center justify-center">
          <CheckCircle className="text-[#ff9f0d] w-16 h-16 mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Order Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase! Your order has been placed successfully.
          </p>
          <div className="space-y-4 w-full ">
            <Link href="/shop">
              <Button className="w-full h-auto bg-[#ff9f0d] hover:bg-[#e08c0b] text-white py-3 text-lg rounded-md transition-all">
                Continue Shopping
              </Button>
            </Link>
         <div className="h-3"></div>
            <Link href="/">
              <Button className="w-full h-auto bg-gray-700 hover:bg-gray-800 text-white py-3 text-lg rounded-md transition-all">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
