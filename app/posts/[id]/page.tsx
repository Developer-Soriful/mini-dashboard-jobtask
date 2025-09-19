"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";
import { motion, Variants } from "framer-motion";

// Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  hover: { scale: 1.02 },
};

// Custom fetch hook that handles null URLs
function usePostFetch(postId: string | null) {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when postId changes
    setData(null);
    setError(null);
    
    if (!postId) {
      setLoading(true);
      return;
    }

    setLoading(true);
    
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }
        
        const postData = await response.json();
        setData(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  return { data, loading, error };
}

export default function PostDetails({ params }: { params: Promise<{ id: string }> }) {
  const [postId, setPostId] = useState<string | null>(null);
  
  // Resolve the params promise
  useEffect(() => {
    let isMounted = true;
    
    async function resolveParams() {
      try {
        const resolved = await params;
        if (isMounted) {
          setPostId(resolved.id);
        }
      } catch (error) {
        console.error("Failed to resolve params:", error);
        if (isMounted) {
          setPostId(null);
        }
      }
    }
    
    resolveParams();
    
    return () => {
      isMounted = false;
    };
  }, [params]);

  const { data: post, loading, error } = usePostFetch(postId);

  if (loading) return <Skeleton count={1} />;

  if (error || !post)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link
          href="/posts"
          className="inline-flex items-center text-indigo-500 hover:text-indigo-700 font-medium mb-6 transition-all duration-300"
        >
          ← Back to Posts
        </Link>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-red-800 font-semibold text-lg mb-2">Failed to load post</h2>
          <p className="text-red-600 mb-4">{error || "Post not found"}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Back Link */}
      <Link
        href="/posts"
        className="inline-flex items-center text-indigo-500 hover:text-indigo-700 font-medium mb-6 transition-all duration-300"
      >
        ← Back to Posts
      </Link>

      {/* Post Card */}
      <motion.article
        className="bg-gradient-to-tr from-white via-indigo-50 to-indigo-100 rounded-3xl shadow-sm p-8 hover:shadow-3xl transition-shadow duration-500"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
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