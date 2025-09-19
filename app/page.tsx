"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Skeleton from "@/components/ui/Skeleton";

const data = [
  { day: "Mon", users: 240, revenue: 1200 },
  { day: "Tue", users: 320, revenue: 2100 },
  { day: "Wed", users: 180, revenue: 900 },
  { day: "Thu", users: 400, revenue: 2500 },
  { day: "Fri", users: 350, revenue: 2000 },
  { day: "Sat", users: 500, revenue: 3000 },
  { day: "Sun", users: 420, revenue: 2700 },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const stats = [
    {
      title: "Total Users",
      value: "2,456",
      color: "from-indigo-500 to-purple-500",
    },
    { title: "Revenue", value: "$12,402", color: "from-green-400 to-teal-500" },
    {
      title: "Conversion Rate",
      value: "4.2%",
      color: "from-pink-500 to-orange-400",
    },
  ];

  // fake loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Dashboard Overview
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white shadow-xl transform transition-transform hover:scale-105`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-3xl md:text-4xl font-bold mt-2">{stat.value}</p>
            <div className="mt-4 h-1 w-1/2 bg-white rounded-full opacity-50"></div>
          </motion.div>
        ))}
      </div>

      {/* Activity Overview Card */}
      <motion.div
        className="rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300
             bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Activity Overview
        </h2>

        <div className="h-64 md:h-72 p-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-inner border border-white/20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="4 4"
              />
              <XAxis dataKey="day" tick={{ fill: "#fff", fontWeight: 600 }} />
              <YAxis
                yAxisId="users"
                orientation="left"
                tick={{ fill: "#fff", fontWeight: 600 }}
              />
              <YAxis
                yAxisId="revenue"
                orientation="right"
                tick={{ fill: "#fff", fontWeight: 600 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                yAxisId="users"
                type="monotone"
                dataKey="users"
                stroke="url(#usersGradient)"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 7 }}
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="url(#revenueGradient)"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
                activeDot={{ r: 7 }}
              />
              <defs>
                <linearGradient id="usersGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
