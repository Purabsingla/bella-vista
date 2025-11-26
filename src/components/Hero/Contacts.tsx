"use client";
import FadeContent from "@/components/FadeContent";
import SplitText from "../SplitText/SplitText";
import { Clock, MapPin, Phone, LucideIcon } from "lucide-react";

interface ContactProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  line1: string;
  line2: string;
  delay: number;
}

export default function Contact() {
  return (
    <section className="py-24 px-4 bg-stone-950 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-500 text-sm uppercase tracking-widest mb-4">
            Find Us
          </p>
          <SplitText
            text="Visit Our Location"
            className="text-4xl md:text-5xl font-serif text-white mb-12"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0}
            rootMargin="0px 0px -20px 0px"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <ContactCard
            icon={<MapPin />}
            title="Location"
            line1="123 Culinary Avenue, Suite 100"
            line2="New York, NY 10012"
            delay={0}
          />
          <ContactCard
            icon={<Phone />}
            title="Reservations"
            line1="+1 (555) 123-4567"
            line2="booking@bellavista.com"
            delay={200}
          />
          <ContactCard
            icon={<Clock />}
            title="Opening Hours"
            line1="Tue - Sun: 5:00 PM - 11:00 PM"
            line2="Monday: Closed"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
}

const ContactCard = ({ icon, title, line1, line2, delay }: ContactProps) => (
  <FadeContent delay={delay}>
    <div className="h-full text-center bg-stone-900/50 backdrop-blur-sm border border-stone-800 p-10 hover:border-amber-500/30 transition-all duration-500 group">
      <div className="w-12 h-12 mx-auto mb-6 text-stone-400 group-hover:text-amber-500 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-white mb-4">{title}</h3>
      <p className="text-stone-400 font-light leading-relaxed">
        {line1}
        <br />
        {line2}
      </p>
    </div>
  </FadeContent>
);
