"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeContent from "../FadeContent"; // Standard animation component
import { Great_Vibes, Playfair_Display, Manrope } from "next/font/google";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-stone-950 flex items-center justify-center text-center">
      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=3870&auto=format&fit=crop"
          alt="Fine Dining Atmosphere"
          fill
          className="object-cover opacity-60 scale-105 animate-slow-zoom"
          priority
        />

        {/* YOUR PREFERRED GRADIENT OVERLAY */}
        {/* This is the exact gradient from your snippet that makes the text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/30" />

        {/* Subtle Noise Texture for "Film" look */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 w-full px-4 max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
        {/* Top Tag: Established Date */}
        <FadeContent delay={200}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span
              className={`${manrope.className} text-amber-500 tracking-[0.3em] text-xs uppercase font-semibold`}
            >
              Est. 1998
            </span>
            <div className="h-[1px] w-12 bg-amber-500/50" />
          </div>
        </FadeContent>

        {/* MAIN TITLE: Bella Vista */}
        {/* Replaced BlurText with standard H1 + FadeContent */}
        <FadeContent delay={400}>
          <div className="relative py-2">
            {/* Optional: A faint shadow behind the text for extra legibility */}
            <h1
              className={`${greatVibes.className} text-8xl md:text-[10rem] lg:text-[11rem] leading-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 drop-shadow-2xl`}
            >
              Bella Vista
            </h1>
          </div>
        </FadeContent>

        {/* Subtitle: The Slogan */}
        <FadeContent delay={600}>
          <h2
            className={`${playfair.className} text-2xl md:text-4xl text-white font-light mb-6 tracking-wide`}
          >
            Taste the Extraordinary
          </h2>
          <p
            className={`${manrope.className} text-stone-300 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed mb-10`}
          >
            Where culinary artistry meets the soul of the city.
          </p>
        </FadeContent>

        {/* Buttons */}
        <FadeContent delay={800}>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            {/* Primary Button */}
            <Link
              href="/reservation"
              className={`${manrope.className} group relative px-8 py-4 bg-amber-600 text-white rounded-none hover:bg-amber-700 transition-all duration-500 tracking-widest uppercase text-sm font-bold min-w-[200px] overflow-hidden`}
            >
              <span className="relative z-10">Book a Table</span>
              {/* Shine Effect */}
              <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-amber-500/20" />
            </Link>

            {/* Secondary Button */}
            <Link
              href="/menu"
              className={`${manrope.className} px-8 py-4 border border-stone-600 text-stone-300 hover:border-amber-500 hover:text-white transition-colors duration-300 tracking-widest uppercase text-sm font-bold min-w-[200px] backdrop-blur-sm`}
            >
              View Menu
            </Link>
          </div>
        </FadeContent>
      </div>
    </section>
  );
};

export default Hero;
