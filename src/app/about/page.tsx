"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import { Award, Heart, Star, Calendar } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Marco Bellacorte",
    role: "Head Chef & Owner",
    image:
      "https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    description:
      "With over 25 years of culinary experience, Marco brings authentic Italian flavors with a modern twist.",
  },
  {
    name: "Sofia Rodriguez",
    role: "Sous Chef",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    description:
      "Sofia's passion for fresh ingredients and innovative techniques elevates every dish she creates.",
  },
  {
    name: "James Mitchell",
    role: "Pastry Chef",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    description:
      "James crafts exquisite desserts that perfectly complement our savory offerings.",
  },
  {
    name: "Elena Vasquez",
    role: "Restaurant Manager",
    image:
      "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    description:
      "Elena ensures every guest receives exceptional service and a memorable dining experience.",
  },
];

const galleryImages = [
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
  "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
  "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg",
  "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
  "https://images.pexels.com/photos/735869/pexels-photo-735869.jpeg",
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-pink-900/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Geometric Patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        <div
          className="absolute top-20 left-20 w-32 h-32 border border-white/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-20 right-20 w-24 h-24 border border-amber-400/30 rotate-12 animate-spin"
          style={{ animationDuration: "15s" }}
        />
        <div
          className="absolute top-1/2 left-10 w-16 h-16 border border-purple-400/20 rotate-45 animate-spin"
          style={{ animationDuration: "25s" }}
        />
        <div
          className="absolute top-1/3 right-10 w-20 h-20 border border-blue-400/20 rotate-12 animate-spin"
          style={{ animationDuration: "18s" }}
        />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        {/* <SplitText className="text-5xl md:text-6xl font-bold text-white mb-4">
          About Bella Vista
        </SplitText> */}
        <SplitText
          text="About Bella Vista"
          className="text-5xl md:text-6xl font-bold text-white mb-4"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="0px 0px -20px 0px" // trigger ~50px before fully entering
        />
        <FadeContent delay={500}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A story of passion, tradition, and culinary excellence spanning over
            two decades
          </p>
        </FadeContent>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-cream-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeContent direction="left">
              <div className="space-y-6">
                {/* <SplitText className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Our Story
                </SplitText> */}

                <SplitText
                  text="Our Story"
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 pb-2"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px 0px -20px 0px" // trigger ~50px before fully entering
                />

                <p className="text-lg text-gray-700 leading-relaxed">
                  Founded in 1995 by Chef Marco Bellacorte, Bella Vista began as
                  a small family restaurant with a simple dream: to bring
                  authentic Italian cuisine to our community while creating a
                  warm, welcoming atmosphere where families and friends could
                  gather.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  What started in a modest 20-seat dining room has grown into
                  one of the city&apos;s most beloved culinary destinations. Yet
                  despite our growth, we&apos;ve never lost sight of our core
                  values: exceptional food, warm hospitality, and the belief
                  that every meal should be a celebration.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, we continue to honor traditional Italian cooking
                  methods while embracing modern techniques and locally-sourced
                  ingredients. Every dish tells a story of our heritage, our
                  passion, and our commitment to excellence.
                </p>
              </div>
            </FadeContent>

            <FadeContent direction="right" delay={300}>
              <div className="relative">
                <div className="relative w-full h-96">
                  <Image
                    src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="Chef Marco cooking"
                    fill
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-lg shadow-xl">
                  <p className="font-bold text-lg">
                    &quot;Food is love made visible&quot;
                  </p>
                  <p className="text-sm opacity-90 mt-1">
                    - Chef Marco Bellacorte
                  </p>
                </div>
              </div>
            </FadeContent>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 bg-black/30 backdrop-blur-lg relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <SplitText
            text="Our Achievements"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px 0px -20px 0px" // trigger ~50px before fully entering
          />

          <div className="grid md:grid-cols-4 gap-8">
            <FadeContent delay={0}>
              <div className="text-center">
                <div className="bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">28+</h3>
                <p className="text-gray-300">Years of Excellence</p>
              </div>
            </FadeContent>

            <FadeContent delay={200}>
              <div className="text-center">
                <div className="bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
                <p className="text-gray-300">Awards Won</p>
              </div>
            </FadeContent>

            <FadeContent delay={400}>
              <div className="text-center">
                <div className="bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">50K+</h3>
                <p className="text-gray-300">Happy Customers</p>
              </div>
            </FadeContent>

            <FadeContent delay={600}>
              <div className="text-center">
                <div className="bg-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">4.9</h3>
                <p className="text-gray-300">Average Rating</p>
              </div>
            </FadeContent>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* <SplitText className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Meet Our Team
          </SplitText> */}
          <SplitText
            text="Meet Our Team"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px 0px -20px 0px" // trigger ~50px before fully entering
          />
          <FadeContent delay={500}>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              The passionate individuals who bring Bella Vista to life every day
            </p>
          </FadeContent>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <FadeContent key={member.name} delay={index * 200}>
                <div className="bg-white/10 h-[18rem] backdrop-blur-lg rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="relative w-24 h-24">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </FadeContent>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-black/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <SplitText
            text="Restaurant Gallery"
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center pb-2"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px 0px -20px 0px" // trigger ~50px before fully entering
          />

          {/* <div className="relative">
            <div className="relative w-full h-96 overflow-hidden rounded-2xl">
              <Image
                src={galleryImages[currentImageIndex]}
                alt="Restaurant interior"
                fill
                className="w-full h-96 object-cover transition-all duration-500"
              />
            </div>

            <button
              onClick={prevImage}
              className="interactive absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-lg text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="interactive absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-lg text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
            >
              →
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`interactive w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? "bg-amber-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div> */}

          <div className="flex items-center gap-2 h-[400px] w-full max-w-4xl mt-10 mx-auto">
            {galleryImages.map((images, index) => (
              <div
                key={index}
                className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
              >
                <Image
                  className="h-full w-full object-cover object-center"
                  src={images}
                  fill
                  alt="image"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
