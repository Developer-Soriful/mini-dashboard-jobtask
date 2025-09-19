"use client";

import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types";
import Skeleton from "@/components/ui/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

export default function UsersPage() {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <Skeleton count={5} />;
  if (error)
    return (
      <div className="p-6 text-red-600 font-semibold">
        Failed to load users.
      </div>
    );

  return (
    <div className="p-6  max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">
        Users
      </h1>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                Company
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                className="cursor-pointer hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {user.company.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <HiX size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {selectedUser.name}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span>{" "}
                {selectedUser.email}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Username:</span>{" "}
                {selectedUser.username}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Phone:</span>{" "}
                {selectedUser.phone}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Company:</span>{" "}
                {selectedUser.company.name}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Website:</span>{" "}
                {selectedUser.website}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Address:</span>{" "}
                {`${selectedUser.address}, ${selectedUser.address.street}, ${selectedUser.address.city}`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
