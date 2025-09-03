"use client";

import React from "react";
import {
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dailyReservations = [
  { date: "01/10", reservations: 45 },
  { date: "01/11", reservations: 52 },
  { date: "01/12", reservations: 38 },
  { date: "01/13", reservations: 61 },
  { date: "01/14", reservations: 78 },
  { date: "01/15", reservations: 95 },
  { date: "01/16", reservations: 67 },
];

const monthlyRevenue = [
  { month: "Aug", revenue: 45000 },
  { month: "Sep", revenue: 52000 },
  { month: "Oct", revenue: 48000 },
  { month: "Nov", revenue: 61000 },
  { month: "Dec", revenue: 78000 },
  { month: "Jan", revenue: 85000 },
];

const customerData = [
  { name: "New Customers", value: 65, color: "#3b82f6" },
  { name: "Repeat Customers", value: 35, color: "#10b981" },
];

const Reports: React.FC = () => {
  //   const [reportType, setReportType] = useState('daily');

  const exportReport = (format: "csv" | "pdf") => {
    // Simulate export
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">
            Analytics and insights for your restaurant
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => exportReport("csv")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => exportReport("pdf")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$85,420</p>
              <p className="text-sm text-green-600 mt-1">
                +12% from last month
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Reservations
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">436</p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">89</p>
              <p className="text-sm text-green-600 mt-1">
                +23% from last month
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">4.8</p>
              <p className="text-sm text-green-600 mt-1">
                +0.2 from last month
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Reservations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Daily Reservations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyReservations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" />
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
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Monthly Revenue
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
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
      </div>

      {/* Customer Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Customer Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-md font-medium text-gray-700 mb-4">
              Repeat vs New Customers
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {customerData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
