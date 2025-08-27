"use client";

import React, { useState } from "react";
import { ChefHat, Clock, Star } from "lucide-react";
import Image from "next/image";
const specials = [
  {
    id: 1,
    name: "Truffle Risotto",
    description:
      "Creamy Arborio rice with black truffle, parmesan, and wild mushrooms",
    price: "$28",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "25 min",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Pan-Seared Salmon",
    description:
      "Fresh Atlantic salmon with lemon herb butter and seasonal vegetables",
    price: "$32",
    image:
      "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "20 min",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Wagyu Beef Tenderloin",
    description:
      "Premium wagyu beef with roasted potatoes and red wine reduction",
    price: "$65",
    image:
      "https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "30 min",
    rating: 5.0,
  },
  {
    id: 4,
    name: "Lobster Thermidor",
    description:
      "Fresh lobster in a rich, creamy sauce with herbs and gruyere cheese",
    price: "$48",
    image:
      "https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "35 min",
    rating: 4.9,
  },
];

const DailySpecials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % specials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + specials.length) % specials.length);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Today&apos;s <span className="text-amber-400">Specials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Handcrafted dishes featuring the finest seasonal ingredients
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {specials.map((special) => (
              <div key={special.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <ChefHat className="w-6 h-6 text-amber-400" />
                        <span className="text-amber-400 font-semibold">
                          Chef&apos;s Special
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-white">
                        {special.name}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {special.description}
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-amber-400" />
                          <span className="text-gray-300">{special.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-400 fill-current" />
                          <span className="text-gray-300">
                            {special.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-4xl font-bold text-amber-400">
                          {special.price}
                        </span>
                        <button className="interactive bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-500 transition-colors duration-300 font-semibold">
                          Order Now
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <Image
                        src={special.image}
                        alt={special.name}
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="interactive absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="interactive absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
          >
            →
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {specials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-amber-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailySpecials;
