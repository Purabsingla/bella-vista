"use client";
import FadeContent from "@/components/FadeContent";

export default function Features() {
  return (
    <section className="py-20 px-4 bg-black/30 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto">
        <FadeContent>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fine Dining</h3>
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
  );
}
