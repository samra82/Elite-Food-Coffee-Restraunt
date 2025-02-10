"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase";
import { saveUserToSanity } from "@/lib/sanityClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Hero from "./SignupHero";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signUpWithEmail(email, password);
      const user = userCredential.user;
      if (user.email) {
        await saveUserToSanity({ name, email: user.email });
      } else {
        setError("User email is null");
      }
      router.push("/shop");
    }
     catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
  };
}

  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      await saveUserToSanity({ name: user.displayName || "", email: user.email || "" });
      router.push("/shop");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
  };
  };

  return (
    <>
      <Hero />
      <div className="min-h-screen bg-white">
        <section className="py-16">
          <div className="container mx-auto max-w-md bg-white shadow-lg rounded-md p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Name</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded"
              >
                Sign Up
              </Button>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link href="/Auth/login" className="text-yellow-500 hover:text-blue-500">
                  Sign In
                </Link>
              </p>
            </form>
            <div className="text-center mt-8">
              <p>or</p>
              <Button
                onClick={handleGoogleSignUp}
                className="w-full bg-gray-100 border text-black py-2 rounded mt-2 flex items-center justify-center"
              >
                <FcGoogle
                  className="w-[20px] h-[20px] left-[16px] mr-2"
                />
                Sign up with Google
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}