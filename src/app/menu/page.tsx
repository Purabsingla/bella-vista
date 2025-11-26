"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import {
  ChefHat,
  Star,
  Utensils,
  Cake,
  ArrowRight,
  Wine,
  Flame,
} from "lucide-react";
import Carousel, { CarouselItem } from "@/components/Carousels";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Great_Vibes, Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

// --- RELIABLE & VERIFIED IMAGE DATA ---
const menuCategories = {
  starters: [
    {
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and parmesan foam.",
      price: "$18",
      image:
        "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Burrata Caprese",
      description:
        "Fresh burrata with heirloom tomatoes, basil oil, and balsamic glaze.",
      price: "$22",
      image:
        "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Tuna Tartare",
      description:
        "Yellowfin tuna with avocado, citrus ponzu, and sesame crisps.",
      price: "$24",
      image:
        "https://images.unsplash.com/photo-1546039901-7ffd7f548d7d?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Wagyu Carpaccio",
      description:
        "Thinly sliced raw wagyu beef, truffle oil, arugula, and parmesan shavings.",
      price: "$28",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Scallop Ceviche",
      description:
        "Fresh scallops marinated in lime, cilantro, chili, and mango salsa.",
      price: "$21",
      image:
        "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Wild Mushroom Bruschetta",
      description: "Sautéed wild mushrooms on sourdough with goat cheese.",
      price: "$16",
      image:
        "https://images.unsplash.com/photo-1572695157369-a97dd5229db0?auto=format&fit=crop&q=80&w=800",
    },
  ],
  mains: [
    {
      name: "Wagyu Beef Tenderloin",
      description:
        "A5 Japanese Wagyu with fondant potatoes and bordelaise sauce.",
      price: "$85",
      image:
        "https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Pan-Seared Salmon",
      description: "Crispy skin salmon with lemon herb butter and asparagus.",
      price: "$34",
      image:
        "https://images.unsplash.com/photo-1485921325833-c519f76c4974?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Lobster Thermidor",
      description:
        "Whole lobster baked in a rich brandy cream sauce with gruyere.",
      price: "$65",
      image:
        "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Duck Confit",
      description:
        "Slow-cooked duck leg with cherry gastrique and parsnip purée.",
      price: "$38",
      image:
        "https://images.unsplash.com/photo-1580476262716-6cbb926046ef?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Rack of Lamb",
      description: "Herb-crusted lamb rack with ratatouille and mint jus.",
      price: "$48",
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Truffle Mushroom Risotto",
      description:
        "Arborio rice with porcini mushrooms, black truffle, and parmesan.",
      price: "$32",
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    },
  ],
  desserts: [
    {
      name: "Chocolate Soufflé",
      description:
        "Decadent dark chocolate soufflé with vanilla bean ice cream.",
      price: "$16",
      image:
        "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Tiramisu",
      description: "Classic Italian dessert with espresso-soaked ladyfingers.",
      price: "$14",
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Crème Brûlée",
      description:
        "Rich custard topped with a contrasting layer of hard caramel.",
      price: "$14",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a029177b?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Lemon Basil Tart",
      description: "Zesty lemon curd tart with a hint of basil and meringue.",
      price: "$12",
      image:
        "https://images.unsplash.com/photo-1519915093369-3f45e9a6fb3b?auto=format&fit=crop&q=80&w=800",
    },
  ],
  drinks: [
    {
      name: "Signature Cocktail",
      description: "Aged rum, passion fruit, lime, and a hint of chili.",
      price: "$18",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Old Fashioned",
      description: "Premium bourbon, bitters, and orange zest.",
      price: "$16",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Red Wine Flight",
      description: "A selection of our finest cabernets and merlots.",
      price: "$28",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Espresso Martini",
      description: "Vodka, coffee liqueur, and fresh espresso.",
      price: "$17",
      image:
        "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800",
    },
  ],
};

// --- CAROUSEL DATA (Matches the CarouselItem Interface) ---
const dailySpecials: CarouselItem[] = [
  {
    id: 1,
    name: "Truffle Risotto",
    description:
      "Creamy Arborio rice with black truffle, parmesan, and wild mushrooms.",
    title: "Truffle Risotto",
    price: "$28",
    // Verified High-Res Risotto Image
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=1200",
    time: "25 min",
    rating: 4.9,
    icon: <ChefHat className="w-4 h-4 text-current" />,
  },
  {
    id: 2,
    name: "Seafood Paella",
    description:
      "Traditional Spanish paella with fresh seafood, saffron, and peas.",
    title: "Seafood Paella",
    price: "$42",
    // Verified High-Res Paella Image
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=1200",
    time: "35 min",
    rating: 4.8,
    icon: <Utensils className="w-4 h-4 text-current" />,
  },
  {
    id: 3,
    name: "Lamb Osso Buco",
    description:
      "Tender braised lamb shank with root vegetables and red wine jus.",
    title: "Lamb Osso Buco",
    price: "$45",
    // Verified High-Res Lamb Image
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200",
    time: "40 min",
    rating: 5.0,
    icon: <Star className="w-4 h-4 text-current" />,
  },
  {
    id: 4,
    name: "Duck Confit",
    description:
      "Crispy skin duck leg served with wild rice pilaf and orange glaze.",
    title: "Duck Confit",
    price: "$38",
    // Verified High-Res Duck Image
    image:
      "https://images.unsplash.com/photo-1580476262716-6cbb926046ef?auto=format&fit=crop&q=80&w=1200",
    time: "30 min",
    rating: 4.7,
    icon: <ChefHat className="w-4 h-4 text-current" />,
  },
  {
    id: 5,
    name: "Chocolate Soufflé",
    description: "Decadent dark chocolate soufflé with vanilla bean ice cream.",
    title: "Chocolate Soufflé",
    price: "$16",
    // Verified High-Res Dessert Image
    image:
      "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?auto=format&fit=crop&q=80&w=1200",
    time: "20 min",
    rating: 4.9,
    icon: <Cake className="w-4 h-4 text-current" />,
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

  const handleMenuItemAddToCart = (item: Item, category: string) => {
    if (!user) {
      navigate.replace("/auth?from=/menu");
      return;
    }
    addToCart({
      id: Date.now() + Math.random(),
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-16 relative overflow-hidden">
      {/* 1. Subtle Background Texture (Fixed: Verified Working Unsplash Texture) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

      {/* --- HERO SECTION --- */}
      <section className="relative py-28 px-4 text-center z-10 overflow-hidden">
        {/* Cinematic Backdrop for Title */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-transparent to-stone-950" />
          <Image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200"
            alt="Menu Ambience"
            fill
            className="object-cover blur-sm"
          />
        </div>

        <FadeContent>
          <h1
            className={`${greatVibes.className} relative z-10 text-8xl md:text-[10rem] text-amber-500 mb-6 drop-shadow-2xl`}
          >
            Our Menu
          </h1>
          <div className="flex justify-center mb-8 relative z-10">
            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          </div>
          <p
            className={`${playfair.className} relative z-10 text-2xl md:text-3xl text-stone-200 max-w-2xl mx-auto italic font-light tracking-wide`}
          >
            &quot;A culinary journey through texture, taste, and
            tradition.&quot;
          </p>
        </FadeContent>
      </section>

      {/* --- DAILY SPECIALS (Carousel) --- */}
      <section className="relative py-16 bg-gradient-to-b from-stone-900/50 to-stone-950 border-y border-stone-900 z-10">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col items-center mb-16">
            <span
              className={`${manrope.className} text-amber-500 uppercase tracking-[0.3em] text-xs font-bold mb-4`}
            >
              Chef&apos;s Recommendations
            </span>
            <SplitText
              text="Today's Specials"
              className={`${playfair.className} text-5xl md:text-6xl text-white`}
              delay={50}
              duration={0.5}
              splitType="chars"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
            />
          </div>

          <FadeContent>
            <div className="flex justify-center">
              {/* THE GOLDEN FIX: Increased baseWidth to 1100 */}
              <Carousel
                items={dailySpecials}
                baseWidth={1100}
                autoplay={true}
                autoplayDelay={4000}
                pauseOnHover={true}
                loop={true}
                // onAddToCart is optional if handled inside carousel
              />
            </div>
          </FadeContent>
        </div>
      </section>

      {/* --- MENU CATEGORIES --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 border-b border-stone-800 pb-6">
          {Object.keys(menuCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`interactive relative pb-4 text-sm md:text-lg tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
                activeCategory === category
                  ? "text-amber-500"
                  : "text-stone-500 hover:text-stone-200"
              } ${manrope.className}`}
            >
              {category}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-amber-500 transition-all duration-500 ${
                  activeCategory === category ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {menuCategories[activeCategory as keyof typeof menuCategories].map(
            (item, index) => (
              <FadeContent key={item.name} delay={index * 50}>
                {/* Horizontal Card Layout - Enhanced Design */}
                <div className="group flex flex-col sm:flex-row gap-6 p-5 rounded-md hover:bg-stone-900/60 border border-transparent hover:border-amber-900/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50">
                  {/* Image Container - FIXED SIZE to prevent Squashing */}
                  <div className="relative w-full sm:w-40 h-40 shrink-0 overflow-hidden rounded-sm bg-stone-900 shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-grow py-1">
                    <div>
                      <div className="flex justify-between items-baseline mb-3 border-b border-stone-800/50 pb-3 border-dashed">
                        <h3
                          className={`${playfair.className} text-2xl text-stone-200 group-hover:text-amber-400 transition-colors`}
                        >
                          {item.name}
                        </h3>
                        <span
                          className={`${manrope.className} text-xl font-bold text-amber-600 group-hover:text-amber-500 transition-colors`}
                        >
                          {item.price}
                        </span>
                      </div>
                      <p
                        className={`${manrope.className} text-stone-400 text-sm font-light leading-relaxed line-clamp-2`}
                      >
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() =>
                          handleMenuItemAddToCart(item, activeCategory)
                        }
                        className="interactive flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors group/btn"
                      >
                        <span className="border-b border-transparent group-hover/btn:border-amber-500 pb-0.5 transition-all">
                          {user ? "Add to Order" : "Login to Order"}
                        </span>
                        <div className="bg-stone-800 p-1.5 rounded-full group-hover/btn:bg-amber-600 transition-colors">
                          <ArrowRight className="w-3 h-3 text-stone-400 group-hover/btn:text-white" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeContent>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
