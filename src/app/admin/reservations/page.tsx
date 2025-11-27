"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Search,
  Eye,
  Check,
  X,
  Edit,
  Users,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import ReservationModal, {
  ReservationData,
} from "@/components/admin/ReservationModal";
import Toast from "@/components/Toast";
import { auth } from "@/firebase/firebase";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

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
  const [tempReservations, setTempReservations] =
    useState<Reservation[]>(mockReservations);

  const [open, setOpen] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState({
    confirm: false,
    action: "",
    id: "",
  });
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
      try {
        const res = await fetch("/api/admin/reservations", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data.reservations);

        if (data.reservations) {
          const FilterCancelData = data.reservations.filter(
            (reservation: Reservation) =>
              !["cancelled", "complete"].includes(reservation.status)
          );
          setReservations(FilterCancelData);
          setTempReservations(FilterCancelData);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    getReservations();
  }, []);

  // Updated: Dark Mode Status Colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-950/30 text-amber-500 border-amber-500/20 ring-1 ring-amber-500/20";
      case "approved":
        return "bg-emerald-950/30 text-emerald-500 border-emerald-500/20 ring-1 ring-emerald-500/20";
      case "cancelled":
        return "bg-red-950/30 text-red-500 border-red-500/20 ring-1 ring-red-500/20";
      default:
        return "bg-stone-800 text-stone-400 border-stone-700";
    }
  };

  // Handle Search Change
  const HandleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.length === 0) {
      setReservations(tempReservations);
    } else {
      const filteredSearchData = tempReservations.filter(
        (reservation) =>
          reservation.name?.toLowerCase().includes(searchTerm) ||
          reservation.email?.toLowerCase().includes(searchTerm)
      );
      setReservations(filteredSearchData);
    }
  };

  // Handle Status Change
  const HandleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const SelectTerm = e.target.value.toLowerCase();
    if (SelectTerm === "all") {
      setReservations(tempReservations);
    } else {
      const FilteredSelectData = tempReservations.filter(
        (reservation) => reservation.status === SelectTerm
      );
      setReservations(FilteredSelectData);
    }
  };

  // Handle Date Change
  const HandleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const SelectedDate = e.target.value;
    if (!SelectedDate) {
      setReservations(tempReservations);
      return;
    }
    const FilteredDateData = tempReservations.filter((reservation) => {
      const matchesDate =
        new Date(reservation.date).toISOString().split("T")[0] === SelectedDate;
      return matchesDate;
    });
    setReservations(FilteredDateData);
  };

  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
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
    if (!Data.success) {
      showToast("Failed to create reservation.", "error");
      return;
    }
    showToast("Reservation created successfully!", "success");
  };

  const handleDialogAction = async () => {
    console.log("Confirmed action");
    const response = await fetch(
      `/api/reservations/${confirmDialogOpen.id}/status`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          status:
            confirmDialogOpen.action === "confirm" ? "approved" : "cancelled",
        }),
      }
    );
    const Data = await response.json();
    if (Data.success) showToast("Reservation status updated!", "success");
    else showToast("Failed to update reservation.", "error");
  };

  return (
    <div
      className={`min-h-screen bg-stone-950 p-6 md:p-10 text-stone-200 ${manrope.className}`}
    >
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={open}
        onClose={handleClose}
        onSubmit={HandleSubmit}
      />

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={confirmDialogOpen.confirm}
        onClose={() =>
          setConfirmDialogOpen({ confirm: false, action: "", id: "" })
        }
        onConfirm={handleDialogAction}
      />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-2`}
          >
            Reservations
          </h1>
          <p className="text-stone-400 text-sm">
            Manage bookings, availability, and guest requests.
          </p>
        </div>
        <button
          className="bg-amber-600 text-white px-6 py-3 rounded-sm hover:bg-amber-500 transition-all duration-300 flex items-center gap-2 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-amber-500/20"
          onClick={() => setOpen(true)}
        >
          <Calendar className="w-4 h-4" />
          New Reservation
        </button>
      </div>

      {/* --- FILTERS --- */}
      <div className="bg-stone-900/50 border border-stone-800 rounded-sm p-6 mb-8 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative group md:col-span-2">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Search guest name or email..."
              onChange={HandleSearchChange}
              className="w-full bg-stone-950 border border-stone-800 text-white pl-12 pr-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-stone-600"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              onChange={HandleSelectChange}
              className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              onChange={HandleDateChange}
              className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm [color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-stone-950 border-b border-stone-800">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Guest Details
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Contact Info
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Date & Time
                </th>
                <th className="px-6 py-5 text-left text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                  Party Size
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
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-stone-800/50 transition-colors group"
                >
                  {/* Name & ID */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-bold text-white">
                        {reservation.name}
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono mt-1">
                        {reservation.id}
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-stone-300">
                      {reservation.email}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {reservation.phone}
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-stone-300">
                      <Calendar className="w-3 h-3 text-stone-500" />
                      {formatDate(reservation.date)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {reservation.time}
                    </div>
                  </td>

                  {/* Guests */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-amber-600 mr-2" />
                      <span className="text-sm font-medium text-white">
                        {reservation.guests}
                      </span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(
                        reservation.status
                      )}`}
                    >
                      {reservation.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                      {/* View Button */}
                      <button className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-all">
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Approve / Complete Actions */}
                      {(reservation.status === "pending" ||
                        reservation.status === "approved") && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => {
                                  setConfirmDialogOpen({
                                    confirm: true,
                                    action:
                                      reservation.status === "approved"
                                        ? "complete"
                                        : "confirm",
                                    id: reservation.id,
                                  });
                                }}
                                className="p-2 text-emerald-600 hover:text-emerald-400 hover:bg-emerald-950/30 rounded-full transition-all"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-stone-800 text-stone-200 border-stone-700">
                              <p>
                                {reservation.status === "approved"
                                  ? "Complete"
                                  : "Approve"}
                              </p>
                            </TooltipContent>
                          </Tooltip>

                          {/* Cancel Action */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => {
                                  setConfirmDialogOpen({
                                    confirm: true,
                                    action: "Cancel",
                                    id: reservation.id,
                                  });
                                }}
                                className="p-2 text-red-600 hover:text-red-400 hover:bg-red-950/30 rounded-full transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-stone-800 text-stone-200 border-stone-700">
                              <p>Cancel</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {/* Edit Button */}
                      <button className="p-2 text-stone-400 hover:text-amber-500 hover:bg-stone-800 rounded-full transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State Check */}
        {reservations.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-stone-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-800">
              <Search className="w-6 h-6 text-stone-600" />
            </div>
            <h3 className={`${playfair.className} text-xl text-white mb-2`}>
              No Reservations Found
            </h3>
            <p className="text-stone-500 text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
