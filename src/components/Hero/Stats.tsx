"use client";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText/SplitText";
import { Award, Star, Users } from "lucide-react";
export default function Stats() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SplitText
          text="Our Legacy"
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="0px 0px -20% 0px"
        />

        <div className="grid md:grid-cols-4 gap-8">
          <FadeContent delay={0}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">28+</h3>
              <p className="text-gray-300">Years of Excellence</p>
            </div>
          </FadeContent>

          <FadeContent delay={200}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">4.9</h3>
              <p className="text-gray-300">Average Rating</p>
            </div>
          </FadeContent>

          <FadeContent delay={400}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">50K+</h3>
              <p className="text-gray-300">Happy Customers</p>
            </div>
          </FadeContent>

          <FadeContent delay={600}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">25+</h3>
              <p className="text-gray-300">Awards Won</p>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
