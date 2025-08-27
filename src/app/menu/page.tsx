"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText";
import FadeContent from "@/components/FadeContent";
import { ChefHat, Clock, Star } from "lucide-react";
import Image from "next/image";
import Aurora from "@/components/Aurora";
import Carousel from "@/components/Carousels";
const menuCategories = {
  starters: [
    {
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and parmesan",
      price: "$18",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Burrata Caprese",
      description: "Fresh burrata with heirloom tomatoes and basil oil",
      price: "$16",
      image:
        "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Tuna Tartare",
      description: "Yellowfin tuna with avocado, citrus, and sesame",
      price: "$22",
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
  ],
  mains: [
    {
      name: "Wagyu Beef Tenderloin",
      description: "Premium wagyu with roasted potatoes and red wine reduction",
      price: "$65",
      image:
        "https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Pan-Seared Salmon",
      description:
        "Atlantic salmon with lemon herb butter and seasonal vegetables",
      price: "$32",
      image:
        "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Lobster Thermidor",
      description: "Fresh lobster in rich cream sauce with gruyere cheese",
      price: "$48",
      image:
        "https://images.pexels.com/photos/2374946/pexels-photo-2374946.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Duck Confit",
      description: "Slow-cooked duck leg with cherry gastrique and wild rice",
      price: "$38",
      image:
        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
  ],
  desserts: [
    {
      name: "Chocolate Soufflé",
      description: "Dark chocolate soufflé with vanilla bean ice cream",
      price: "$14",
      image:
        "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with espresso and mascarpone",
      price: "$12",
      image:
        "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Crème Brûlée",
      description: "Vanilla custard with caramelized sugar and fresh berries",
      price: "$13",
      image:
        "https://images.pexels.com/photos/1998635/pexels-photo-1998635.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
  ],
  drinks: [
    {
      name: "Bella Vista Signature",
      description: "House cocktail with aged rum, passion fruit, and lime",
      price: "$16",
      image:
        "https://images.pexels.com/photos/1304540/pexels-photo-1304540.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Wine Selection",
      description: "Curated selection of premium wines from around the world",
      price: "$12-85",
      image:
        "https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
    {
      name: "Craft Beer",
      description: "Local and imported craft beers on tap",
      price: "$8-12",
      image:
        "https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    },
  ],
};

const dailySpecials = [
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
    name: "Seafood Paella",
    description:
      "Traditional Spanish paella with fresh seafood and saffron rice",
    price: "$42",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "35 min",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Lamb Osso Buco",
    description: "Braised lamb shank with root vegetables and red wine jus",
    price: "$45",
    image:
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "40 min",
    rating: 5.0,
  },
];

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("starters");
  const [currentSpecialIndex, setCurrentSpecialIndex] = useState(0);

  const nextSpecial = () => {
    setCurrentSpecialIndex((prev) => (prev + 1) % dailySpecials.length);
  };

  const prevSpecial = () => {
    setCurrentSpecialIndex(
      (prev) => (prev - 1 + dailySpecials.length) % dailySpecials.length
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <SplitText className="text-5xl md:text-6xl font-bold text-white mb-4">
          Our Menu
        </SplitText>
        <FadeContent delay={500}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest
            ingredients
          </p>
        </FadeContent>
      </section>

      <div style={{ height: "600px", position: "relative" }}>
        <Carousel
          baseWidth={300}
          autoplay={true}
          autoplayDelay={3000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>

      {/* Daily Specials Carousel */}
      <section className="py-20 px-4 bg-black/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <SplitText className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Today&apos;s Specials
          </SplitText>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSpecialIndex * 100}%)`,
              }}
            >
              {dailySpecials.map((special) => (
                <div key={special.id} className="w-full flex-shrink-0 px-4">
                  <FadeContent>
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
                              <span className="text-gray-300">
                                {special.time}
                              </span>
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
                            width={500} // required in Next.js
                            height={256}
                            className="w-full h-64 object-cover rounded-xl shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                        </div>
                      </div>
                    </div>
                  </FadeContent>
                </div>
              ))}
            </div>

            <button
              onClick={prevSpecial}
              className="interactive absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={nextSpecial}
              className="interactive absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-lg text-white p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
            >
              →
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {dailySpecials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSpecialIndex(index)}
                className={`interactive w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSpecialIndex ? "bg-amber-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(menuCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`interactive px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? "bg-amber-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuCategories[activeCategory as keyof typeof menuCategories].map(
              (item, index) => (
                <FadeContent key={item.name} delay={index * 100}>
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={500} // required in Next.js
                      height={256}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white">
                          {item.name}
                        </h3>
                        <span className="text-2xl font-bold text-amber-400">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      <button className="interactive w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-500 transition-colors duration-300 font-semibold">
                        Add to Order
                      </button>
                    </div>
                  </div>
                </FadeContent>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
