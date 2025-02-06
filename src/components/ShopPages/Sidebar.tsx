'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

interface SidebarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onPriceFilter: (min: number, max: number) => void;
  products: Product[]; // Add products prop for search suggestions
}

const Sidebar: React.FC<SidebarProps> = ({ onSearch, onCategoryFilter, onPriceFilter, products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 8000 });

  const categories = [
    { id: 'sandwiches', label: 'Sandwiches' },
    { id: 'burger', label: 'Burger' },
    { id: 'chicken', label: 'Chicken Chup' },
    { id: 'drink', label: 'Drink' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'nonveg', label: 'Non Veg' },
    { id: 'uncategorized', label: 'Uncategorized' },
  ];

  // Handle search input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Show suggestions based on the query
    if (query) {
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if the query is empty
    }
  };

  // Handle search button click
  const handleSearch = () => {
    onSearch(searchQuery);
    setSuggestions([]); // Clear suggestions after search
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  // Handle price filter
  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange({ min, max });
    onPriceFilter(min, max);
  };

  return (
    <div className="w-full  space-y-8">
      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-sm relative">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleInputChange}
            className="flex-grow bg-gray-50"
          />
          <Button className="bg-[#FF9F0D] hover:bg-[#e68906] px-6" onClick={handleSearch}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 bg-white w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((product) => (
              <div
                key={product.slug}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSearchQuery(product.name);
                  setSuggestions([]);
                  onSearch(product.name); // Trigger search with the selected suggestion
                }}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="space-y-3">
          {categories.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-3">
              <Input
                type="checkbox"
                id={id}
                className="w-4 h-4 text-[#FF9F0D] rounded"
                onChange={() => handleCategoryFilter(id)}
              />
              <label htmlFor={id} className="text-gray-700 hover:text-[#FF9F0D] cursor-pointer">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Filter by Price</h2>
        <div className="space-y-4">
          <Input
            type="range"
            min="0"
            max="8000"
            value={priceRange.max}
            className="w-full"
            onChange={(e) => {
              const max = parseInt(e.target.value);
              setPriceRange({ min: 0, max });
            }}
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${priceRange.max}</span> {/* Display dynamic max price */}
          </div>
          <Button
            className="w-full bg-[#FF9F0D] hover:bg-[#e68906]"
            onClick={() => handlePriceFilter(0, priceRange.max)}
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;