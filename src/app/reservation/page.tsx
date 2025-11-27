"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Info,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Great_Vibes, Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

// --- CONSTANTS ---
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
  { value: "9+", label: "9+ Guests (Please Call)" },
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
  const router = useRouter();

  const onSubmit = async (Data: Reservation) => {
    // Authentication Check
    if (!auth.currentUser) {
      router.push("/auth?from=/reservation");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: auth.currentUser?.uid,
          ...Data,
        }),
      });

      // Simulate network delay for UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        setIsSubmitting(false);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // --- SUCCESS VIEW (The "Ticket" Look) ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-950 pt-20 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

        <FadeContent>
          <div className="relative z-10 bg-stone-900 border border-stone-800 p-12 max-w-xl mx-auto text-center shadow-2xl rounded-sm">
            {/* Gold Border Effect */}
            <div className="absolute inset-1 border border-stone-800 pointer-events-none" />

            <div className="w-20 h-20 bg-emerald-900/30 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>

            <h2 className={`${playfair.className} text-4xl text-white mb-4`}>
              Reservation Confirmed
            </h2>
            <p
              className={`${manrope.className} text-stone-400 mb-10 font-light`}
            >
              We look forward to welcoming you,{" "}
              <span className="text-white font-bold">{watch("name")}</span>.
            </p>

            {/* Ticket Details */}
            <div className="bg-stone-950 border border-stone-800 p-8 mb-8 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p
                    className={`${manrope.className} text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1`}
                  >
                    Date
                  </p>
                  <p className={`${playfair.className} text-xl text-white`}>
                    {new Date(watch("date")).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p
                    className={`${manrope.className} text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1`}
                  >
                    Time
                  </p>
                  <p className={`${playfair.className} text-xl text-white`}>
                    {watch("time")}
                  </p>
                </div>
                <div>
                  <p
                    className={`${manrope.className} text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1`}
                  >
                    Guests
                  </p>
                  <p className={`${playfair.className} text-xl text-white`}>
                    {partySizes.find((p) => p.value === watch("guests"))
                      ?.label || watch("guests")}
                  </p>
                </div>
                <div>
                  <p
                    className={`${manrope.className} text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1`}
                  >
                    Reference
                  </p>
                  <p className={`${playfair.className} text-xl text-amber-500`}>
                    #{Math.floor(Math.random() * 10000)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-stone-500 text-xs mb-8">
              A confirmation email has been sent to {watch("email")}.
            </p>

            <button
              onClick={() => {
                setIsSubmitted(false);
                reset();
              }}
              className="uppercase tracking-widest text-xs font-bold text-amber-500 hover:text-white transition-colors border-b border-amber-500/30 hover:border-white pb-1"
            >
              Make Another Reservation
            </button>
          </div>
        </FadeContent>
      </div>
    );
  }

  // --- MAIN RESERVATION FORM ---
  return (
    <div className="min-h-screen bg-stone-950 pt-16 relative overflow-hidden">
      {/* 1. Subtle Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

      {/* --- HERO --- */}
      <section className="relative py-24 px-4 text-center z-10">
        <FadeContent>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span
              className={`${manrope.className} text-amber-500 tracking-[0.3em] text-xs uppercase font-bold`}
            >
              Book A Table
            </span>
            <div className="h-[1px] w-12 bg-amber-500/50" />
          </div>
          <h1
            className={`${greatVibes.className} text-7xl md:text-9xl text-white mb-6 drop-shadow-2xl`}
          >
            Reservations
          </h1>
          <p
            className={`${playfair.className} text-2xl md:text-3xl text-stone-300 max-w-2xl mx-auto italic font-light tracking-wide`}
          >
            &quot;Secure your spot for an unforgettable evening.&quot;
          </p>
        </FadeContent>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* --- LEFT COLUMN: Info (4 Cols) --- */}
          <div className="lg:col-span-4 space-y-8">
            <FadeContent direction="left">
              <div className="bg-stone-900/30 backdrop-blur-sm border border-stone-800 p-8 rounded-sm">
                <h3
                  className={`${playfair.className} text-2xl text-white mb-6`}
                >
                  Dining Information
                </h3>

                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-center gap-3 mb-1 text-amber-500">
                      <Clock className="w-4 h-4" />
                      <span
                        className={`${manrope.className} text-xs font-bold uppercase tracking-widest`}
                      >
                        Dinner Service
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm pl-7">
                      Tue - Sun: 5:00 PM - 10:00 PM
                    </p>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-3 mb-1 text-amber-500">
                      <Users className="w-4 h-4" />
                      <span
                        className={`${manrope.className} text-xs font-bold uppercase tracking-widest`}
                      >
                        Large Parties
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm pl-7 leading-relaxed">
                      For parties of 9 or more, please contact us directly at{" "}
                      <a
                        href="tel:+15551234567"
                        className="text-white hover:text-amber-500 transition-colors"
                      >
                        (555) 123-4567
                      </a>
                      .
                    </p>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-3 mb-1 text-amber-500">
                      <Info className="w-4 h-4" />
                      <span
                        className={`${manrope.className} text-xs font-bold uppercase tracking-widest`}
                      >
                        Policy
                      </span>
                    </div>
                    <p className="text-stone-400 text-sm pl-7 leading-relaxed">
                      Reservations are held for 15 minutes. Please notify us if
                      you are running late.
                    </p>
                  </div>
                </div>
              </div>
            </FadeContent>
          </div>

          {/* --- RIGHT COLUMN: Form (8 Cols) --- */}
          <div className="lg:col-span-8">
            <FadeContent direction="right">
              <div className="bg-stone-900 border border-stone-800 p-8 md:p-12 rounded-sm shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Row 1: Personal Info */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group">
                      <label
                        htmlFor="name"
                        className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                      >
                        Full Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all placeholder-stone-700"
                      />
                    </div>
                    <div className="group">
                      <label
                        htmlFor="phone"
                        className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                      >
                        Phone Number
                      </label>
                      <input
                        {...register("phone", { required: true })}
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all placeholder-stone-700"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                    >
                      Email Address
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all placeholder-stone-700"
                    />
                  </div>

                  {/* Row 3: Reservation Details */}
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="group">
                      <label
                        htmlFor="date"
                        className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                      >
                        Date
                      </label>
                      <input
                        {...register("date", { required: true })}
                        type="date"
                        min={today}
                        className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all [color-scheme:dark]"
                      />
                    </div>

                    <div className="group">
                      <label
                        htmlFor="time"
                        className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                      >
                        Time
                      </label>
                      <select
                        {...register("time", { required: true })}
                        className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all appearance-none rounded-none"
                      >
                        <option value="" className="text-stone-500">
                          Select Time
                        </option>
                        {timeSlots.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="group">
                      <label
                        htmlFor="guests"
                        className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                      >
                        Guests
                      </label>
                      <select
                        {...register("guests", { required: true })}
                        className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all appearance-none rounded-none"
                      >
                        <option value="" className="text-stone-500">
                          Party Size
                        </option>
                        {partySizes.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Special Requests */}
                  <div className="group">
                    <label
                      htmlFor="requests"
                      className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                    >
                      Special Requests
                    </label>
                    <textarea
                      {...register("specialRequests")}
                      rows={3}
                      placeholder="Allergies, special occasions, or seating preferences..."
                      className="w-full bg-stone-950 border-b border-stone-800 text-white px-0 py-3 focus:outline-none focus:border-amber-500 focus:bg-stone-900/30 transition-all placeholder-stone-700 resize-none"
                    />
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    {!auth.currentUser ? (
                      <Link
                        href="/auth?from=/reservation"
                        className="block w-full"
                      >
                        <button
                          type="button"
                          className="w-full py-4 bg-stone-800 text-stone-300 border border-stone-700 hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-xs rounded-sm"
                        >
                          Login to Reserve
                        </button>
                      </Link>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-amber-600 text-white hover:bg-amber-500 transition-all duration-300 font-bold uppercase tracking-widest text-xs rounded-sm shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Processing..." : "Confirm Reservation"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
