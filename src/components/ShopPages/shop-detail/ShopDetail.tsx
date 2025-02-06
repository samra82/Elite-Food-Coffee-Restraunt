"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { RiYoutubeFill, RiInstagramFill } from "react-icons/ri";
import { SiVk } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface Product {
  name: string;
  slug: { current: string };
  category: string;
  price: number;
  originalPrice: number;
  tags: string[];
  image: { asset: { _ref: string } };
  description: string;
  available: boolean;
  rating?: number;
  reviews?: {
    reviewer: string;
    comment: string;
    rating: number;
    date: string;
  }[];
  relatedProducts?: {
    name: string;
    slug: { current: string };
    image: { asset: { _ref: string } };
  }[];
}

interface ShopdetailProps {
  product: Product;

  reviews?: {

    reviewer: string;

    comment: string;

    rating: number;

    date: string;

  }[];
}
const Shopdetail: React.FC<ShopdetailProps> = ({ product }) => {
  const [nextProduct, setNextProduct] = useState<Product | null>(null);
  const [prevProduct, setPrevProduct] = useState<Product | null>(null);

  React.useEffect(() => {
    const fetchNextPrevProducts = async () => {
      const query = `*[_type == "food"] | order(_createdAt asc) {
      name,
      slug,
      category,
      price,
      originalPrice,
      tags,
      image,
      description,
      available
       reviews[]
    }`;

      const products: Product[] = await client.fetch(query);

      const currentIndex = products.findIndex(
        (p) => p.slug.current === product.slug.current
      );

      if (currentIndex > 0) {
        setPrevProduct(products[currentIndex - 1]);
      }

      if (currentIndex < products.length - 1) {
        setNextProduct(products[currentIndex + 1]);
      }
    };

    fetchNextPrevProducts();
  }, [product.slug]);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage] = useState(product.image); // Track selected image
  const [isWishlisted, setIsWishlisted] = useState(false); // Track wishlist state
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      name: product.name,
      srcUrl: urlFor(selectedImage).url(), // Use the selected image
      price: product.price,
      attributes: [],
      discount: { amount: 0, percentage: 0 },
      quantity: quantity,
    };
    dispatch(addToCart(cartItem));
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted); // Toggle wishlist state
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
        break;
      case "vk":
        shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}`;
        break;
      case "youtube":
        shareUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(url)}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="bg-white">
      {/* Main content */}
      <div className="max-w-[1320px] mx-auto mt-[130px] flex flex-col md:flex-row gap-8 p-4">
        {/* Left side - Images */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
          {/* Small images (30% width) */}
          <div className="w-full md:w-1/3 flex flex-row md:flex-col gap-4">
            {product.relatedProducts?.map((relatedProduct, index) => (
              <Link
                key={index}
                href={`/shop/${relatedProduct.slug.current}`}
                className="cursor-pointer border-2 w-[132px] h-[100px] rounded-xl  hover:border-[#FF9F0D] transition-all justify-self-center self-center"
              >
                <Image
                  src={urlFor(relatedProduct.image).url()}
                  alt={`Related Product ${index + 1}`}
                  width={132}
                  height={100}
                  className="w-[132px] h-[100px] rounded-xl object-cover justify-self-center self-center  "
                />
              </Link>
            ))}
          </div>

          {/* Large image (70% width) */}
          <div className="w-full h-auto justify-self-center self-center rounded-xl border-4 hover:border-[#FF9F0D] transition-all">
            <Image
              src={urlFor(selectedImage).url()}
              alt="Large Image"
              width={520}
              height={450}
              className="w-[520px] h-[450px] rounded-xl"
            />
          </div>
        </div>

        {/* Right side - Details */}
        <div className="w-full  md:w-1/2 space-y-6">
          {/* In stock and navigation */}
          <div className="flex items-center justify-between">
            <span className="bg-[#FF9F0D] text-white px-4 py-1 rounded-full">
              {product.available ? "In stock" : "Out of stock"}
            </span>
            <div className="flex items-center gap-4">
              {prevProduct && (
                <Link
                  href={`/shop/${prevProduct.slug.current}`}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-6 h-6 cursor-pointer" />
                  <span>Prev</span>
                </Link>
              )}
              {nextProduct && (
                <Link
                  href={`/shop/${nextProduct.slug.current}`}
                  className="flex items-center gap-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-6 h-6 cursor-pointer" />
                </Link>
              )}
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-bold text-4xl">{product.name}</h1>

          {/* Paragraph */}
          <p className="text-lg text-gray-600">{product.description}</p>

          {/* Horizontal line */}
          <hr />

          {/* Price and rating */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-3xl">${product.price}</span>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex items-center text-[#FF9F0D]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < (product.rating || 0) ? "text-[#FF9F0D]" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span>{product.rating?.toFixed(1)} Rating</span>
              <span>|</span>
              <span> {product.reviews?.length .toFixed(1)} Review </span>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border rounded-lg p-2">
              <Button variant="ghost" onClick={handleDecrement}>
                -
              </Button>
              <span>{quantity}</span>
              <Button variant="ghost" onClick={handleIncrement}>
                +
              </Button>
            </div>
            <Button
              className="bg-[#FF9F0D] hover:bg-[#e68906] text-white px-6 py-2 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>

          {/* Horizontal line */}
          <hr />

          {/* Wishlist and Compare */}
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleWishlist}
            >
              <Heart
                className={`w-6 h-6 ${isWishlisted ? "text-red-500" : "text-gray-600"}`}
              />
              <span>Wishlist</span>
            </div>
            <span>|</span>
            <span className="cursor-pointer">Compare</span>
          </div>

          {/* Share Icons */}
          <div className="flex items-center gap-4">
            <span>Share:</span>
            <div className="flex gap-4">
              <MdFacebook
                className="w-6 h-6 text-gray-600 hover:text-[#FF9F0D] cursor-pointer"
                onClick={() => handleShare("facebook")}
              />
              <AiFillTwitterCircle
                className="w-6 h-6 text-gray-600 hover:text-[#FF9F0D] cursor-pointer"
                onClick={() => handleShare("twitter")}
              />
              <RiInstagramFill
                className="w-6 h-6 text-gray-600 hover:text-[#FF9F0D] cursor-pointer"
                onClick={() => handleShare("instagram")}
              />
              <SiVk
                className="w-6 h-6 text-gray-600 hover:text-[#FF9F0D] cursor-pointer"
                onClick={() => handleShare("vk")}
              />
              <RiYoutubeFill
                className="w-6 h-6 text-gray-600 hover:text-[#FF9F0D] cursor-pointer"
                onClick={() => handleShare("youtube")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shopdetail;
