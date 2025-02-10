"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Hero from "./LoginHero";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      router.push("/shop");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/shop");
    }  catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Hero />
      <div className="min-h-screen bg-white">
        <section className="py-16">
          <div className="container mx-auto max-w-md bg-white shadow-lg rounded-md p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
            <form onSubmit={handleLogin}>
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
                Login
              </Button>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
                <Link href="/Auth/signup" className="text-yellow-500 hover:text-blue-500">
                  Sign Up
                </Link>
              </p>
            </form>
            <div className="text-center mt-8">
              <p>or</p>
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-gray-100 border text-black py-2 rounded mt-2 flex items-center justify-center"
              >
               <FcGoogle
                  className="w-[20px] h-[20px] left-[16px] mr-2"
                />
                Login with Google
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}