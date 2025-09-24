"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Search, Eye, Check, X, Edit, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import ReservationModal, {
  ReservationData,
} from "@/components/admin/ReservationModal";
import Toast from "@/components/Toast";
import { auth } from "@/firebase/firebase";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "approved" | "cancelled";
  specialRequests?: string;
}

const mockReservations: Reservation[] = [
  {
    id: "RES001",
    name: "John Smith",
    email: "john@email.com",
    phone: "(555) 123-4567",
    date: "2025-01-15",
    time: "7:30 PM",
    guests: 4,
    status: "pending",
    specialRequests: "Anniversary dinner",
  },
  {
    id: "RES002",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    phone: "(555) 987-6543",
    date: "2025-01-15",
    time: "8:00 PM",
    guests: 2,
    status: "approved",
  },
  {
    id: "RES003",
    name: "Mike Wilson",
    email: "mike@email.com",
    phone: "(555) 456-7890",
    date: "2025-01-15",
    time: "6:30 PM",
    guests: 6,
    status: "approved",
    specialRequests: "Vegetarian options needed",
  },
  {
    id: "RES004",
    name: "Emily Davis",
    email: "emily@email.com",
    phone: "(555) 321-0987",
    date: "2025-01-16",
    time: "7:00 PM",
    guests: 3,
    status: "cancelled",
  },
];

const Reservations: React.FC = () => {
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [open, setOpen] = React.useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    const getReservations = async () => {
      const res = await fetch("/api/admin/reservations", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data.reservations);
      setReservations(data.reservations);
    };
    getReservations();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const updateReservationStatus = (
    id: string,
    newStatus: "approved" | "cancelled"
  ) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  // Filtering Reservation
  const filteredReservations = reservations.filter((reservation) => {
    const name = reservation.name?.toLowerCase() || "";
    const email = reservation.email?.toLowerCase() || "";

    const matchesSearch =
      !searchTerm ||
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;

    // const matchesDate = !dateFilter || reservation.date === dateFilter;
    const matchesDate =
      !dateFilter ||
      new Date(reservation.date).toISOString().split("T")[0] === dateFilter;

    return (matchesSearch && matchesStatus) || matchesDate;
  });

  // const filteredReservations = reservations.filter((reservation) => {
  //   // const matchesSearch =
  //   //   reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //   reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     statusFilter === "all" || reservation.status === statusFilter;
  //   // const matchesDate = !dateFilter || reservation.date === dateFilter;

  //   return matchesStatus;
  // });

  // Date Formatter for Next.js error
  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return;
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const HandleSubmit = async (data: ReservationData) => {
    console.log(data);
    const response = await fetch("/api/admin/reservations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...data,
        userId: auth.currentUser?.uid,
      }),
    });
    const Data = await response.json();
    console.log(Data);
    if (!Data.success) {
      showToast("Failed to create reservation.", "error");
      return;
    }
    showToast("Reservation created successfully!", "success");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Modal  */}
      <ReservationModal
        isOpen={open}
        onClose={handleClose}
        onSubmit={HandleSubmit}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reservations</h1>
          <p className="text-gray-600 mt-1">
            Manage all restaurant reservations
          </p>
        </div>
        <button
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <Calendar className="w-4 h-4" />
          New Reservation
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guests
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
              {filteredReservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {reservation.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {reservation.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(reservation.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {reservation.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">
                        {reservation.guests}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {reservation.status.charAt(0).toUpperCase() +
                        reservation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      {reservation.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateReservationStatus(
                                reservation.id,
                                "approved"
                              )
                            }
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              updateReservationStatus(
                                reservation.id,
                                "cancelled"
                              )
                            }
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
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

export default Reservations;
