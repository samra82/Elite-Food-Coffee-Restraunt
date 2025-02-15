"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  srcUrl: string;
}

interface Cart {
  items: CartItem[];
}

const PaymentPage: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  // Grab cart from Redux
  const cart = useSelector((state: RootState) => state.carts.cart) as Cart | null;

  // Payment form states
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // For handling loading and response messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Calculate cart totals
  const subtotal = cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = 0;    // or set your shipping cost
  const tax = 54.76;     // example tax
  const total = subtotal + shipping + tax;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Send total and chosen payment method to API
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: total, paymentMethod }),
      });

      const data = await res.json();
      if (res.ok) {
        // Redirect to success page
        router.push("/payment/success"); // Adjust the path as needed
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Use flex-col on mobile, flex-row on larger screens */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Payment Form Section */}
        <motion.div
          className="w-full md:w-2/3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Payment</CardTitle>
              <CardDescription>Select a payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Google Pay Button */}
                <Button
                  variant="outline"
                  className="bg-white text-black w-full py-3 border-gray-300 hover:bg-gray-100"
                  onClick={() => setPaymentMethod("google-pay")}
                  type="button"
                >
                  Google Pay
                </Button>

                {/* Credit Card Section */}
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      id="card"
                      name="paymentOption"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mr-2"
                    />
                    <label htmlFor="card" className="font-medium text-gray-700">
                      Pay with Card
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on card
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={nameOnCard}
                          onChange={(e) => setNameOnCard(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card number
                        </label>
                        <Input
                          type="text"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry date
                          </label>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Security code (CVV)
                          </label>
                          <Input
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Payment Button */}
                <Button
                  type="submit"
                  className="w-1/2 mt-4 bg-[#ff9f0d] hover:bg-[#e08c0b] text-white "
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </> 
                  ) : (
                    "Pay"
                  )}
                </Button>
              </form>
            </CardContent>

            {/* Success/Error Message */}
            {message && (
              <CardFooter className="flex justify-center">
                <p
                  className={`text-sm ${
                    message.includes("successful") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              </CardFooter>
            )}
          </Card>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
              <CardDescription>Review your items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart?.items.map((item) => (
                  <div key={item._id} className="flex items-start space-x-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={urlFor(item.srcUrl).url()}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;