import Aurora from "@/components/Aurora";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Hero/Features";
import Stats from "@/components/Hero/Stats";
import Story from "@/components/Hero/ChefStory";
import Contact from "@/components/Hero/Contacts";
import CTA from "@/components/Hero/CTA";

const Home = () => {
  console.log("ORD".padEnd(3, "0") + String(100));
  return (
    <div className="relative min-h-screen">
      <Aurora />

      {/* Hero Section */}
      <Hero />

      {/* Quick Features */}
      <Features />

      {/* Restaurant Stats */}
      <Stats />

      {/* Chef's Story Preview */}
      <Story />

      {/* Quick Contact Info */}
      <Contact />

      {/* Call to Action */}
      <CTA />
    </div>
  );
};

export default Home;
