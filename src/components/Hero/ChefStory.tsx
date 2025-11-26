"use client";
import FadeContent from "@/components/FadeContent";
import Image from "next/image";
import { Playfair_Display, Manrope } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function Story() {
  return (
    <section className="py-24 md:py-40 px-4 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left: Image Composition */}
          <div className="relative">
            <FadeContent direction="left">
              {/* Main Image */}
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mr-auto overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1977&auto=format&fit=crop"
                  alt="Chef Plating"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating "Stamp" or Badge */}
              <div className="absolute -bottom-10 -right-4 md:right-10 bg-stone-900 border border-stone-800 p-6 shadow-2xl max-w-[200px]">
                <p
                  className={`${playfair.className} text-amber-500 text-3xl font-italic mb-1`}
                >
                  &quot;Pure Art&quot;
                </p>
                <p className={`${manrope.className} text-stone-400 text-xs`}>
                  — NY Times Review
                </p>
              </div>
            </FadeContent>
          </div>

          {/* Right: Text Content */}
          <div className="relative">
            <FadeContent direction="right" delay={200}>
              <h4
                className={`${manrope.className} text-amber-600 uppercase tracking-[0.2em] text-sm font-bold mb-6`}
              >
                The Philosophy
              </h4>
              <h2
                className={`${playfair.className} text-4xl md:text-6xl text-white leading-tight mb-8`}
              >
                Every plate tells <br /> a{" "}
                <span className="text-amber-500 italic">story.</span>
              </h2>

              <div className="space-y-6 text-stone-400 font-light text-lg leading-relaxed">
                <p>
                  We believe that fine dining is not just about sustenance, but
                  about narrative. Our ingredients are sourced from local
                  farmers we know by name, ensuring that every season is
                  represented on your plate with absolute authenticity.
                </p>
                <p>
                  &quot;Cooking is a language through which you express harmony,
                  creativity, happiness, beauty, poetry, complexity, magic,
                  humor, provocation, culture.&quot;
                </p>
              </div>

              <div className="mt-10">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" // Placeholder signature
                  alt="Chef Signature"
                  width={150}
                  height={50}
                  className="opacity-50 invert"
                />
                <p
                  className={`${manrope.className} text-stone-500 text-sm mt-2`}
                >
                  Executive Chef
                </p>
              </div>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  );
}
