"use client";
import Link from "next/link";
import FadeContent from "@/components/FadeContent";
import SplitText from "../SplitText/SplitText";
import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function CTA() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* 1. Merged Background with Parallax Effect */}
      {/* Note: bg-fixed creates the parallax effect where image stays still while scrolling */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-stone-950/70" />

        {/* Gradient at the top to blend seamlessly with the previous section */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-stone-950 to-transparent" />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <FadeContent delay={0}>
          <span
            className={`${manrope.className} text-amber-500 tracking-[0.4em] text-xs md:text-sm uppercase font-bold mb-6 block`}
          >
            Reserve Your Experience
          </span>
        </FadeContent>

        <div className="mb-10 overflow-hidden">
          <SplitText
            text="A Table at Bella Vista"
            className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1]`}
            delay={50}
            duration={0.7}
            splitType="words"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
          />
          <SplitText
            text="Is Waiting For You"
            className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl text-stone-400 italic leading-[1.1]`}
            delay={150} // Slightly delayed for rhythm
            duration={0.7}
            splitType="words"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
          />
        </div>

        <FadeContent delay={400}>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-12">
            {/* Primary Button: Solid Gold */}
            <Link
              href="/reservation"
              className="group relative px-10 py-5 bg-amber-600 text-white min-w-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span
                className={`${manrope.className} relative z-10 text-sm font-bold tracking-widest uppercase`}
              >
                Book Now
              </span>
            </Link>

            {/* Secondary Button: Outline/Ghost */}
            <Link
              href="/menu"
              className="group relative px-10 py-5 border border-stone-400 text-stone-300 min-w-[220px] hover:border-white hover:text-white transition-colors duration-300"
            >
              <span
                className={`${manrope.className} text-sm font-bold tracking-widest uppercase`}
              >
                Explore Menu
              </span>
            </Link>
          </div>

          <p
            className={`${manrope.className} text-stone-500 text-xs mt-12 opacity-60`}
          >
            Limited seating available for the upcoming season. <br />
            For large parties, please contact concierge directly.
          </p>
        </FadeContent>
      </div>
    </section>
  );
}
