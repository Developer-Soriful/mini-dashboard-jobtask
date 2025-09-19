"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaRegFileAlt, FaUsers } from "react-icons/fa";
import LoginButton from "../ui/LoginButton";

const menuItems = [
  { name: "Dashboard", href: "/", icon: <FaHome size={18} /> },
  { name: "Posts", href: "/posts", icon: <FaRegFileAlt size={18} /> },
  { name: "Users", href: "/users", icon: <FaUsers size={18} /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.aside
      animate={{ width: isOpen ? 220 : 70 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className="min-h-screen bg-gray-900 text-white flex flex-col shadow-lg"
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-gray-800"
        >
          {isOpen ? "⬅" : "➡"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 mt-4 flex-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {item.icon}
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-medium"
              >
                {item.name}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>

      {/* Auth Section */}
      <div className="p-4 mt-auto">{isOpen && <LoginButton />}</div>
    </motion.aside>
  );
}
