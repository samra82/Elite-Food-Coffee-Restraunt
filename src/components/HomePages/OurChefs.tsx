import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const InterFont = Inter({ subsets: ["latin"] });
const VibeFont = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

interface Chef {
  name: string;
  position: string;
  experience: number;
  specialty: string;
  image: string; 
  description: string;
  available: boolean;
}

const query = `*[_type == "chef"] | order(_createdAt desc) [0...4] {
  name,
  position,
  experience,
  specialty,
  "image": image.asset->url,
  description,
  available
}`;

export default async function OurChefs() {
  const chefs = await client.fetch(query);

  return (
    <div className="bg-black min-h-screen w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className={`${VibeFont.className} text-5xl text-[#FF9F0D] font-bold mb-6`}>
            Chefs
          </h1>
          <div className="text-white text-lg sm:text-2xl flex gap-2 text-center">
            <span className="text-[#FF9F0D]">Me</span>et our Chef
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {chefs.map((chef: Chef, index: number) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg bg-gray-900 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-gray-800 hover:border-[#FF9F0D] group"
            >
              <div className="relative aspect-w-4 aspect-h-3">
                <Image
                  src={urlFor(chef.image).quality(80).url()}
                  alt={chef.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 p-4 text-white">
                  <h3 className={`${InterFont.className} text-lg font-bold text-[#FF9F0D]`}>
                    {chef.name}
                  </h3>
                  <p className="text-sm text-gray-300">{chef.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/chefs">
            <Button className={`${InterFont.className} px-8 py-3 rounded-full border-2 border-[#FF9F0D] text-white text-lg transition-all duration-300 hover:bg-[#FF9F0D] hover:text-black`}>
              See More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
