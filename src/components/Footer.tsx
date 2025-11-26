import { Great_Vibes, Manrope } from "next/font/google";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        {/* 1. Brand Signature */}
        <div className="mb-6">
          <h3
            className={`${greatVibes.className} text-5xl md:text-6xl text-amber-500 mb-2`}
          >
            Bella Vista
          </h3>
          <p
            className={`${manrope.className} text-stone-400 tracking-widest text-xs uppercase font-medium opacity-60`}
          >
            Fine Dining Experience Since 1995
          </p>
        </div>

        {/* 2. Divider */}
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-stone-700 to-transparent my-8" />

        {/* 3. Social & Navigation Links */}
        <div className="flex gap-8 mb-10">
          <SocialLink href="#" icon={<Instagram size={20} />} />
          <SocialLink href="#" icon={<Twitter size={20} />} />
          <SocialLink href="#" icon={<Facebook size={20} />} />
        </div>

        {/* 4. Copyright */}
        <p className={`${manrope.className} text-stone-600 text-sm font-light`}>
          © 2025 Bella Vista Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Helper for hover effects
const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-stone-400 hover:text-amber-500 hover:scale-110 transition-all duration-300 p-2 border border-transparent hover:border-stone-800 rounded-full hover:bg-stone-900"
  >
    {icon}
  </Link>
);

export default Footer;
