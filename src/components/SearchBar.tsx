'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product } from '@/sanity/lib/api';

interface SearchBarProps {
  onSearch: (query: string) => void;
  products: Product[]; // Pass the products for suggestions
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);

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

  const handleSearch = () => {
    onSearch(searchQuery);
    setSuggestions([]); // Clear suggestions after search
  };

  return (
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
              }}
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;