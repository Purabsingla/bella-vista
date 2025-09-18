"use client";

import React, { useState, useEffect } from "react";
import { X, CalendarDays } from "lucide-react";
import clsx from "clsx";
import { useForm } from "react-hook-form";

export interface ReservationData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReservationData) => void;
}

const ReservationModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset,watch } = useForm<ReservationData>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(isOpen);

  // Smooth mount/unmount
  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => setVisible(true));
    else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // basic validation
    if (!watch("name")) newErrors.name = "Name is required";
    if (!watch("email")) newErrors.email = "Email is required";
    if (!watch("date")) newErrors.date = "Date is required";
    if (!watch("time")) newErrors.time = "Time is required";
    if (!watch("guests")) newErrors.guests = "Number of guests required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (data: ReservationData) => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    onSubmit(data);
    setIsSubmitting(false);
    reset();
    onClose();
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Modal */}
      <div
        className={clsx(
          "relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-600" />
            New Reservation
          </h3>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time *
              </label>
              <input
                type="time"
                {...register("time", { required: true })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests *
            </label>
            <input
              type="number"
              min="1"
              {...register("guests", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Special Requests (optional)
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Confirm Reservation"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
