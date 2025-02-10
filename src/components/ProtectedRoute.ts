// components/ProtectedRoute.tsx
"use client";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/Auth/login");
    }
  }, [user, router]);

  return user ? children : null;
}