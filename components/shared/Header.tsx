"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Users", href: "/users" },
  ];

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          Zettabyte Dashboard
        </h2>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <ul className="flex flex-col px-6 py-4 space-y-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
