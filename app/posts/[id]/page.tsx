"use client";

import { Post } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  post?: Post; // ✅ optional
}

export default function PostDetailsClient({ post }: Props) {
  if (!post) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-lg">
        Failed to load post.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href="/posts"
        className="inline-flex items-center text-indigo-500 hover:text-indigo-700 font-medium mb-6 transition-all duration-300"
      >
        ← Back to Posts
      </Link>

      <motion.article
        className="bg-gradient-to-tr from-white via-indigo-50 to-indigo-100 rounded-3xl shadow-sm p-8 hover:shadow-3xl transition-shadow duration-500"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          {post.title}
        </h1>

        <p className="text-gray-700 leading-relaxed text-lg mb-8">{post.body}</p>

        <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 text-gray-600 text-sm">
          <p>
            <span className="font-semibold text-gray-800">Post ID:</span> {post.id}
          </p>
          <p>
            <span className="font-semibold text-gray-800">User ID:</span> {post.userId}
          </p>
        </div>
      </motion.article>
    </motion.div>
  );
}
