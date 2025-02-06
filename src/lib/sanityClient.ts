import { client } from "@/sanity/lib/client";
import { createClient } from "next-sanity";

export const sanityClient = createClient({
  projectId: "bf5z2j64",
  dataset: "production", 
  apiVersion: "2025-01-31",
  useCdn: true,
});

interface UserData {
  name: string;
  email: string;
}

export const saveUserToSanity = async (userData: UserData) => {
  try {
    const response = await client.create({
      _type: "user", // Ensure this matches your Sanity schema
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString(),
    });
    return response;
  } catch (error) {
    console.error("Error saving user to Sanity:", error);
  }
};