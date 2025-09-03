"use client";
import FadeContent from "@/components/FadeContent";
import SplitText from "../SplitText/SplitText";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-lg">
      <div className="max-w-4xl mx-auto text-center">
        <SplitText
          text="Ready for an Unforgettable Experience?"
          className="text-4xl md:text-5xl font-bold text-white mb-6 text-center w-[59vw]"
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
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join us for an evening of exceptional cuisine, warm hospitality, and
            memories that will last a lifetime.
          </p>
          <div className="space-x-4">
            <Link
              href="/reservation"
              className="interactive bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              Reserve Your Table
            </Link>
            <Link
              href="/menu"
              className="interactive border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Explore Our Menu
            </Link>
          </div>
        </FadeContent>
      </div>
    </section>
  );
}
