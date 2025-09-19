"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Posts", href: "/posts" },
    { name: "Users", href: "/users" },
  ];

  const social = [
    { name: "Facebook", href: "#", icon: <FaFacebookF /> },
    { name: "Twitter", href: "#", icon: <FaTwitter /> },
    { name: "LinkedIn", href: "#", icon: <FaLinkedinIn /> },
    { name: "GitHub", href: "#", icon: <FaGithub /> },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300  transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
          {/* Project Info */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Zettabyte Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Building modern dashboards with Next.js & TailwindCSS
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-purple-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            {social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Zettabyte Dashboard. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
