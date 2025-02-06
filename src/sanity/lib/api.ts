import { createClient } from 'next-sanity';

const client = createClient({
  projectId: 'bf5z2j64',
  dataset: 'production',
  apiVersion: '2025-02-04',
  useCdn: false,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]{
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
  const products = await client.fetch(query);
  return products;
};

export type Product = {
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  tags: string[];
  image: string;
  description: string;
  available: boolean;
};
