"use client";

import React, { useState } from "react";
import { Package, Clock, CheckCircle, Plus, Search } from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

interface Order {
  id: string;
  status: "cooking" | "ready" | "served";
  customerName: string;
  table?: number;
  items: { name: string; qty: number; price: number }[];
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "John Smith",
    table: 12,
    status: "cooking",
    items: [
      { name: "Truffle Risotto", qty: 2, price: 28 },
      { name: "Garlic Bread", qty: 1, price: 6 },
      { name: "Coke", qty: 2, price: 3 },
    ],
  },
  {
    id: "ORD002",
    customerName: "Sarah Johnson",
    table: 8,
    status: "ready",
    items: [{ name: "Wagyu Beef Tenderloin", qty: 1, price: 65 }],
  },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "cooking":
        return "bg-amber-950/30 text-amber-500 border-amber-500/20 ring-1 ring-amber-500/20";
      case "ready":
        return "bg-blue-950/30 text-blue-400 border-blue-500/20 ring-1 ring-blue-500/20";
      case "served":
        return "bg-emerald-950/30 text-emerald-500 border-emerald-500/20 ring-1 ring-emerald-500/20";
      default:
        return "bg-stone-800 text-stone-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "cooking":
        return <Clock className="w-3 h-3" />;
      case "ready":
        return <Package className="w-3 h-3" />;
      case "served":
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
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
    <div
      className={`p-6 md:p-10 space-y-8 text-stone-200 ${manrope.className}`}
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <h1
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-2`}
          >
            Orders
          </h1>
          <p className="text-stone-400 text-sm">
            Manage kitchen workflow and order status.
          </p>
        </div>
        <button className="bg-amber-600 text-white px-6 py-3 rounded-sm hover:bg-amber-500 transition-all duration-300 flex items-center gap-2 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-amber-500/20">
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cooking */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Cooking
              </p>
              <p className={`${playfair.className} text-3xl text-amber-500`}>
                {orders.filter((o) => o.status === "cooking").length}
              </p>
            </div>
            <div className="bg-amber-900/20 p-3 rounded-full border border-amber-500/20">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Ready */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Ready to Serve
              </p>
              <p className={`${playfair.className} text-3xl text-blue-400`}>
                {orders.filter((o) => o.status === "ready").length}
              </p>
            </div>
            <div className="bg-blue-900/20 p-3 rounded-full border border-blue-500/20">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Served */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-sm shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">
                Completed
              </p>
              <p className={`${playfair.className} text-3xl text-emerald-500`}>
                {orders.filter((o) => o.status === "served").length}
              </p>
            </div>
            <div className="bg-emerald-900/20 p-3 rounded-full border border-emerald-500/20">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-6 mb-8 backdrop-blur-md flex items-center justify-between">
        <div className="relative group w-full md:w-64">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
          <input
            type="text"
            placeholder="Search order ID..."
            className="w-full bg-stone-950 border border-stone-800 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-stone-600 text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm appearance-none cursor-pointer w-40"
        >
          <option value="all">All Orders</option>
          <option value="cooking">Cooking</option>
          <option value="ready">Ready</option>
          <option value="served">Served</option>
        </select>
      </div>

      {/* --- ORDERS TABLE --- */}
      <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-stone-950 border-b border-stone-800">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Order Details
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Summary
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-5 text-right text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-stone-800/50 transition-colors group"
                >
                  {/* Order Details */}
                  <td className="px-6 py-4 align-top">
                    <div className="text-xs font-mono text-stone-500 mb-2">
                      #{order.id}
                    </div>
                    <ul className="text-sm space-y-1">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center text-stone-300 w-48"
                        >
                          <span className="truncate pr-2">{item.name}</span>
                          <span className="text-stone-500 text-xs whitespace-nowrap">
                            x{item.qty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm font-bold text-white">
                      {order.customerName}
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      Table {order.table}
                    </div>
                  </td>

                  {/* Summary */}
                  <td className="px-6 py-4 align-top">
                    <div className="text-sm text-stone-300">
                      <span className="text-stone-500">Items:</span>{" "}
                      {order.items.reduce((sum, item) => sum + item.qty, 0)}
                    </div>
                    <div className="text-sm font-bold text-amber-500 mt-1">
                      $
                      {order.items.reduce(
                        (sum, item) => sum + item.price * item.qty,
                        0
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 align-top">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 align-top text-right">
                    <div className="flex items-center justify-end gap-2">
                      {order.status === "cooking" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "ready")}
                          className="px-3 py-1.5 bg-blue-900/20 text-blue-400 border border-blue-500/20 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-blue-900/40 transition-all"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "ready" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "served")}
                          className="px-3 py-1.5 bg-emerald-900/20 text-emerald-400 border border-emerald-500/20 rounded-sm text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-900/40 transition-all"
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
