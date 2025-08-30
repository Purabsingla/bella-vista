"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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
  baseWidth = 800,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = true,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (autoplay && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          loop
            ? (prev + 1) % items.length
            : Math.min(prev + 1, items.length - 1)
        );
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      loop ? (prev - 1 + items.length) % items.length : Math.max(prev - 1, 0)
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      loop ? (prev + 1) % items.length : Math.min(prev + 1, items.length - 1)
    );
  };

  const handleAddToCart = (item: CarouselItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl"
      style={{ width: `${baseWidth}px`, height: "400px" }}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      {/* Main Carousel Content */}
      <div className="relative h-full">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="w-full h-full flex-shrink-0 relative">
              <div className="grid grid-cols-2 h-full">
                {/* Image Side */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    ⭐ {item.rating}
                  </div>

                  {/* Time Badge */}
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    🕒 {item.time}
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 flex flex-col justify-between bg-gradient-to-br from-gray-900/90 to-gray-800/90">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="text-amber-400 font-semibold text-sm">
                        Chef&apos;s Special
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4">
                      {item.name}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-bold text-amber-400">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-sm">Serves 1-2</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="interactive w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="interactive absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-lg text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 z-10"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="interactive absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-lg text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 z-10"
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`interactive w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-amber-400 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
