'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

interface Product {
  name: string;
  slug: { current: string };
  category: string;
  price: number;
  originalPrice: number;
  tags: string[];
  image: { asset: { _ref: string } }; // Correct type for image
  description: string;
  available: boolean;
}

const SimilarProducts = ({ product }: { product: Product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  const scroll = (direction: string) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = direction === 'left' ? -312 : 312;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      const query = `*[_type == "food" && category == $category && slug.current != $slug]{
        name,
        slug,
        category,
        price,
        originalPrice,
        tags,
        image,
        description,
        available
      }`;

      const similarProducts: Product[] = await client.fetch(query, {
        category: product.category,
        slug: product.slug.current,
      });

      setSimilarProducts(similarProducts);
    };

    fetchSimilarProducts();
  }, [product.category, product.slug]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-bold">Similar Products</h3>
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            onClick={() => scroll('left')}
            className="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-full"
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => scroll('right')}
            className="p-2 bg-[#FF9F0D] hover:bg-[#e88f0c] transition-colors duration-200 rounded-full"
            size="icon"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {similarProducts.map((product) => (
          <Link
            key={product.slug.current}
            href={`/shop/${product.slug.current}`}
          >
            <div className="flex-shrink-0 w-[280px] md:w-[312px] snap-center group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={312}
                  height={267}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-center text-sm md:text-base font-medium">{product.name}</p>
                <p className="text-center text-lg md:text-xl font-bold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;