import Hero from "@/components/Hero/Hero";
import Features from "@/components/Hero/Features";
import Stats from "@/components/Hero/Stats";
import Story from "@/components/Hero/ChefStory";
import Contact from "@/components/Hero/Contacts";
import CTA from "@/components/Hero/CTA";

// Note: Ensure your global.css has @tailwind directives
// and you have installed: npm install lucide-react

export default function Home() {
  return (
    <main className="bg-stone-950 min-h-screen selection:bg-amber-500/30 selection:text-amber-100">
      <Hero />
      <Stats />
      <Story />
      <Features />
      <Contact />
      <CTA />
    </main>
  );
}
