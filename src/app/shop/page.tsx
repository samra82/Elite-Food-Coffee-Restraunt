'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import ProductListing from '@/components/ShopPages/ProductListing';
import Sidebar from '@/components/ShopPages/Sidebar';
import Hero from '@/components/ShopPages/ShopHero';
import { useAuth } from '@/lib/useAuth'; // Use authentication hook for user object

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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 8000 });
  const { user } = useAuth(); // Get the authenticated user

  // Fetch products from Sanity
  useEffect(() => {
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
  }, []);

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

  return (
    <div className="bg-grey-900">
      <Hero />
      <div className="bg-gray-50 min-h-screen py-8">
        {user ? (
          <h2 className="text-green-600 mb-4">Enjoy Your Meal</h2>
        ) : (
          <p className="text-red-600 mb-4">Please log in.</p>
        )}
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
