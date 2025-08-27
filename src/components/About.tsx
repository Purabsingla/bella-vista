import React, { useEffect, useRef, useState } from "react";
import { Award, Heart, Users } from "lucide-react";
import Image from "next/image";
const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-cream-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our <span className="text-amber-600">Story</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Founded in 1995 by Chef Marco Bellacorte, Bella Vista has been
                serving authentic Italian cuisine with a modern twist for over
                two decades. What started as a small family restaurant has grown
                into one of the city&apos;s most beloved dining destinations.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that food is more than just nourishment—it&apos;s a
                celebration of life, culture, and the connections we make around
                the dinner table. Every dish is prepared with passion, using
                only the finest ingredients sourced from local farms and trusted
                suppliers.
              </p>
            </div>

            <div
              className={`grid grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">25+</h3>
                <p className="text-sm text-gray-600">Awards Won</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">50K+</h3>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">28</h3>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                alt="Chef cooking"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <Image
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop"
                alt="Restaurant interior"
                className="w-full h-64 object-cover rounded-lg shadow-lg mt-8"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-lg shadow-xl">
              <p className="font-bold text-lg">
                &quot;Exceptional cuisine meets warm hospitality&quot;
              </p>
              <p className="text-sm opacity-90 mt-1">- Chef Marco Bellacorte</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
