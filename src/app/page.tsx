import React from "react";
import Link from "next/link";
import Aurora from "@/components/Aurora";
import FadeContent from "../components/FadeContent";
import BlurText from "@/components/BlurText";
import SplitText from "@/components/SplitText/SplitText";
import { Star, Award, Users, Clock, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Aurora />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center">
            <BlurText
              text="Bella Vista"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-6xl md:text-8xl font-bold text-white mb-4"
            />
          </div>

          <FadeContent delay={600}>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
              Where culinary artistry meets warm hospitality in the heart of the
              city
            </p>
          </FadeContent>

          <FadeContent delay={900}>
            <div className="space-x-4">
              <Link
                href="/menu"
                className="interactive bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                View Menu
              </Link>
              <Link
                href="/reservation"
                className="interactive border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Book Table
              </Link>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Quick Features */}
      {/* <section className="py-20 px-4 bg-black/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <FadeContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fine Dining
                </h3>
                <p className="text-gray-300">
                  Exquisite cuisine crafted with passion and precision
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Award Winning
                </h3>
                <p className="text-gray-300">
                  Recognized for excellence in culinary innovation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Made with Love
                </h3>
                <p className="text-gray-300">
                  Every dish tells a story of tradition and care
                </p>
              </div>
            </div>
          </FadeContent>
        </div>
      </section> */}

      <section className="py-20 px-4 bg-black/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <FadeContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fine Dining
                </h3>
                <p className="text-gray-300">
                  Exquisite cuisine crafted with passion and precision
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Award Winning
                </h3>
                <p className="text-gray-300">
                  Recognized for excellence in culinary innovation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Made with Love
                </h3>
                <p className="text-gray-300">
                  Every dish tells a story of tradition and care
                </p>
              </div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Restaurant Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* <SplitText className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Our Legacy
          </SplitText> */}
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

      {/* Chef's Story Preview */}
      <section className="py-20 px-4 bg-black/30 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeContent direction="left">
              <div className="space-y-6">
                {/* <SplitText className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Meet Chef Marco
                </SplitText> */}
                <SplitText
                  text="Meet Chef Marko"
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px 0px -20% 0px"
                />
                <p className="text-lg text-gray-300 leading-relaxed">
                  With over 25 years of culinary experience, Chef Marco
                  Bellacorte brings authentic Italian flavors with a modern
                  twist. His passion for fresh ingredients and innovative
                  techniques has earned Bella Vista numerous accolades and a
                  loyal following.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  &quot;Every dish tells a story of our heritage, our passion,
                  and our commitment to excellence. We don&apos;t just serve
                  food; we create memories.&quot;
                </p>
                <Link
                  href="/about"
                  className="interactive inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-all duration-300 transform hover:scale-105"
                >
                  Learn More About Us
                </Link>
              </div>
            </FadeContent>

            <FadeContent direction="right" delay={300}>
              <div className="relative">
                <div className="relative w-full h-96">
                  <Image
                    src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    alt="Chef Marco cooking"
                    fill
                    className="object-cover rounded-2xl shadow-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 rounded-lg shadow-xl">
                  <p className="font-bold text-lg">
                    &quot;Passion on every plate&quot;
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

      {/* Quick Contact Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* <SplitText className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Visit Us Today
          </SplitText> */}
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

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto text-center">
          <SplitText
            text="Ready for an Unforgettable Experience?"
            className="text-4xl md:text-5xl font-bold text-white mb-6 text-center w-[59vw]"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px 0px -20% 0px"
          />
          <FadeContent>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us for an evening of exceptional cuisine, warm hospitality,
              and memories that will last a lifetime.
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
    </div>
  );
};

export default Home;
