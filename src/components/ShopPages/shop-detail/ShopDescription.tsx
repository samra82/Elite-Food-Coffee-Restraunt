'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Review {
  reviewer: string;
  comment: string;
  rating: number;
  date: string;
}

interface DescriptionComponentProps {
  description: string;
  reviews?: Review[]; // Add reviews prop
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({ description, reviews }) => {
  const [activeTab, setActiveTab] = useState('description');

  const keyBenefits = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    'Suspendisse potenti. Morbi in ipsum sit amet pede facilisis laoreet.',
    'Maecenas fermentum consequat mi. Donec fermentum. Pellentesque ligula.',
    'Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede.',
  ];

  return (
    <div className="w-full bg-gray-50 py-12 mt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <Button
            onClick={() => setActiveTab('description')}
            className={`${
              activeTab === 'description'
                ? 'bg-[#FF9F0D] hover:bg-[#FF9F0D]/90'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } transition-colors duration-200 min-w-[165px] h-12 font-semibold rounded-lg`}
          >
            Description
          </Button>
          <Button
            onClick={() => setActiveTab('reviews')}
            className={`${
              activeTab === 'reviews'
                ? 'bg-[#FF9F0D] hover:bg-[#FF9F0D]/90'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } transition-colors duration-200 min-w-[165px] h-12 font-semibold rounded-lg`}
          >
            Reviews ({reviews?.length || 0})
          </Button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          {activeTab === 'description' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <p className="text-gray-600 leading-relaxed">{description}</p>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#FF9F0D]" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {reviews?.map((review, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">{review.reviewer}</h4>
                    <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-[#FF9F0D]' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptionComponent;