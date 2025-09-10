"use client";

import React, { useState, useEffect } from "react";
import { X, UserPlus, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import { useForm } from "react-hook-form";

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
  const [visible, setVisible] = useState(isOpen); // control fade

  // Smooth mount/unmount
  useEffect(() => {
    if (isOpen)
      requestAnimationFrame(() => setVisible(true)); // next frame -> animate in
    else {
      const timer = setTimeout(() => setVisible(false), 300); // match animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        reset();
        onClose();
      }
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, reset]);

  if (!visible) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!watch("name").trim()) newErrors.name = "Name is required";
    if (!watch("email").trim()) newErrors.email = "Email is required";
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
    await new Promise((res) => setTimeout(res, 1200));
    onSubmit(Data);

    setErrors({});
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
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-amber-600" />
            Register {watch("role") === "admin" ? "Admin" : "Employee"}
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
              className={clsx(
                "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition",
                errors.name ? "border-red-500 animate-shake" : "border-gray-300"
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={clsx(
                "w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition",
                errors.email
                  ? "border-red-500 animate-shake"
                  : "border-gray-300"
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              {...register("role", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="employee">👨‍🍳 Employee</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          {/* Password */}
          {[
            {
              label: "Password",
              name: "password" as const,
              show: showPassword,
              set: setShowPassword,
            },
            {
              label: "Confirm Password",
              name: "confirmPassword" as const,
              show: showConfirmPassword,
              set: setShowConfirmPassword,
            },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label} *
              </label>
              <div className="relative">
                <input
                  type={f.show ? "text" : "password"}
                  {...register(f.name, { required: true })}
                  className={clsx(
                    "w-full px-4 py-2 pr-10 rounded-lg border focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition",
                    errors[f.name]
                      ? "border-red-500 animate-shake"
                      : "border-gray-300"
                  )}
                />
                <button
                  type="button"
                  onClick={() => f.set(!f.show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {f.show ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors[f.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[f.name]}</p>
              )}
            </div>
          ))}

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
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold shadow hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create {watch("role") === "admin" ? "Admin" : "Employee"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistrationModal;
