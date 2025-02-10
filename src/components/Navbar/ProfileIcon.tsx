"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/useAuth";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FaUser, FaQuestionCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

export default function ProfileIcon() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <Link href="/Auth/logIn">
        <div className="text-white hover:text-[#FF9F0D] transition-colors" aria-label="Search">
          <CgProfile size={24} />
        </div>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="focus:outline-none"
      >
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            alt="Profile" 
            width={60}
            height={60}
            className="rounded-full cursor-pointer transition-all   "
          />
          

        ) : (
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
            <span className="text-white font-medium text-lg">
              {user.displayName?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute left-[-50px] mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 z-50">
          <Link
            href="/profile"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-[#FF9F0D] transition-colors"
          >
            <FaUser className="mr-3" />
            Profile
          </Link>
          <Link
            href="/FAQ"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-[#FF9F0D] transition-colors"
          >
            <FaQuestionCircle className="mr-3" />
            FAQ
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:text-[#FF9F0D] transition-colors"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}