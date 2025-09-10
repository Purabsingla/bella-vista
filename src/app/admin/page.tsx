"use client";

import React from "react";
import {
  Calendar,
  Users,
  TrendingUp,
  ChefHat,
  Star,
  ArrowUpIcon,
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&apos;s what&apos;s happening at Bella Vista
            today.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today&apos;s Reservations
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
              <div className="flex items-center mt-2">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">
                  +12% from yesterday
                </span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                This Week&apos;s Reservations
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">156</p>
              <div className="flex items-center mt-2">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">
                  +8% from last week
                </span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
              <div className="flex items-center mt-2">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">
                  +23% this month
                </span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Popular Dish</p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                Truffle Risotto
              </p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.9 rating</span>
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <ChefHat className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reservations Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Weekly Reservations
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Reservations</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="reservations"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Weekly Revenue
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue ($)</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-2 rounded-full">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                New reservation confirmed
              </p>
              <p className="text-sm text-gray-600">
                John Smith - Table for 4 at 7:30 PM
              </p>
            </div>
            <span className="text-sm text-gray-500">2 min ago</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <ChefHat className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Order completed</p>
              <p className="text-sm text-gray-600">
                Wagyu Beef Tenderloin - Table 12
              </p>
            </div>
            <span className="text-sm text-gray-500">5 min ago</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">New user registered</p>
              <p className="text-sm text-gray-600">
                Sarah Johnson joined Bella Vista
              </p>
            </div>
            <span className="text-sm text-gray-500">12 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
