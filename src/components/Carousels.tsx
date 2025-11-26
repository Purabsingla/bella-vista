"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Clock,
  Star,
  Flame,
} from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";
import Image from "next/image";

const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export interface CarouselItem {
  id: number;
  name: string;
  description: string;
  title: string;
  price: string;
  image: string;
  time: string;
  rating: number;
  icon: React.ReactNode;
}

export interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  onAddToCart?: (item: CarouselItem) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  baseWidth = 1000, // Default increased to 1000px
  autoplay = true,
  autoplayDelay = 5000,
  pauseOnHover = true,
  loop = true,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoplay && !isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, isHovered, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev === items.length - 1) return loop ? 0 : prev;
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) return loop ? items.length - 1 : prev;
      return prev - 1;
    });
  };

  const handleAddToCart = (item: CarouselItem) => {
    if (onAddToCart) onAddToCart(item);
  };

  return (
    // Updated container styles: increased minHeight to 550px for a taller, grander look
    <div
      className="relative group w-full mx-auto bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden rounded-sm"
      style={{ maxWidth: `${baseWidth}px`, minHeight: "550px" }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* --- CAROUSEL TRACK --- */}
      <div className="relative h-full w-full min-h-[550px]">
        <div
          className="flex h-full min-h-[550px] transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className="w-full shrink-0 flex flex-col md:flex-row h-full relative min-h-[550px]"
            >
              {/* --- IMAGE SECTION (Left/Top) --- */}
              <div className="relative w-full md:w-[55%] h-72 md:h-auto overflow-hidden bg-stone-950">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={`object-cover transition-transform duration-[2000ms] ease-out ${
                    index === currentIndex ? "scale-110" : "scale-100"
                  }`}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent md:hidden opacity-90" />
              </div>

              {/* --- CONTENT SECTION (Right/Bottom) --- */}
              <div className="relative w-full md:w-[45%] bg-stone-950 p-8 md:p-12 flex flex-col justify-center border-l border-stone-800/50">
                {/* Top Meta Tags */}
                <div className="flex justify-between items-center mb-8">
                  <div className="hidden md:flex items-center gap-3 text-amber-500">
                    <div className="p-2.5 bg-amber-500/10 rounded-full">
                      {item.icon || <Flame className="w-5 h-5" />}
                    </div>
                    <span
                      className={`${manrope.className} text-sm font-bold uppercase tracking-widest`}
                    >
                      Chef&apos;s Selection
                    </span>
                  </div>

                  {/* Rating & Time */}
                  <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-medium bg-stone-900 px-3 py-1.5 rounded-sm border border-stone-800">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold bg-amber-950/30 px-3 py-1.5 rounded-sm border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="mb-10 relative z-10">
                  <h2
                    className={`${playfair.className} text-4xl md:text-5xl text-white mb-6 leading-tight`}
                  >
                    {item.name}
                  </h2>
                  <p
                    className={`${manrope.className} text-stone-400 text-base leading-relaxed line-clamp-4 font-light`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-auto pt-8 border-t border-stone-800 flex items-center justify-between gap-6">
                  <div className="flex flex-col">
                    <span
                      className={`${manrope.className} text-stone-500 text-[11px] uppercase tracking-widest font-bold mb-1`}
                    >
                      Price
                    </span>
                    <span
                      className={`${playfair.className} text-4xl text-amber-500`}
                    >
                      {item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="group relative flex-1 max-w-[200px] bg-white text-stone-950 hover:bg-amber-500 hover:text-white transition-all duration-300 py-4 px-6 overflow-hidden rounded-sm shadow-lg hover:shadow-amber-500/20"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <span
                        className={`${manrope.className} text-sm font-bold uppercase tracking-widest`}
                      >
                        Order
                      </span>
                      <ShoppingCart className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CONTROLS --- */}
      <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-stone-950/80 text-stone-400 border border-stone-800 hover:text-white hover:border-amber-500 hover:bg-stone-900 transition-all z-20 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-stone-950/80 text-stone-400 border border-stone-800 hover:text-white hover:border-amber-500 hover:bg-stone-900 transition-all z-20 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-stone-800 z-30">
        <div
          className="h-full bg-amber-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Carousel;
