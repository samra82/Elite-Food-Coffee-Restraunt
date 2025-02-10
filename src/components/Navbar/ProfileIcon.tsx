"use client";


import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/useAuth";
import { CgProfile } from "react-icons/cg";

export default function ProfileIcon() {
  const user = useAuth();

  if (!user) {
    return (
      <Link href="/Auth/login">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-lg">
          <CgProfile />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/profile">
      {user.user?.photoURL ? (
        <Image
          src={user.user.photoURL}
          alt="Profile"
          width={60}
          height={60}
          className="rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">
            {user.user?.displayName?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </Link>
  );
}