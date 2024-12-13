import React from 'react';
import Image from 'next/image';

const SimilarProducts: React.FC = () => {
  return (
    <div className="similar-products py-12">
      <h2 className="text-3xl font-semibold mb-8">Similar Products</h2>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Product Item */}
        <div className="product-item">
          < Image width={312} height={267} src="/assets/drinks.svg" alt="Fresh Lime" className="w-full h-48 object-cover" />
          <h3 className="mt-4 text-lg font-medium">Fresh Lime</h3>
          <p className="text-[#FF9F0D]">$38.00</p>
        </div>
        <div className="product-item">
          < Image width={312} height={267} src="/assets/food4.svg" alt="Chocolate Muffin" className="w-full h-48 object-cover" />
          <h3 className="mt-4 text-lg font-medium">Chocolate Muffin</h3>
          <p className="text-[#FF9F0D]">$28.00</p>
        </div>
        <div className="product-item">
          < Image width={312} height={267} src="/assets/food2.svg" alt="Burger" className="w-full h-48 object-cover" />
          <h3 className="mt-4 text-lg font-medium">Burger</h3>
          <p className="text-[#FF9F0D] ">$21.00</p>
        </div>
        <div className="product-item">
          < Image width={312} height={267} src="/assets/drinks.svg" alt="Fresh Lime" className="w-full h-48 object-cover" />
          <h3 className="mt-4 text-lg font-medium">Fresh Lime</h3>
          <p className="text-[#FF9F0D] ">$38.00</p>
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
