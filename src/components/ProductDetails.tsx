import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart, FaShoppingBag, FaShareAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaVk } from 'react-icons/fa';

const ProductDetails: React.FC = () => {
  return (
    <div className="product-details container mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="product-section grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Product Images */}
        <div className="product-images flex flex-col items-center md:items-start">
          <div className="product-thumbnail flex space-x-4 mb-4">
            <Image
              src="/assets/detail1.svg"
              alt="Product Thumbnail"
              width={132}
              height={129}
              className="w-24 h-24 object-cover cursor-pointer"
            />
            <Image
              src="/assets/detail2.svg"
              alt="Product Thumbnail"
              width={132}
              height={129}
              className="w-24 h-24 object-cover cursor-pointer"
            />
            <Image
              src="/assets/detail4.svg"
              alt="Product Thumbnail"
              width={132}
              height={129}
              className="w-24 h-24 object-cover cursor-pointer"
            />
          </div>
          <div className="product-main-image w-full md:w-[350px]">
            <Image
              src="/assets/product-detail-main.svg"
              alt="Main Product"
              width={491}
              height={596}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info flex flex-col space-y-6">
          <h1 className="text-3xl font-semibold">Yummy Chicken Chup</h1>
          <p className="text-xl text-gray-600">A delicious, crispy chicken delight for all food lovers!</p>

          {/* Product Price */}
          <p className="text-3xl text-[#FF9F0D]">$54.00</p>

          {/* Product Rating */}
          <div className="rating flex items-center space-x-2">
            <span>⭐⭐⭐⭐⭐</span>
            <span>(5.0 Rating, 24 Reviews)</span>
          </div>

          {/* Product Short Description */}
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus, magna in faucibus tincidunt,
            nisi elit tempor mi.
          </p>

          {/* Add to Cart Button */}
          <div className="flex items-center space-x-4">
            <input
              type="number"
              id="quantity"
              defaultValue={1}
              min={1}
              className="border p-2 w-16"
            />
            <button className="add-to-cart-button bg-[#FF9F0D] text-white px-8 py-3 rounded-lg text-lg hover:bg-red-600 flex items-center justify-center">
              <FaShoppingBag className="mr-2" />
              Add to Cart
            </button>
          </div>

          {/* Wishlist & Compare Icons */}
          <div className="flex items-center space-x-6 mt-4">
            <button className="text-gray-600 hover:text-[#FF9F0D] flex items-center">
            <FaHeart className="mr-2" />
              <span className="ml-2">Add to Wishlist</span>
            </button>
            <button className="text-gray-600 hover:text-[#FF9F0D] flex items-center">
              <FaShareAlt className="mr-2" />
              <span className="ml-2">Compare</span>
            </button>
          </div>

          {/* Category and Tag Section */}
          <div className="category-tags mt-4">
            <p className="text-sm text-gray-600"><strong>Category:</strong> Pizza</p>
            <p className="text-sm text-gray-600"><strong>Tag:</strong> Our Shop</p>
          </div>

          {/* Social Media Share Section */}
          <div className="social-media mt-6">
            <span className="font-medium text-gray-600">Share: </span>
            <div className="flex items-center space-x-3 mt-2">
              <Link href="#" className="social-icon bg-gray-600 text-white hover:bg-yellow-500 p-2 rounded-full">
                <FaYoutube size={28} />
              </Link>
              <Link href="#" className="social-icon bg-gray-600 text-white hover:bg-yellow-500 p-2 rounded-full">
                <FaFacebook size={28} />
              </Link>
              <Link href="#" className="social-icon bg-gray-600 text-white hover:bg-yellow-500 p-2 rounded-full">
                <FaTwitter size={28} />
              </Link>      
              <Link href="#" className="social-icon bg-gray-600 text-white hover:bg-yellow-500 p-2 rounded-full">
                <FaVk size={28} />
              </Link>
              <Link href="#" className="social-icon bg-gray-600 text-white hover:bg-yellow-500 p-2 rounded-full">
                <FaInstagram size={28} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Section (Scrollable) */}
      <div className="product-description mt-8">
        <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
        <div className="description-text max-h-[400px] overflow-y-auto">
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis arcu sit amet magna sollicitudin,
            a tincidunt sapien aliquet. Ut scelerisque ligula at dolor egestas scelerisque. Phasellus in venenatis
            urna. Sed lacinia metus ac dolor volutpat fermentum. Aliquam erat volutpat. Cras aliquam est id nulla
            cursus, id dictum lorem vehicula. Duis vitae leo ut lorem faucibus auctor nec at ante. Nulla eget eros
            sit amet velit vulputate maximus non eget felis.
          </p>
          <p className="text-gray-600 mt-4">
            Integer cursus sapien nec nibh laoreet, at eleifend ligula varius. Curabitur congue, mi vitae laoreet
            gravida, lorem arcu fermentum urna, eget vehicula risus sapien sit amet libero. Sed pharetra id dolor ac
            scelerisque. Curabitur condimentum condimentum massa non condimentum. Vivamus tempus et velit euismod
            maximus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
