'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  name: string;
  slug: string; 
  category: string;
  price: number;
  originalPrice: number;
  tags: string[];
  image: string;
  description: string;
  available: boolean;
}

interface ProductListingProps {
  products: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
          <Link href={`/shop/${product.slug}`}> {/* Ensure href is a string */}
            <div className="relative h-48 w-full">
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF9F0D] text-xl font-bold">${product.price}</span>
                  <span className="text-gray-400 line-through">${product.originalPrice}</span>
                </div>
                <Button className="bg-[#FF9F0D] hover:bg-[#e68906]">
                  Add to Cart
                </Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;