"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Post } from "@/types";
import Skeleton from "@/components/ui/Skeleton";
import PostsList from "@/components/posts/PostsList";

export default function PostsPage() {
  const [endpoint, setEndpoint] = useState(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const { data, loading, error } = useFetch<Post[]>(endpoint);
  const [showAll, setShowAll] = useState(false);

  const triggerIntentionalError = () => {
    setEndpoint("https://jsonplaceholder.typicode.com/invalid");
    setTimeout(() => {
      setEndpoint("https://jsonplaceholder.typicode.com/posts");
    }, 3000);
  };

  if (loading) return <Skeleton count={10} />;
  if (error)
    return (
      <div className="p-6 text-center">
        <p className="text-red-600 font-semibold mb-4">
          Failed to load posts. Please try again.
        </p>
        <button
          onClick={triggerIntentionalError}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Retry
        </button>
      </div>
    );

  const displayedPosts = showAll ? data || [] : (data || []).slice(0, 12);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">All Posts</h1>
        <button
          onClick={triggerIntentionalError}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition duration-200"
        >
          Test Error Handling
        </button>
      </div>

      {/* Posts Grid using PostsList */}
      <PostsList posts={displayedPosts} />

      {/* See All Button */}
      {!showAll && data && data.length > 12 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition duration-200"
          >
            See All Posts
          </button>
        </div>
      )}
    </div>
  );
}
