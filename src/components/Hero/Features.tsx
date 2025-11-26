"use client";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText/SplitText";
import { Wine, ChefHat, Star } from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function Features() {
  return (
    <section className="py-32 px-4 bg-stone-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <SplitText
            text="Curated Excellence"
            className={`${playfair.className} text-4xl md:text-6xl text-white mb-6`}
            delay={50}
            duration={0.6}
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
          />
          <div className="h-[1px] w-full bg-gradient-to-r from-amber-600/50 to-transparent max-w-xs" />
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
          {/* Card 1: Tall Card (Left) */}
          <FadeContent delay={0} className="md:row-span-2 h-full">
            <div className="group relative h-full w-full p-8 bg-stone-900/40 border border-stone-800 hover:border-amber-900/50 transition-all duration-500 overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-950/90 z-10" />
              {/* Replace with actual image */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569919659476-f0852f6834b7?q=80&w=1964&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-50" />

              <div className="relative z-20">
                <Wine className="w-10 h-10 text-amber-500 mb-6" />
                <h3
                  className={`${playfair.className} text-2xl text-white mb-2`}
                >
                  World Class Wine
                </h3>
                <p className={`${manrope.className} text-stone-400 font-light`}>
                  A cellar collection of over 400 vintages from the world&apos;s
                  most renowned vineyards.
                </p>
              </div>
            </div>
          </FadeContent>

          {/* Card 2: Wide Card (Top Right) */}
          <FadeContent delay={200} className="md:col-span-2">
            <div className="group relative h-full w-full p-8 bg-stone-900/40 border border-stone-800 hover:border-amber-900/50 transition-all duration-500 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <ChefHat className="w-10 h-10 text-amber-500 mb-4" />
                <h3
                  className={`${playfair.className} text-2xl text-white mb-2`}
                >
                  Michelin Experience
                </h3>
                <p className={`${manrope.className} text-stone-400 font-light`}>
                  Led by Executive Chef Marco, our kitchen is a theater of
                  precision and passion, delivering dishes that challenge and
                  delight the palate.
                </p>
              </div>
              <div className="w-full md:w-1/3 h-40 bg-stone-800 overflow-hidden rounded-sm relative">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2062&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          </FadeContent>

          {/* Card 3: Standard (Bottom Middle) */}
          <FadeContent delay={400}>
            <div className="group relative h-full p-8 bg-stone-900/40 border border-stone-800 hover:border-amber-900/50 transition-all duration-500">
              <Star className="w-8 h-8 text-amber-500 mb-4" />
              <h3 className={`${playfair.className} text-xl text-white mb-2`}>
                5-Star Service
              </h3>
              <p
                className={`${manrope.className} text-sm text-stone-400 font-light`}
              >
                Award-winning hospitality ensuring every moment is memorable.
              </p>
            </div>
          </FadeContent>

          {/* Card 4: Standard (Bottom Right) */}
          <FadeContent delay={600}>
            <div className="group relative h-full p-8 bg-stone-950 border border-stone-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-amber-600/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 blur-2xl" />
              <div className="text-center relative z-10">
                <span
                  className={`${playfair.className} text-5xl text-amber-500 block mb-1`}
                >
                  25+
                </span>
                <span
                  className={`${manrope.className} text-stone-400 text-xs uppercase tracking-widest`}
                >
                  Years of Legacy
                </span>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
