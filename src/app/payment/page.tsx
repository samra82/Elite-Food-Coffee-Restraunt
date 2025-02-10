"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';
import Hero from './paymentHero';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  srcUrl: string;
}

const PaymentPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });
  const [userName, setUserName] = useState('');
  const [, setTxnRefNo] = useState('');

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    setProducts(savedProducts);
    const total = savedProducts.reduce((acc: number, p: Product) => acc + (p.price * p.quantity), 0);
    setTotalAmount(total);
    setTxnRefNo("T" + Date.now());
  }, []);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Hero />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <motion.div
          className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm order-2 lg:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
          <div className="space-y-5">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={urlFor(product.srcUrl).url()}
                      alt={product.name}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {product.quantity}
                    </p>
                    <p className="text-[#ff9f0d] font-semibold">
                      PKR {(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No products selected.</p>
            )}
          </div>

          <div className="mt-8 space-y-3 border-t pt-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>PKR {totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>PKR 54.76</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-800 pt-2">
              <span>Total</span>
              <span>PKR {(totalAmount + 54.76).toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Payment Form */}
        <motion.div
          className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl shadow-sm order-1 lg:order-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Payment Details</h2>
          <form onSubmit={handlePaymentSubmit} className="space-y-6 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] outline-none transition"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                required
                value={cardInfo.number}
                onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] outline-none transition"
                placeholder="4242 4242 4242 4242"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date (MM/YY)
                </label>
                <input
                  type="text"
                  required
                  value={cardInfo.expiry}
                  onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] outline-none transition"
                  placeholder="12/25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  required
                  value={cardInfo.cvv}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff9f0d] focus:border-[#ff9f0d] outline-none transition"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ff9f0d] hover:bg-[#e08c0b] text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    {/* Loading spinner SVG */}
                  </svg>
                  Processing...
                </span>
              ) : (
                "Confirm Payment"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;