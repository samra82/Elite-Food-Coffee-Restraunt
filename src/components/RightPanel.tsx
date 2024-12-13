import React from "react";
import Image from "next/image";
import {
  FaSearch,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaVk,
} from "react-icons/fa";

interface RightPanelProps {
  authorRating?: number; 
}

const RightPanel: React.FC<RightPanelProps> = ({ authorRating }) => {
  const renderStars = () => {
    if (authorRating === undefined) {
      return <span>No rating available</span>; // Agar rating nahi di gayi hai to yeh show karega
    }

    const fullStars = Math.floor(authorRating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <aside className=" p-4">
      {/* Search Bar */}
      <div className="mb-8">
        <form className="relative">
          <input
            type="text"
            aria-label="Search"
            placeholder="Search Your Keyword..."
            className="w-full p-3 pl-10 border rounded-md text-gray-800 focus:outline-none"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-500" />
        </form>
      </div>

      {/* Author Info */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <Image
          src="/assets/profile.svg"
          alt="Profile picture of Prince Miyako"
          className="rounded-full w-24 h-24 mx-auto mb-4"
          width={96}
          height={96}
        />
        <h3 className="text-center text-lg font-semibold">Prince Miyako</h3>
        <p className="text-center text-gray-600">Blogger / Photographer</p>
        <p className="text-center text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex justify-center">
          <div className="text-yellow-500">{renderStars()}</div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h4 className="text-lg font-semibold mb-4">Recent Posts</h4>
        <div className="space-y-4">
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog1.svg"
              alt="Thumbnail of recent post about topic 1"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
              <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet.</p>
              <p className="text-xs text-gray-500">June 22, 2020</p>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog2.svg"
              alt="Thumbnail of recent post about topic 1"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
              <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet.</p>
              <p className="text-xs text-gray-500">June 22, 2020</p>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog3.svg"
              alt="Thumbnail of recent post about topic 1"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
              <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet.</p>
              <p className="text-xs text-gray-500">June 22, 2020</p>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog4.svg"
              alt="Thumbnail of recent post about topic 2"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
              <p className="text-sm text-gray-800">Lorem ipsum dolor sit amet.</p>
              <p className="text-xs text-gray-500">June 22, 2020</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter By Menu */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h4 className="text-lg font-semibold mb-4">Filter By Menu</h4>
        <div className="space-y-4">
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog1.svg"
              alt="Thumbnail of recent post about topic 1"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
            <li className="flex justify-between gap-14">
            <span>Chicken Fry</span>
            <span>26</span>
          </li>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog2.svg"
              alt="Thumbnail of recent post about topic 1"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
            <li className="flex justify-between gap-14">
            <span>Burger Food</span>
            <span>46</span>
          </li>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog3.svg"
              alt="Thumbnail of recent post about topic 1"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
            <li className="flex justify-between gap-14">
            <span>Pizza</span>
            <span>36</span>
          </li>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog4.svg"
              alt="Thumbnail of recent post about topic 2"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
            <li className="flex justify-between gap-14">
            <span>Pizza</span>
            <span>36</span>
          </li>
            </div>
          </div>
          <div className="flex items-center hover:bg-gray-100 p-2 rounded">
            <Image
              src="/assets/blog4.svg"
              alt="Thumbnail of recent post about topic 2"
              className="w-24 h-24 mr-4 rounded-md"
              width={99}
              height={300}
            />
            <div>
            <li className="flex justify-between gap-14">
            <span>Pizza</span>
            <span>36</span>
          </li>
            </div>
          </div>
         
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h4 className="text-lg font-semibold mb-4">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition">
            Sandwich
          </button>
          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition">
            Pizza
          </button>
          <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition">
            Burger
          </button>
        </div>
      </div>

      {/* Social Icons */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h4 className="text-lg font-semibold mb-4">Share:</h4>
        <div className="flex gap-4">
          <div
            className="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-800 transition"
            aria-label="Share on YouTube"
          >
            <FaYoutube />
          </div>
          <div
            className="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-800 transition"
            aria-label="Share on Facebook"
          >
            <FaFacebook />
          </div>
          <div
            className="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-800 transition"
            aria-label="Share on Twitter"
          >
            <FaTwitter />
          </div>
          <div
            className="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-800 transition"
            aria-label="Share on VK"
          >
            <FaVk />
          </div>
          <div
            className="bg-gray-600 p-2 rounded-full text-white hover:bg-gray-800 transition"
            aria-label="Share on Instagram"
          >
            <FaInstagram />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
