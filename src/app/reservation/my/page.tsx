"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import { auth } from "@/firebase/firebase";

import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
} from "lucide-react";

interface Reservation {
  id: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  specialRequests?: string;
  tableNumber?: number;
  totalAmount?: number;
  createdAt: string;
}

const mockReservations: Reservation[] = [
  {
    id: "RES001",
    restaurantName: "Bella Vista",
    date: "2025-01-20",
    time: "7:30 PM",
    guests: 4,
    status: "confirmed",
    specialRequests: "Anniversary dinner, window table preferred",
    tableNumber: 12,
    totalAmount: 280,
    createdAt: "2025-01-15",
  },
  {
    id: "RES002",
    restaurantName: "Bella Vista",
    date: "2025-01-18",
    time: "8:00 PM",
    guests: 2,
    status: "completed",
    tableNumber: 8,
    totalAmount: 150,
    createdAt: "2025-01-10",
  },
  {
    id: "RES003",
    restaurantName: "Bella Vista",
    date: "2025-01-25",
    time: "6:30 PM",
    guests: 6,
    status: "pending",
    specialRequests: "Birthday celebration, need high chair for toddler",
    createdAt: "2025-01-14",
  },
  {
    id: "RES004",
    restaurantName: "Bella Vista",
    date: "2025-01-12",
    time: "7:00 PM",
    guests: 3,
    status: "cancelled",
    totalAmount: 0,
    createdAt: "2025-01-08",
  },
  {
    id: "RES005",
    restaurantName: "Bella Vista",
    date: "2025-01-30",
    time: "8:30 PM",
    guests: 2,
    status: "confirmed",
    specialRequests: "Vegetarian menu preferred",
    tableNumber: 15,
    createdAt: "2025-01-16",
  },
];

const MyReservations: React.FC = () => {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!auth.currentUser?.uid) {
      router.push("/auth?from=/my-reservations");
      return;
    }

    // Simulate API call
    const loadReservations = async () => {
      console.log("Loading reservations for user:", auth.currentUser?.uid);

      //Load Reservations from API
      const response = await fetch(
        "/api/reservations?userId=" + auth.currentUser?.uid
      );
      const data = await response.json();
      console.log("Fetched reservations:", data);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setReservations(mockReservations);
    };

    loadReservations();
  }, [auth.currentUser?.uid, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: "cancelled" as const } : res
      )
    );
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    return reservation.status === filter;
  });

  const upcomingReservations = reservations.filter(
    (res) => new Date(res.date) >= new Date() && res.status === "confirmed"
  ).length;

  const completedReservations = reservations.filter(
    (res) => res.status === "completed"
  ).length;

  //   if (loading) {
  //     return <Loader fullScreen text="Loading your reservations..." />;
  //   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-400/25 to-purple-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-pink-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000" />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <SplitText
          text="My Reservations"
          className="text-5xl md:text-6xl font-bold text-white mb-4"
          delay={70}
          duration={0.2}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="0px 0px -20% 0px"
        />
        <FadeContent delay={500}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track and manage all your dining reservations at Bella Vista
          </p>
        </FadeContent>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <FadeContent delay={0}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {upcomingReservations}
              </h3>
              <p className="text-gray-300">Upcoming Reservations</p>
            </div>
          </FadeContent>

          <FadeContent delay={200}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {completedReservations}
              </h3>
              <p className="text-gray-300">Completed Visits</p>
            </div>
          </FadeContent>

          <FadeContent delay={400}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {reservations.length}
              </h3>
              <p className="text-gray-300">Total Reservations</p>
            </div>
          </FadeContent>
        </div>

        {/* Filter Tabs */}
        <FadeContent delay={600}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {["all", "confirmed", "pending", "completed", "cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`interactive px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      filter === status
                        ? "bg-amber-600 text-white"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="ml-2 text-sm">
                      (
                      {status === "all"
                        ? reservations.length
                        : reservations.filter((r) => r.status === status)
                            .length}
                      )
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </FadeContent>

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <FadeContent delay={800}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                No Reservations Found
              </h3>
              <p className="text-gray-300 mb-6">
                {filter === "all"
                  ? "You haven't made any reservations yet."
                  : `No ${filter} reservations found.`}
              </p>
              <button
                onClick={() => router.push("/reservation")}
                className="interactive bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors"
              >
                Make a Reservation
              </button>
            </div>
          </FadeContent>
        ) : (
          <div className="space-y-6">
            {filteredReservations.map((reservation, index) => (
              <FadeContent key={reservation.id} delay={800 + index * 100}>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Reservation Details */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {reservation.restaurantName}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          {getStatusIcon(reservation.status)}
                          {reservation.status.charAt(0).toUpperCase() +
                            reservation.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300">
                          <Calendar className="w-5 h-5 text-amber-400" />
                          <span>
                            {new Date(reservation.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Clock className="w-5 h-5 text-amber-400" />
                          <span>{reservation.time}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Users className="w-5 h-5 text-amber-400" />
                          <span>
                            {reservation.guests}{" "}
                            {reservation.guests === 1 ? "Guest" : "Guests"}
                          </span>
                        </div>

                        {reservation.tableNumber && (
                          <div className="flex items-center gap-3 text-gray-300">
                            <MapPin className="w-5 h-5 text-amber-400" />
                            <span>Table {reservation.tableNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <h4 className="text-white font-semibold mb-2">
                        Special Requests
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {reservation.specialRequests || "No special requests"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <div className="text-sm text-gray-400 mb-2">
                        Booked on{" "}
                        {new Date(reservation.createdAt).toLocaleDateString()}
                      </div>

                      <div className="space-y-2">
                        {reservation.status === "confirmed" &&
                          new Date(reservation.date) > new Date() && (
                            <>
                              <button className="interactive w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                                <Edit className="w-4 h-4" />
                                Modify
                              </button>
                              <button
                                onClick={() =>
                                  cancelReservation(reservation.id)
                                }
                                className="interactive w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Cancel
                              </button>
                            </>
                          )}

                        {reservation.status === "completed" && (
                          <button className="interactive w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-500 transition-colors">
                            Book Again
                          </button>
                        )}

                        <button className="interactive w-full bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeContent>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <FadeContent delay={1200}>
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/reservation")}
              className="interactive bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Make New Reservation
            </button>
          </div>
        </FadeContent>
      </div>
    </div>
  );
};

export default MyReservations;
