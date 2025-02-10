import { client } from "@/sanity/lib/client";
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-02-09",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Save user data to Sanity
export const saveUserToSanity = async (user: { name: string; email: string }) => {
  return await client.create({
    _type: "user",
    name: user.name,
    email: user.email,
  });
};

