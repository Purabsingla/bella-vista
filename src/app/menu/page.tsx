"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import { ChefHat, Star, Utensils, Cake, ShoppingCartIcon } from "lucide-react";
import Carousel, { CarouselItem } from "@/components/Carousels";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

const dailySpecials: CarouselItem[] = [
  {
    id: 1,
    name: "Truffle Risotto",
    description:
      "Creamy Arborio rice with black truffle, parmesan, and wild mushrooms",
    title: "Truffle Risotto",
    price: "$28",
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "25 min",
    rating: 4.9,
    icon: <ChefHat className="w-4 h-4 text-white" />,
  },
  {
    id: 2,
    name: "Seafood Paella",
    description:
      "Traditional Spanish paella with fresh seafood and saffron rice",
    title: "Seafood Paella",
    price: "$42",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "35 min",
    rating: 4.8,
    icon: <Utensils className="w-4 h-4 text-white" />,
  },
  {
    id: 3,
    name: "Lamb Osso Buco",
    description: "Braised lamb shank with root vegetables and red wine jus",
    title: "Lamb Osso Buco",
    price: "$45",
    image:
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "40 min",
    rating: 5.0,
    icon: <Star className="w-4 h-4 text-white" />,
  },
  {
    id: 4,
    name: "Duck Confit",
    description:
      "Slow-cooked duck leg with cherry gastrique and wild rice pilaf",
    title: "Duck Confit",
    price: "$38",
    image:
      "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "30 min",
    rating: 4.7,
    icon: <ChefHat className="w-4 h-4 text-white" />,
  },
  {
    id: 5,
    name: "Chocolate Soufflé",
    description: "Decadent dark chocolate soufflé with vanilla bean ice cream",
    title: "Chocolate Soufflé",
    price: "$16",
    image:
      "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    time: "20 min",
    rating: 4.9,
    icon: <Cake className="w-4 h-4 text-white" />,
  },
];

interface Item {
  name: string;
  description: string;
  price: string;
  image: string;
}

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("starters");
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useRouter();

  const handleAddToCart = (item: CarouselItem) => {
    if (!user) {
      navigate.replace("/auth?from=/menu");
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });
  };

  const handleMenuItemAddToCart = (item: Item, category: string) => {
    if (!user) {
      navigate.replace("/auth?from=/menu");
      return;
    }

    addToCart({
      id: Date.now() + Math.random(), // Generate unique ID
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating Food Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          🍝
        </div>
        <div
          className="absolute top-40 right-20 text-3xl opacity-10 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🍷
        </div>
        <div
          className="absolute bottom-40 left-20 text-5xl opacity-10 animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          🥘
        </div>
        <div
          className="absolute bottom-20 right-10 text-4xl opacity-10 animate-bounce"
          style={{ animationDelay: "3s" }}
        >
          🧀
        </div>
        <div
          className="absolute top-1/2 left-5 text-3xl opacity-10 animate-bounce"
          style={{ animationDelay: "4s" }}
        >
          🍾
        </div>
        <div
          className="absolute top-1/3 right-5 text-4xl opacity-10 animate-bounce"
          style={{ animationDelay: "5s" }}
        >
          🥩
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        {/* <SplitText className="text-5xl md:text-6xl font-bold text-white mb-4">
          Our Menu
        </SplitText> */}
        <SplitText
          text="Our Menu"
          className="text-5xl md:text-6xl font-bold text-white mb-4"
          delay={70}
          duration={0.2}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="0px 0px -20% 0px"
        />
        <FadeContent delay={500}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest
            ingredients
          </p>
        </FadeContent>
      </section>

      {/* Daily Specials Carousel */}
      <section className="py-20 px-4 bg-black/30 backdrop-blur-lg relative">
        {/* Section Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* <SplitText className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Today&apos;s Specials
          </SplitText> */}
          <SplitText
            text="Today's Specials"
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
            delay={70}
            duration={0.2}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px 0px -20% 0px"
          />

          <FadeContent>
            <div className="flex justify-center overflow-hidden">
              <Carousel
                items={dailySpecials}
                baseWidth={800}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                loop={true}
                onAddToCart={handleAddToCart}
              />
            </div>
          </FadeContent>
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
                    <div className="relative w-full h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="w-full h-48 object-cover"
                      />
                    </div>
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
                      <button
                        onClick={() =>
                          handleMenuItemAddToCart(item, activeCategory)
                        }
                        className="interactive w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-500 transition-colors duration-300 font-semibold flex items-center justify-center gap-2"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        {user ? "Add to Cart" : "Login to Order"}
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
