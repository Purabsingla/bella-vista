"use client";

import React, { useState } from "react";
import { Package, Clock, CheckCircle, Plus } from "lucide-react";

interface Order {
  id: string;
  dishName: string;
  quantity: number;
  price: number;
  status: "cooking" | "ready" | "served";
  customerName: string;
  table?: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    dishName: "Truffle Risotto",
    quantity: 2,
    price: 28,
    status: "cooking",
    customerName: "John Smith",
    table: 12,
  },
  {
    id: "ORD002",
    dishName: "Wagyu Beef Tenderloin",
    quantity: 1,
    price: 65,
    status: "ready",
    customerName: "Sarah Johnson",

    table: 8,
  },
  {
    id: "ORD003",
    dishName: "Pan-Seared Salmon",
    quantity: 3,
    price: 32,
    status: "served",
    customerName: "Mike Wilson",

    table: 5,
  },
  {
    id: "ORD004",
    dishName: "Lobster Thermidor",
    quantity: 1,
    price: 48,
    status: "cooking",
    customerName: "Emily Davis",

    table: 15,
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cooking":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ready":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "served":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "cooking":
        return <Clock className="w-4 h-4" />;
      case "ready":
        return <Package className="w-4 h-4" />;
      case "served":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (
    id: string,
    newStatus: "cooking" | "ready" | "served"
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(
    (order) => statusFilter === "all" || order.status === statusFilter
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage all restaurant orders and kitchen workflow
          </p>
        </div>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Dish
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cooking</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {orders.filter((o) => o.status === "cooking").length}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {orders.filter((o) => o.status === "ready").length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Served</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {orders.filter((o) => o.status === "served").length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Orders</option>
            <option value="cooking">Cooking</option>
            <option value="ready">Ready</option>
            <option value="served">Served</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity & Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.dishName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Order ID: {order.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        Table {order.table}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Qty: {order.quantity}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      ${order.price * order.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      {order.status === "cooking" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "ready")}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors text-xs"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "ready" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "served")}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors text-xs"
                        >
                          Mark Served
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
