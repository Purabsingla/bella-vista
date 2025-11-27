"use client";

import React from "react";
import {
  Calendar,
  Users,
  TrendingUp,
  ChefHat,
  Star,
  ArrowUpIcon,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const weeklyData = [
  { day: "Mon", reservations: 45, revenue: 2800 },
  { day: "Tue", reservations: 52, revenue: 3200 },
  { day: "Wed", reservations: 38, revenue: 2400 },
  { day: "Thu", reservations: 61, revenue: 3800 },
  { day: "Fri", reservations: 78, revenue: 4900 },
  { day: "Sat", reservations: 95, revenue: 6200 },
  { day: "Sun", reservations: 67, revenue: 4100 },
];

const Dashboard: React.FC = () => {
  return (
    <div
      className={`p-6 md:p-10 space-y-8 text-stone-200 ${manrope.className}`}
    >
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-white`}
          >
            Dashboard
          </h1>
          <p className="text-stone-400 mt-1 text-sm">
            Welcome back, Marco. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
            Today
          </p>
          <p className={`${playfair.className} text-xl text-amber-500`}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </header>

      {/* --- STATS CARDS --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg hover:border-amber-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
                Reservations
              </p>
              <p className={`${playfair.className} text-3xl text-white mt-1`}>
                24
              </p>
            </div>
            <div className="bg-blue-900/20 p-2 rounded-full border border-blue-500/20">
              <Calendar className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className="text-emerald-400 flex items-center gap-0.5">
              <ArrowUpIcon className="w-3 h-3" /> 12%
            </span>
            <span className="text-stone-500">vs yesterday</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg hover:border-amber-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
                Weekly Total
              </p>
              <p className={`${playfair.className} text-3xl text-white mt-1`}>
                156
              </p>
            </div>
            <div className="bg-emerald-900/20 p-2 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className="text-emerald-400 flex items-center gap-0.5">
              <ArrowUpIcon className="w-3 h-3" /> 8%
            </span>
            <span className="text-stone-500">vs last week</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg hover:border-amber-500/30 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
                Active Members
              </p>
              <p className={`${playfair.className} text-3xl text-white mt-1`}>
                1,247
              </p>
            </div>
            <div className="bg-purple-900/20 p-2 rounded-full border border-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className="text-emerald-400 flex items-center gap-0.5">
              <ArrowUpIcon className="w-3 h-3" /> 23%
            </span>
            <span className="text-stone-500">vs last month</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg hover:border-amber-500/30 transition-colors relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">
                Top Dish
              </p>
              <p
                className={`${playfair.className} text-xl text-white mt-1 truncate`}
              >
                Truffle Risotto
              </p>
            </div>
            <div className="bg-amber-900/20 p-2 rounded-full border border-amber-500/20">
              <ChefHat className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 relative z-10">
            <div className="flex text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs text-stone-400 font-bold">4.9</span>
          </div>
        </div>
      </section>

      {/* --- CHARTS SECTION --- */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Reservations */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3
              className={`${playfair.className} text-xl font-bold text-white`}
            >
              Weekly Reservations
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-stone-950 rounded-full border border-stone-800">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                Bookings
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292524"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#57534e"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#57534e"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c0a09",
                    borderColor: "#292524",
                    borderRadius: "4px",
                    color: "#f5f5f4",
                    fontSize: "12px",
                  }}
                  cursor={{ stroke: "#44403c", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="reservations"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{
                    fill: "#0c0a09",
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "#3b82f6",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Revenue */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3
              className={`${playfair.className} text-xl font-bold text-white`}
            >
              Weekly Revenue
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-stone-950 rounded-full border border-stone-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                USD ($)
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#292524"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke="#57534e"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#57534e"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "#1c1917" }}
                  contentStyle={{
                    backgroundColor: "#0c0a09",
                    borderColor: "#292524",
                    borderRadius: "4px",
                    color: "#f5f5f4",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#10b981"
                  radius={[2, 2, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* --- RECENT ACTIVITY --- */}
      <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
        <h3
          className={`${playfair.className} text-xl font-bold text-white mb-6`}
        >
          Recent Activity
        </h3>

        <div className="space-y-1">
          {/* Activity Item 1 */}
          <div className="flex items-start gap-4 p-4 hover:bg-stone-950/50 rounded-sm transition-colors border-b border-stone-800/50 last:border-0">
            <div className="bg-blue-900/20 p-2 rounded-full border border-blue-500/20 mt-1">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-stone-200">
                  Reservation Confirmed
                </p>
                <span className="text-[10px] text-stone-500 uppercase tracking-wide font-medium">
                  2 min ago
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                John Smith - Table for 4{" "}
                <span className="text-stone-600 mx-1">•</span> 7:30 PM
              </p>
            </div>
          </div>

          {/* Activity Item 2 */}
          <div className="flex items-start gap-4 p-4 hover:bg-stone-950/50 rounded-sm transition-colors border-b border-stone-800/50 last:border-0">
            <div className="bg-amber-900/20 p-2 rounded-full border border-amber-500/20 mt-1">
              <ChefHat className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-stone-200">
                  Order Completed
                </p>
                <span className="text-[10px] text-stone-500 uppercase tracking-wide font-medium">
                  5 min ago
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Wagyu Beef Tenderloin{" "}
                <span className="text-stone-600 mx-1">•</span> Table 12
              </p>
            </div>
          </div>

          {/* Activity Item 3 */}
          <div className="flex items-start gap-4 p-4 hover:bg-stone-950/50 rounded-sm transition-colors border-b border-stone-800/50 last:border-0">
            <div className="bg-purple-900/20 p-2 rounded-full border border-purple-500/20 mt-1">
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-sm font-bold text-stone-200">New Member</p>
                <span className="text-[10px] text-stone-500 uppercase tracking-wide font-medium">
                  12 min ago
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Sarah Johnson joined the rewards program
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
