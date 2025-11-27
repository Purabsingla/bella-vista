"use client";

import React from "react";
import { Utensils } from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoaderProps> = ({
  size = "medium",
  text = "Preparing...",
  fullScreen = false,
}) => {
  // --- SIZE LOGIC ---
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return { box: "w-12 h-12", icon: "w-5 h-5" };
      case "large":
        return { box: "w-24 h-24", icon: "w-10 h-10" };
      default:
        return { box: "w-16 h-16", icon: "w-6 h-6" };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "large":
        return "text-2xl";
      default:
        return "text-lg";
    }
  };

  const { box, icon } = getSizeClasses();

  // --- LOADER CONTENT ---
  const content = (
    <div className="flex flex-col items-center justify-center gap-6 relative z-10">
      {/* Icon Container with Rings */}
      <div className={`relative ${box} flex items-center justify-center`}>
        {/* 1. Static Outer Border (Subtle) */}
        <div className="absolute inset-0 border border-stone-800 rounded-full" />

        {/* 2. Spinning Gold Ring */}
        <div className="absolute inset-0 border-2 border-transparent border-t-amber-500 rounded-full animate-spin" />

        {/* 3. Reverse Spinning Inner Ring */}
        <div className="absolute inset-2 border-2 border-transparent border-b-amber-700/50 rounded-full animate-spin-slow-reverse" />

        {/* 4. Center Icon */}
        <div className="bg-stone-900 rounded-full p-3 shadow-2xl relative z-10">
          <Utensils className={`${icon} text-amber-500 animate-pulse`} />
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full animate-pulse-slow" />
      </div>

      {/* Text & Dots */}
      <div className="text-center space-y-2">
        <p
          className={`${
            playfair.className
          } ${getTextSize()} text-white font-medium tracking-wide`}
        >
          {text}
        </p>

        {/* Elegant Dots */}
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce delay-0" />
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce delay-150" />
          <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );

  // --- FULL SCREEN WRAPPER ---
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-stone-950">
        {/* 1. Background Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

        {/* 2. Ambient Light / Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-stone-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[100px] animate-pulse-slow" />

        {content}
      </div>
    );
  }

  // --- IN-LINE WRAPPER ---
  return <div className="flex items-center justify-center p-8">{content}</div>;
};

export default Loading;
