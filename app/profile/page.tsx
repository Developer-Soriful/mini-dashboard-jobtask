"use client";
import Skeleton from "@/components/ui/Skeleton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Skeleton />;
  }

  if (!session) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-gradient-to-br from-gray-50 via-gray-100 to-white rounded-3xl shadow-xl">
      <div className="flex flex-col items-center gap-4">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            height={112}
            width={112}
            className="rounded-full border-4 border-indigo-500"
          />
        ) : (
          <FaUserCircle className="w-28 h-28 text-indigo-400" />
        )}

        <h1 className="text-3xl font-bold text-gray-900">
          {session.user?.name || "User"}
        </h1>
        <p className="text-gray-600">{session.user?.email}</p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all"
          >
            Dashboard
          </button>
          <button
            onClick={() => signOut()}
            className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
