"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import FadeContent from "@/components/FadeContent";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { signIn, signUp } from "@/firebase/firebaseAuth";
import { Great_Vibes, Playfair_Display, Manrope } from "next/font/google";
import Link from "next/link";

// --- FONTS ---
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

// --- BEAUTIFUL COMPONENTS ---

// 1. Floating "Stardust" Particles
const Stardust = () => {
  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 5,
    size: Math.random() * 3 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-200/20 blur-[1px]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float-up ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// 2. Breathing "Golden Nebula" Background
const GoldenNebula = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Top Left Orb */}
    <div
      className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] bg-amber-900/10 rounded-full blur-[100px] animate-pulse-slow"
      style={{ animationDuration: "8s" }}
    />
    {/* Bottom Right Orb */}
    <div
      className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-amber-600/5 rounded-full blur-[120px] animate-pulse-slow"
      style={{ animationDuration: "12s", animationDelay: "1s" }}
    />
    {/* Center Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px]" />
  </div>
);

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { isLoading, showToast } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (!isLogin) {
        const userCred = await signUp(
          formData.name,
          formData.email,
          formData.password
        );
        if (userCred) {
          const token = await userCred.user.getIdToken();
          await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              uid: userCred.user.uid,
              email: formData.email,
              name: formData.name,
              role: "user",
            }),
          });
          showToast("Account created successfully!", "success");
          router.replace(from);
        } else {
          showToast("Failed to create account.", "error");
        }
      } else {
        const userCredentials = await signIn(
          formData.email,
          formData.password,
          false
        );
        if (userCredentials) {
          showToast("Welcome back.", "success");
          router.replace(from);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      showToast("Authentication failed. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-20 relative overflow-hidden flex items-center justify-center">
      {/* 1. Grain Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

      {/* 2. New Beautiful Backgrounds */}
      <GoldenNebula />
      <Stardust />

      <div className="relative z-10 w-full max-w-md px-4">
        <FadeContent>
          <div className="bg-stone-900/40 backdrop-blur-xl border border-stone-800/80 p-8 md:p-12 rounded-lg shadow-2xl relative overflow-hidden">
            {/* Glossy Reflection on Card */}
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-[0.03] pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-10 relative">
              <div className="inline-flex items-center justify-center p-3 mb-6 bg-stone-800/50 rounded-full border border-stone-700/50">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
              <span
                className={`${manrope.className} text-amber-500 uppercase tracking-[0.25em] text-[10px] font-bold block mb-3`}
              >
                {isLogin ? "Members Access" : "Exclusive Invite"}
              </span>
              <h2
                className={`${playfair.className} text-4xl text-white mb-2 drop-shadow-sm`}
              >
                {isLogin ? "Sign In" : "Join Us"}
              </h2>
            </div>

            {/* Toggle Tabs (Pill Style) */}
            <div className="flex p-1 bg-stone-950/50 rounded-md border border-stone-800 mb-8 relative">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 relative z-10 ${
                  isLogin
                    ? "text-white bg-stone-800 shadow-sm"
                    : "text-stone-500 hover:text-stone-300"
                } ${manrope.className}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-xs uppercase tracking-widest font-bold rounded-sm transition-all duration-300 relative z-10 ${
                  !isLogin
                    ? "text-white bg-stone-800 shadow-sm"
                    : "text-stone-500 hover:text-stone-300"
                } ${manrope.className}`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="group space-y-1.5">
                  <label
                    className={`${manrope.className} text-stone-500 text-[10px] uppercase tracking-widest font-bold`}
                  >
                    Full Name
                  </label>
                  <div className="relative group/input">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within/input:text-amber-500 transition-colors duration-300" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-stone-950/50 border border-stone-800 text-white pl-10 pr-4 py-3.5 rounded-sm focus:outline-none focus:border-amber-500/50 focus:bg-stone-900 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder-stone-700 text-sm"
                      placeholder="e.g. Marco Pierre"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-[10px] pl-1">
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              <div className="group space-y-1.5">
                <label
                  className={`${manrope.className} text-stone-500 text-[10px] uppercase tracking-widest font-bold`}
                >
                  Email
                </label>
                <div className="relative group/input">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within/input:text-amber-500 transition-colors duration-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-stone-950/50 border border-stone-800 text-white pl-10 pr-4 py-3.5 rounded-sm focus:outline-none focus:border-amber-500/50 focus:bg-stone-900 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder-stone-700 text-sm"
                    placeholder="name@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[10px] pl-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="group space-y-1.5">
                <label
                  className={`${manrope.className} text-stone-500 text-[10px] uppercase tracking-widest font-bold`}
                >
                  Password
                </label>
                <div className="relative group/input">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within/input:text-amber-500 transition-colors duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-stone-950/50 border border-stone-800 text-white pl-10 pr-10 py-3.5 rounded-sm focus:outline-none focus:border-amber-500/50 focus:bg-stone-900 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder-stone-700 text-sm"
                    placeholder="••••••••"
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
                  <p className="text-red-500 text-[10px] pl-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div className="group space-y-1.5">
                  <label
                    className={`${manrope.className} text-stone-500 text-[10px] uppercase tracking-widest font-bold`}
                  >
                    Confirm
                  </label>
                  <div className="relative group/input">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 group-focus-within/input:text-amber-500 transition-colors duration-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-stone-950/50 border border-stone-800 text-white pl-10 pr-4 py-3.5 rounded-sm focus:outline-none focus:border-amber-500/50 focus:bg-stone-900 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder-stone-700 text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-[10px] pl-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Shimmer Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full bg-white text-stone-950 hover:bg-amber-500 hover:text-white transition-all duration-500 py-4 mt-8 rounded-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-amber-500/20"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />

                <div className="relative z-20 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span
                        className={`${manrope.className} text-xs font-bold uppercase tracking-widest`}
                      >
                        {isLogin ? "Enter" : "Create Account"}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className={`${manrope.className} text-stone-500 text-[10px] uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5`}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </FadeContent>
      </div>
    </div>
  );
};

export default Auth;
