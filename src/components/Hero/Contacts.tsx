"use client";
import FadeContent from "@/components/FadeContent";
import SplitText from "../SplitText/SplitText";
import { Clock, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SplitText
          text="Visit Us Today"
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="0px 0px -20px 0px" // trigger ~50px before fully entering
        />

        <div className="grid md:grid-cols-3 gap-8">
          <FadeContent delay={0}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-gray-300">
                123 Culinary Street
                <br />
                Downtown District, NY 10001
              </p>
            </div>
          </FadeContent>

          <FadeContent delay={200}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Reservations
              </h3>
              <p className="text-gray-300">
                (555) 123-4567
                <br />
                Available 24/7
              </p>
            </div>
          </FadeContent>

          <FadeContent delay={400}>
            <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
              <p className="text-gray-300">
                Mon-Thu: 5PM-10PM
                <br />
                Fri-Sun: 5PM-11PM
              </p>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
