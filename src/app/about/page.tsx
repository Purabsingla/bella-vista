"use client";

import React from "react";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import { Award, Heart, Star, Calendar, Quote, ChefHat } from "lucide-react";
import Image from "next/image";
import { Great_Vibes, Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

// --- DATA ---
const teamMembers = [
  {
    name: "Marco Bellacorte",
    role: "Head Chef & Owner",
    // Verified: Serious Chef Image
    image:
      "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=800&auto=format&fit=crop",
    description:
      "With over 25 years of culinary experience, Marco brings authentic Italian flavors with a modern twist.",
  },
  {
    name: "Sofia Rodriguez",
    role: "Sous Chef",
    // Verified: Female Chef Plating
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
    description:
      "Sofia's passion for fresh ingredients and innovative techniques elevates every dish she creates.",
  },
  {
    name: "James Mitchell",
    role: "Pastry Chef",
    // Verified: Baker/Chef with apron
    image:
      "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=800",
    description:
      "James crafts exquisite desserts that perfectly complement our savory offerings.",
  },
  {
    name: "Elena Vasquez",
    role: "Restaurant Manager",
    // Verified: Hospitality professional
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    description:
      "Elena ensures every guest receives exceptional service and a memorable dining experience.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800", // Restaurant Interior
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800", // Plating
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800", // Cocktail
  "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&q=80&w=800", // Wine Cellar
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800", // Food Detail
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800", // Dining Table
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-950 pt-16 relative overflow-hidden">
      {/* 1. Subtle Background Texture (Noise) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

      {/* --- HERO SECTION --- */}
      <section className="relative py-28 px-4 text-center z-10 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />

        <FadeContent>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span
              className={`${manrope.className} text-amber-500 tracking-[0.3em] text-xs uppercase font-bold`}
            >
              Our Story
            </span>
            <div className="h-[1px] w-12 bg-amber-500/50" />
          </div>

          <h1
            className={`${greatVibes.className} relative z-10 text-7xl md:text-9xl text-white mb-6 drop-shadow-2xl`}
          >
            About Bella Vista
          </h1>

          <p
            className={`${playfair.className} relative z-10 text-2xl md:text-3xl text-stone-300 max-w-3xl mx-auto italic font-light tracking-wide leading-relaxed`}
          >
            &quot;A story of passion, tradition, and culinary excellence
            spanning over two decades.&quot;
          </p>
        </FadeContent>
      </section>

      {/* --- OUR STORY (Editorial Layout) --- */}
      <section className="py-24 px-4 bg-stone-900/30 border-y border-stone-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Column */}
            <FadeContent direction="left">
              <div className="space-y-8">
                <SplitText
                  text="The Beginning"
                  className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-4`}
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                />

                <div
                  className={`${manrope.className} text-lg text-stone-400 leading-relaxed space-y-6 font-light`}
                >
                  <p>
                    Founded in 1995 by Chef Marco Bellacorte, Bella Vista began
                    as a small family restaurant with a simple dream: to bring
                    authentic Italian cuisine to our community while creating a
                    warm, welcoming atmosphere where families and friends could
                    gather.
                  </p>
                  <p>
                    What started in a modest 20-seat dining room has grown into
                    one of the city&apos;s most beloved culinary destinations.
                    Yet despite our growth, we&apos;ve never lost sight of our
                    core values:{" "}
                    <span className="text-amber-500">
                      exceptional food, warm hospitality
                    </span>
                    , and the belief that every meal should be a celebration.
                  </p>
                  <p>
                    Today, we continue to honor traditional Italian cooking
                    methods while embracing modern techniques and
                    locally-sourced ingredients. Every dish tells a story of our
                    heritage, our passion, and our commitment to excellence.
                  </p>
                </div>

                {/* Signature */}
                <div className="pt-4">
                  <p
                    className={`${greatVibes.className} text-4xl text-amber-500`}
                  >
                    Marco Bellacorte
                  </p>
                </div>
              </div>
            </FadeContent>

            {/* Image Column */}
            <FadeContent direction="right" delay={300}>
              <div className="relative group">
                <div className="relative w-full h-[500px] overflow-hidden rounded-sm border border-stone-800">
                  <Image
                    src="https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?auto=format&fit=crop&q=80&w=1600"
                    alt="Chef Cooking"
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Quote Card */}
                <div className="absolute -bottom-8 -left-8 bg-stone-900 border border-stone-800 p-8 shadow-2xl max-w-xs hidden md:block">
                  <Quote className="w-8 h-8 text-amber-600 mb-4 opacity-50" />
                  <p
                    className={`${playfair.className} text-white text-xl italic mb-4`}
                  >
                    &quot;Food is love made visible.&quot;
                  </p>
                  <p
                    className={`${manrope.className} text-stone-500 text-xs uppercase tracking-widest`}
                  >
                    - Chef Marco
                  </p>
                </div>
              </div>
            </FadeContent>
          </div>
        </div>
      </section>

      {/* --- STATISTICS (Bento Style) --- */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className={`${manrope.className} text-amber-500 uppercase tracking-[0.2em] text-xs font-bold`}
            >
              By The Numbers
            </span>
            <h2
              className={`${playfair.className} text-4xl md:text-5xl text-white mt-4`}
            >
              Our Achievements
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StatCard
              icon={<Calendar />}
              value="28+"
              label="Years of Excellence"
              delay={0}
            />
            <StatCard
              icon={<Award />}
              value="25+"
              label="Awards Won"
              delay={100}
            />
            <StatCard
              icon={<Heart />}
              value="50k+"
              label="Happy Customers"
              delay={200}
            />
            <StatCard
              icon={<Star />}
              value="4.9"
              label="Average Rating"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-24 px-4 bg-stone-900/30 border-y border-stone-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`${playfair.className} text-4xl md:text-5xl text-white mb-6`}
            >
              Meet Our Team
            </h2>
            <p
              className={`${manrope.className} text-stone-400 max-w-2xl mx-auto font-light`}
            >
              The passionate individuals who bring Bella Vista to life every
              day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <FadeContent key={member.name} delay={index * 150}>
                <div className="group bg-stone-950 border border-stone-800 p-6 hover:border-amber-500/50 transition-all duration-500">
                  <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3
                    className={`${playfair.className} text-2xl text-white mb-2 group-hover:text-amber-500 transition-colors`}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={`${manrope.className} text-amber-600 text-xs uppercase tracking-widest font-bold mb-4`}
                  >
                    {member.role}
                  </p>
                  <p
                    className={`${manrope.className} text-stone-400 text-sm leading-relaxed font-light`}
                  >
                    {member.description}
                  </p>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY (Expanding Flex) --- */}
      <section className="py-24 px-4 relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <SplitText
            text="Restaurant Gallery"
            className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-12 text-center`}
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
          />

          <div className="flex flex-col md:flex-row gap-2 h-[600px] w-full mt-10">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="relative flex-1 hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-sm overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-stone-950/50 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ icon, value, label, delay }: any) => (
  <FadeContent delay={delay}>
    <div className="text-center p-8 border border-stone-800 bg-stone-900/20 hover:bg-stone-900/40 transition-all duration-300 group">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stone-950 border border-stone-800 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
        <div className="text-stone-400 group-hover:text-amber-500 transition-colors">
          {React.cloneElement(icon, { size: 32 })}
        </div>
      </div>
      <h3
        className={`${playfair.className} text-4xl font-bold text-white mb-2`}
      >
        {value}
      </h3>
      <p
        className={`${manrope.className} text-stone-500 text-sm uppercase tracking-widest`}
      >
        {label}
      </p>
    </div>
  </FadeContent>
);

export default About;
