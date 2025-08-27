import ShinyText from "./ShinyText";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
          <ShinyText>Bella Vista</ShinyText>
        </h1>
        <p className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed">
          Where culinary artistry meets warm hospitality in the heart of the
          city
        </p>
        <div className="space-x-4">
          <button className="interactive bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View Menu
          </button>
          <button className="interactive border-2 border-amber-400 text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
            Book Table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
