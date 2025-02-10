"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";// Import the Sanity client
import { urlFor } from "@/sanity/lib/image";

// Define the Chef interface
interface Chef {
  name: string;
  position: string;
  experience: number;
  specialty: string;
  image: string; 
  description: string;
  available: boolean;
}

const ChefGrid = () => {
  const [chefs, setChefs] = useState<Chef[]>([]); // Explicitly type the state

  useEffect(() => {
    const fetchChefs = async () => {
      const query = `*[_type == "chef"]{
        name,
        position,
        experience,
        specialty,
        "image": image.asset->url,
        description,
        available
      }`;

      const chefsData: Chef[] = await client.fetch(query); // Explicitly type the fetched data
      setChefs(chefsData);
    };

    fetchChefs();
  }, []);

  return (
    <div className="p-6 mt-20">
      {" "}
      {/* Adding mt-20 for margin top */}
      {/* Grid with responsive columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {chefs.map((chef, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl ${
              index === 6
                ? "border-4 border-purple-600" // Complete purple border for the 7th box
                : "border-4 border-transparent hover:border-purple-600" // Hover effect for other boxes
            }`}
          >
            {/* Chef Image */}
            <div className="flex-1">
              <Image
                src={urlFor(chef.image).quality(80).url()}
                alt={chef.name}
                width={300}
                height={500}
                priority
                className="w-full h-auto object-cover rounded-t-lg"
              />
            </div>

            {/* Static Information Section Below Image */}
            <div className="p-4 text-center">
              <h3 className="text-gray-800 font-bold text-lg">{chef.name}</h3>
              <p className="text-gray-600">{chef.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChefGrid;