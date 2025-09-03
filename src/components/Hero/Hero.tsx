import React from "react";
import BlurText from "../BlurText";
import FadeContent from "../FadeContent";
import Link from "next/link";
import { Great_Vibes, Playfair_Display, Montserrat } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});
const playfairDisplay = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "800",
  subsets: ["latin"],
});
const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-center">
          <BlurText
            text="Bella Vista"
            delay={200}
            animateBy="words"
            direction="top"
            className={`text-6xl md:text-8xl font-bold text-amber-200 mb-4 ${greatVibes.className}`}
          />
        </div>

        <FadeContent delay={600}>
          <p
            className={`text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed ${playfairDisplay.className}`}
          >
            Where culinary artistry meets warm hospitality in the heart of the
            city
          </p>
        </FadeContent>

        <FadeContent delay={900}>
          <div className="space-x-4">
            <Link
              href="/menu"
              className={`interactive bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block ${montserrat.className}`}
            >
              View Menu
            </Link>
            <Link
              href="/reservation"
              className={`interactive border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 inline-block ${montserrat.className}`}
            >
              Book Table
            </Link>
          </div>
        </FadeContent>
      </div>
    </section>
  );
};

export default Hero;
