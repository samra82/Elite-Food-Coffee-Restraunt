'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import ProductListing from '@/components/ShopPages/ProductListing';
import Sidebar from '@/components/ShopPages/Sidebar';
import Hero from '@/components/ShopPages/ShopHero';
import { useRouter } from 'next/navigation';
import useAuth from "@/lib/useAuth";

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

export default function ShopPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add a loading state

  // Redirect to login/signup if the user is not authenticated
  useEffect(() => {
    if (!user) {
     <div>Loading .....</div> ;
    } else {
      setLoading(false); // Set loading to false once the user is authenticated
    }
  }, [user, router]);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 8000 });

  // Fetch products from Sanity
  useEffect(() => {
    if (!user) return; // Don't fetch products if the user is not authenticated

    const fetchProducts = async () => {
      const query = `*[_type == "food"]{
        name,
        "slug": slug.current,
        category,
        price,
        originalPrice,
        tags,
        image,
        description,
        available
      }`;
      const products: Product[] = await client.fetch(query);
      setProducts(products);
      setFilteredProducts(products); // Initialize filtered products with all products
    };
    fetchProducts();
  }, [user]);

  // Apply all filters
  const applyFilters = (query: string, category: string, priceRange: { min: number; max: number }) => {
    let filtered = products;

    // Filter by search query
    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedCategory, priceRange);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchQuery, category, priceRange);
  };

  // Handle price filter
  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange({ min, max });
    applyFilters(searchQuery, selectedCategory, { min, max });
  };

  // Show a loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-grey-900">
      <Hero />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
          {/* Product Listing (Left Side) */}
          <div className="flex-grow">
            <ProductListing products={filteredProducts} />
          </div>

          {/* Sidebar (Right Side) */}
          <div className="w-full lg:w-1/4">
            <Sidebar
              onSearch={handleSearch}
              onCategoryFilter={handleCategoryFilter}
              onPriceFilter={handlePriceFilter}
              products={products} // Pass the products prop
            />
          </div>
        </div>
      </div>
    </div>
  );
}