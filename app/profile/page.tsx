"use client";

import Skeleton from "@/components/ui/Skeleton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <motion.div
      className="max-w-3xl mx-auto p-6 mt-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {session.user?.image ? (
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          >
            <Image
              src={session.user.image}
              alt="Profile"
              height={112}
              width={112}
              className="rounded-full border-4 border-indigo-500 shadow-lg"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 15, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          >
            <FaUserCircle className="w-28 h-28 text-indigo-500 drop-shadow-md" />
          </motion.div>
        )}

        <motion.h1
          className="text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {session.user?.name || "User"}
        </motion.h1>

        <motion.p
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {session.user?.email}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            Dashboard
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => signOut()}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
