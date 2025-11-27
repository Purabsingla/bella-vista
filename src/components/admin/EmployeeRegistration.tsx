"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  UserPlus,
  Eye,
  EyeOff,
  User,
  Mail,
  Shield,
  Lock,
} from "lucide-react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export interface EmployeeData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "employee";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeData) => void;
}

const EmployeeRegistrationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { register, handleSubmit, reset, watch } = useForm<EmployeeData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation State
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  // Handle Mount/Unmount Animation
  useEffect(() => {
    if (isOpen) {
      setRenderComponent(true); // Mount the HTML
      // Small delay to allow browser to paint, then trigger fade-in
      requestAnimationFrame(() => setShowModal(true));
    } else {
      setShowModal(false); // Trigger fade-out
      // Unmount HTML after animation finishes (300ms)
      const timer = setTimeout(() => setRenderComponent(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!renderComponent) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!watch("name")?.trim()) newErrors.name = "Name is required";
    if (!watch("email")?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(watch("email")))
      newErrors.email = "Email is invalid";
    if (!watch("password")) newErrors.password = "Password is required";
    else if (watch("password").length < 6)
      newErrors.password = "At least 6 characters";
    if (!watch("confirmPassword"))
      newErrors.confirmPassword = "Confirm your password";
    else if (watch("password") !== watch("confirmPassword"))
      newErrors.confirmPassword = "Passwords don’t match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (Data: EmployeeData) => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    onSubmit(Data);

    setErrors({});
    setIsSubmitting(false);
    reset();
    onClose(); // Parent handles closing, this triggers the useEffect animation
  };

  return (
    // Outer Backdrop: Fixed, Full Screen, High Z-Index, Scrollable
    <div
      className={clsx(
        "fixed inset-0 z-[9999] overflow-y-auto",
        "transition-all duration-300 ease-in-out"
      )}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Black Overlay with Blur */}
      <div
        className={clsx(
          "fixed inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity duration-300",
          showModal ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Positioning Container - Centers content but allows scrolling if tall */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        {/* Actual Modal Panel */}
        <div
          className={clsx(
            `relative w-full max-w-lg transform overflow-hidden rounded-sm border border-stone-800 bg-stone-900 p-8 text-left shadow-2xl transition-all duration-300 ${manrope.className}`,
            showModal
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95"
          )}
        >
          {/* --- HEADER --- */}
          <div className="flex items-center justify-between mb-8 border-b border-stone-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-900/20 p-2 rounded-full border border-amber-500/20">
                <UserPlus className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3
                  className={`${playfair.className} text-xl font-bold text-white`}
                >
                  Register User
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                  Create{" "}
                  {watch("role") === "admin" ? "Administrator" : "Staff Member"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-stone-500 hover:text-white transition-colors p-2 hover:bg-stone-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* --- FORM --- */}
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
            {/* Name */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 group-focus-within:text-amber-500 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className={clsx(
                    "w-full bg-stone-950 border text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:ring-1 transition-all text-sm placeholder-stone-700",
                    errors.name
                      ? "border-red-900/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-stone-800 focus:border-amber-500 focus:ring-amber-500/20"
                  )}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-1 pl-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 group-focus-within:text-amber-500 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={clsx(
                    "w-full bg-stone-950 border text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:ring-1 transition-all text-sm placeholder-stone-700",
                    errors.email
                      ? "border-red-900/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-stone-800 focus:border-amber-500 focus:ring-amber-500/20"
                  )}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 pl-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="group">
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 group-focus-within:text-amber-500 transition-colors">
                Role Permission
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                <select
                  {...register("role", { required: true })}
                  className="w-full bg-stone-950 border border-stone-800 text-white pl-10 pr-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all text-sm appearance-none cursor-pointer"
                >
                  <option value="employee">Employee (Limited Access)</option>
                  <option value="admin">Administrator (Full Access)</option>
                </select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 group-focus-within:text-amber-500 transition-colors">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className={clsx(
                      "w-full bg-stone-950 border text-white pl-10 pr-10 py-3 rounded-sm focus:outline-none focus:ring-1 transition-all text-sm placeholder-stone-700",
                      errors.password
                        ? "border-red-900/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-stone-800 focus:border-amber-500 focus:ring-amber-500/20"
                    )}
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] mt-1 pl-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 group-focus-within:text-amber-500 transition-colors">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", { required: true })}
                    className={clsx(
                      "w-full bg-stone-950 border text-white pl-10 pr-10 py-3 rounded-sm focus:outline-none focus:ring-1 transition-all text-sm placeholder-stone-700",
                      errors.confirmPassword
                        ? "border-red-900/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-stone-800 focus:border-amber-500 focus:ring-amber-500/20"
                    )}
                    placeholder="••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-[10px] mt-1 pl-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* --- ACTIONS --- */}
            <div className="flex gap-4 pt-4 border-t border-stone-800 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-sm bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 rounded-sm bg-amber-600 text-white hover:bg-amber-500 transition-all shadow-lg hover:shadow-amber-500/20 text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create User
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistrationModal;
