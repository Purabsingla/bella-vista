"use client";
import FadeContent from "@/components/FadeContent";
import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function Stats() {
  return (
    <section className="py-24 bg-stone-950 relative overflow-hidden border-y border-stone-900">
      {/* Background Texture: Subtle noise or pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {/* Stat Item 1 */}
          <FadeContent delay={0}>
            <div className="group relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone-800 hover:bg-stone-900/30 transition-all duration-500">
              <span
                className={`${manrope.className} text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block`}
              >
                Recognition
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`${playfair.className} text-6xl md:text-7xl text-white font-medium group-hover:scale-110 origin-left transition-transform duration-500`}
                >
                  3
                </span>
                <span
                  className={`${playfair.className} text-2xl text-stone-500 italic`}
                >
                  Stars
                </span>
              </div>
              <p
                className={`${manrope.className} text-stone-400 text-sm mt-4 font-light opacity-60`}
              >
                Michelin Guide 2024
              </p>
            </div>
          </FadeContent>

          {/* Stat Item 2 */}
          <FadeContent delay={100}>
            <div className="group relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone-800 hover:bg-stone-900/30 transition-all duration-500">
              <span
                className={`${manrope.className} text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block`}
              >
                The Cellar
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`${playfair.className} text-6xl md:text-7xl text-white font-medium group-hover:scale-110 origin-left transition-transform duration-500`}
                >
                  450
                </span>
                <span
                  className={`${playfair.className} text-2xl text-stone-500 italic`}
                >
                  +
                </span>
              </div>
              <p
                className={`${manrope.className} text-stone-400 text-sm mt-4 font-light opacity-60`}
              >
                Rare Vintages
              </p>
            </div>
          </FadeContent>

          {/* Stat Item 3 */}
          <FadeContent delay={200}>
            <div className="group relative p-8 md:p-12 border-b md:border-b-0 md:border-r border-stone-800 hover:bg-stone-900/30 transition-all duration-500">
              <span
                className={`${manrope.className} text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block`}
              >
                Experience
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`${playfair.className} text-6xl md:text-7xl text-white font-medium group-hover:scale-110 origin-left transition-transform duration-500`}
                >
                  26
                </span>
                <span
                  className={`${playfair.className} text-2xl text-stone-500 italic`}
                >
                  Yrs
                </span>
              </div>
              <p
                className={`${manrope.className} text-stone-400 text-sm mt-4 font-light opacity-60`}
              >
                Culinary Heritage
              </p>
            </div>
          </FadeContent>

          {/* Stat Item 4 */}
          <FadeContent delay={300}>
            <div className="group relative p-8 md:p-12 hover:bg-stone-900/30 transition-all duration-500">
              <span
                className={`${manrope.className} text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-4 block`}
              >
                Community
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className={`${playfair.className} text-6xl md:text-7xl text-white font-medium group-hover:scale-110 origin-left transition-transform duration-500`}
                >
                  50k
                </span>
              </div>
              <p
                className={`${manrope.className} text-stone-400 text-sm mt-4 font-light opacity-60`}
              >
                Guests Served
              </p>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
