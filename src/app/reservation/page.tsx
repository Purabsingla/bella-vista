"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText";
import FadeContent from "@/components/FadeContent";
import { Calendar, Clock, Users, Phone, Mail, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

const timeSlots = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

const partySizes = [
  { value: "1", label: "1 Guest" },
  { value: "2", label: "2 Guests" },
  { value: "3", label: "3 Guests" },
  { value: "4", label: "4 Guests" },
  { value: "5", label: "5 Guests" },
  { value: "6", label: "6 Guests" },
  { value: "7", label: "7 Guests" },
  { value: "8", label: "8 Guests" },
  { value: "9+", label: "9+ Guests (Call us)" },
];

type Reservation = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests: string;
};

const today = new Date().toISOString().split("T")[0];

const Reservation: React.FC = () => {
  const { register, handleSubmit, reset, watch } = useForm<Reservation>({
    defaultValues: {
      date: today,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (Data: Reservation) => {
    setIsSubmitting(true);
    console.log(Data);
    // Simulate reservation submission
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success message
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 flex items-center justify-center px-4">
        <FadeContent>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Reservation Confirmed!
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Thank you, {watch("name")}! Your table for {watch("guests")}{" "}
              {parseInt(watch("guests")) === 1 ? "guest" : "guests"} on{" "}
              {new Date(watch("date")).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {watch("time")} has been confirmed.
            </p>
            <div className="bg-amber-600/20 border border-amber-600/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">
                Reservation Details
              </h3>
              <div className="text-gray-300 space-y-2">
                <p>
                  <strong>Name:</strong> {watch("name")}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(watch("date")).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {watch("time")}
                </p>
                <p>
                  <strong>Party Size:</strong> {watch("guests")}{" "}
                  {parseInt(watch("guests")) === 1 ? "guest" : "guests"}
                </p>
                <p>
                  <strong>Contact:</strong> {watch("email")}
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              A confirmation email has been sent to {watch("email")}. If you
              need to make any changes, please call us at (555) 123-4567.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="interactive bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105"
            >
              Make Another Reservation
            </button>
          </div>
        </FadeContent>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 relative overflow-hidden">
      {/* Elegant Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20" />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/25 to-teal-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-teal-400/25 to-emerald-400/25 rounded-full mix-blend-multiply filter blur-2xl animate-pulse animation-delay-4000" />
      </div>

      {/* Dotted Pattern Overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <SplitText className="text-5xl md:text-6xl font-bold text-white mb-4">
          Make a Reservation
        </SplitText>
        <FadeContent delay={500}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Reserve your table at Bella Vista and experience an unforgettable
            dining journey
          </p>
        </FadeContent>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Reservation Info */}
          <div className="lg:col-span-1">
            <FadeContent direction="left">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Reservation Info
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-white font-medium">Available Days</p>
                      <p className="text-gray-300 text-sm">Tuesday - Sunday</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-white font-medium">Dinner Hours</p>
                      <p className="text-gray-300 text-sm">
                        5:00 PM - 10:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-amber-400" />
                    <div>
                      <p className="text-white font-medium">Party Size</p>
                      <p className="text-gray-300 text-sm">
                        Up to 8 guests online
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <h4 className="text-white font-semibold mb-2">Need Help?</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-400" />
                      <a
                        href="tel:+15551234567"
                        className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-400" />
                      <a
                        href="mailto:reservations@bellavista.com"
                        className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                      >
                        reservations@bellavista.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-600/20 border border-amber-600/50 rounded-lg p-4">
                  <p className="text-amber-300 text-sm">
                    <strong>Note:</strong> For parties of 9 or more, please call
                    us directly. Reservations are held for 15 minutes past the
                    reserved time.
                  </p>
                </div>
              </div>
            </FadeContent>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <FadeContent direction="right">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8">
                  Reserve Your Table
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-white font-medium mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        {...register("name", { required: true })}
                        id="name"
                        className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-white font-medium mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        {...register("email", { required: true })}
                        id="email"
                        className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-white font-medium mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      id="phone"
                      className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Reservation Details */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label
                        htmlFor="date"
                        className="block text-white font-medium mb-2"
                      >
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        {...register("date", { required: true })}
                        min={today}
                        className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="block text-white font-medium mb-2"
                      >
                        Time *
                      </label>
                      <select
                        id="time"
                        {...register("time", { required: true })}
                        className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      >
                        <option value="" className="bg-gray-800">
                          Select time
                        </option>
                        {timeSlots.map((time) => (
                          <option
                            key={time}
                            value={time}
                            className="bg-gray-800"
                          >
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="guests"
                        className="block text-white font-medium mb-2"
                      >
                        Party Size *
                      </label>
                      <select
                        id="guests"
                        {...register("guests", { required: true })}
                        className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      >
                        <option value="" className="bg-gray-800">
                          Select guests
                        </option>
                        {partySizes.map((size) => (
                          <option
                            key={size.value}
                            value={size.value}
                            className="bg-gray-800"
                          >
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="specialRequests"
                      className="block text-white font-medium mb-2"
                    >
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      {...register("specialRequests")}
                      rows={4}
                      className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                      placeholder="Any dietary restrictions, special occasions, or seating preferences..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="interactive w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Confirming Reservation...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5" />
                        Confirm Reservation
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-400 text-sm text-center">
                    By making a reservation, you agree to our cancellation
                    policy. Please cancel at least 2 hours in advance.
                  </p>
                </div>
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
