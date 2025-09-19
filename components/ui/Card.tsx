"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  body: string;
  href: string;
}

export default function Card({ title, body, href }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer"
    >
      <Link href={href} className="flex flex-col h-full">
        <div className="p-6 flex-1">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{body}</p>
        </div>
        <div className="px-6 py-3 bg-gradient-to-r from-indigo-50 to-indigo-100 border-t border-gray-200 transition-colors duration-200">
          <span className="text-indigo-600 text-sm font-medium hover:underline">
            Read more →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
