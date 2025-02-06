import React from 'react';
import { client } from '@/sanity/lib/client';
import ShopDetails from '@/components/ShopPages/shop-detail/ShopDetail';
import Hero from '@/components/ShopPages/shop-detail/Hero2';
import DescriptionComponent from '@/components/ShopPages/shop-detail/ShopDescription';
import SimilarProducts from '@/components/ShopPages/shop-detail/SimilarProducts';

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
  rating?: number; // Add rating
  relatedProducts?: { // Correct type for relatedProducts
    name: string;
    slug: { current: string };
    image: { asset: { _ref: string } };
  }[];
  reviews?: {
    reviewer: string;
    comment: string;
    rating: number;
    date: string;
  }[];
}

export async function generateStaticParams() {
  const query = `*[_type == "food"]{ "slug": slug.current }`;
  const products: { slug: string }[] = await client.fetch(query);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "food" && slug.current == $slug][0]{
    name,
    slug,
    category,
    price,
    originalPrice,
    tags,
    image,
    description,
    available,
    rating,
    relatedProducts[]->{
      name,
      slug,
      image
    },
    reviews[]{
      reviewer,
      comment,
      rating,
      date
    }
  }`;

  const product: Product | null = await client.fetch(query, { slug: params.slug });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Hero />
      <ShopDetails product={product} reviews={product.reviews}  />
      <DescriptionComponent description={product.description} reviews={product.reviews} />
      <SimilarProducts product={product} />
    </>
  );
}