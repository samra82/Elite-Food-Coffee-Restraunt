"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signUpWithGoogle } from "@/lib/firebase";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Hero from "./LoginHero";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);

      // Redirect to the shop page
      router.push("/shop");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signUpWithGoogle();

      // Redirect to the shop page
      router.push("/shop");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Hero />
      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md animate-fade-in">
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Login</h1>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9F0D] transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9F0D] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <Input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-[#FF9F0D] focus:ring-[#FF9F0D] border-gray-300 rounded"
              />
              <Label htmlFor="remember" className="ml-2 text-gray-600">
                Remember me?
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-[#FF9F0D] text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-all duration-300 ease-in-out transform"
            >
              Login
            </Button>
          </form>

          <div className="text-center mt-4">
            <Link href="#" className="text-sm text-[#FF9F0D] hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="space-y-4">
            {/* Login with Google */}
            <Button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Login with Google
            </Button>
          </div>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/Auth/signup" className="text-[#FF9F0D] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;