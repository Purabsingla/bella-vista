"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText/SplitText";
import FadeContent from "@/components/FadeContent";
import { MapPin, Phone, Clock, Mail, Send, MessageSquare } from "lucide-react";
import Toast from "@/components/Toast";
import { Great_Vibes, Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success logic
    showToast("Message sent successfully!", "success");
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-16 relative overflow-hidden">
      {/* 1. Subtle Background Texture (Verified Unsplash Noise) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover" />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative py-28 px-4 text-center z-10">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />

        <FadeContent>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span
              className={`${manrope.className} text-amber-500 tracking-[0.3em] text-xs uppercase font-bold`}
            >
              Get In Touch
            </span>
            <div className="h-[1px] w-12 bg-amber-500/50" />
          </div>

          <h1
            className={`${greatVibes.className} relative z-10 text-7xl md:text-9xl text-white mb-6 drop-shadow-2xl`}
          >
            Contact Us
          </h1>

          <p
            className={`${playfair.className} relative z-10 text-2xl md:text-3xl text-stone-300 max-w-2xl mx-auto italic font-light tracking-wide leading-relaxed`}
          >
            &quot;We&apos;d love to hear from you. For reservations, private
            events, or simply to say hello.&quot;
          </p>
        </FadeContent>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* --- LEFT COLUMN: Info & Map --- */}
          <div className="space-y-12">
            <FadeContent direction="left">
              <div className="bg-stone-900/30 backdrop-blur-md border border-stone-800 p-10 rounded-sm">
                <h3
                  className={`${playfair.className} text-3xl text-white mb-8`}
                >
                  Information
                </h3>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-6 group">
                    <div className="bg-stone-950 p-4 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                      <MapPin className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4
                        className={`${manrope.className} text-white font-bold uppercase tracking-widest text-sm mb-2`}
                      >
                        Location
                      </h4>
                      <p
                        className={`${manrope.className} text-stone-400 font-light leading-relaxed`}
                      >
                        123 Culinary Street, Downtown District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-6 group">
                    <div className="bg-stone-950 p-4 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                      <Phone className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4
                        className={`${manrope.className} text-white font-bold uppercase tracking-widest text-sm mb-2`}
                      >
                        Reservations
                      </h4>
                      <p
                        className={`${manrope.className} text-stone-400 font-light leading-relaxed`}
                      >
                        (555) 123-4567
                        <br />
                        <span className="text-stone-500 text-xs">
                          Available 10am - 10pm
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-6 group">
                    <div className="bg-stone-950 p-4 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                      <Mail className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4
                        className={`${manrope.className} text-white font-bold uppercase tracking-widest text-sm mb-2`}
                      >
                        Email
                      </h4>
                      <p
                        className={`${manrope.className} text-stone-400 font-light leading-relaxed`}
                      >
                        concierge@bellavista.com
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-6 group">
                    <div className="bg-stone-950 p-4 border border-stone-800 group-hover:border-amber-500/50 transition-colors">
                      <Clock className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4
                        className={`${manrope.className} text-white font-bold uppercase tracking-widest text-sm mb-2`}
                      >
                        Hours
                      </h4>
                      <div
                        className={`${manrope.className} text-stone-400 font-light space-y-1`}
                      >
                        <p className="flex justify-between w-48">
                          <span>Mon - Thu:</span> <span>5pm - 10pm</span>
                        </p>
                        <p className="flex justify-between w-48">
                          <span>Fri - Sat:</span> <span>5pm - 11pm</span>
                        </p>
                        <p className="flex justify-between w-48">
                          <span>Sun:</span> <span>4pm - 9pm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeContent>

            {/* Map */}
            <FadeContent direction="left" delay={200}>
              <div className="h-64 w-full border border-stone-800 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98513058459418!3d40.758896000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622222222222!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </FadeContent>
          </div>

          {/* --- RIGHT COLUMN: Form --- */}
          <FadeContent direction="right">
            <div className="bg-stone-900/30 backdrop-blur-md border border-stone-800 p-10 rounded-sm h-full">
              <div className="mb-8">
                <span
                  className={`${manrope.className} text-amber-500 uppercase tracking-widest text-xs font-bold`}
                >
                  Message Us
                </span>
                <h3
                  className={`${playfair.className} text-3xl text-white mt-2`}
                >
                  Send a Request
                </h3>
              </div>

              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-green-900/30 bg-green-900/10 rounded-sm">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4
                    className={`${playfair.className} text-2xl text-white mb-2`}
                  >
                    Message Sent
                  </h4>
                  <p className={`${manrope.className} text-stone-400`}>
                    Thank you. Our concierge will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="group">
                    <label
                      htmlFor="name"
                      className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-stone-950 border-b border-stone-800 text-white px-4 py-4 focus:outline-none focus:border-amber-500 focus:bg-stone-900/50 transition-all duration-300 placeholder-stone-700"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label
                      htmlFor="email"
                      className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-stone-950 border-b border-stone-800 text-white px-4 py-4 focus:outline-none focus:border-amber-500 focus:bg-stone-900/50 transition-all duration-300 placeholder-stone-700"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div className="group">
                    <label
                      htmlFor="subject"
                      className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                    >
                      Inquiry Type
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-stone-950 border-b border-stone-800 text-white px-4 py-4 focus:outline-none focus:border-amber-500 focus:bg-stone-900/50 transition-all duration-300 appearance-none"
                    >
                      <option value="" className="text-stone-500">
                        Select a subject
                      </option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="event">Private Event</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label
                      htmlFor="message"
                      className={`${manrope.className} block text-stone-500 text-xs uppercase tracking-widest font-bold mb-2 group-focus-within:text-amber-500 transition-colors`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-stone-950 border-b border-stone-800 text-white px-4 py-4 focus:outline-none focus:border-amber-500 focus:bg-stone-900/50 transition-all duration-300 placeholder-stone-700 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative px-8 py-4 bg-white text-stone-950 hover:bg-amber-500 hover:text-white transition-all duration-300 mt-4 overflow-hidden rounded-sm"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-stone-400 border-t-stone-900 rounded-full animate-spin" />
                      ) : (
                        <>
                          <span
                            className={`${manrope.className} text-sm font-bold uppercase tracking-widest`}
                          >
                            Send Message
                          </span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </button>
                </form>
              )}
            </div>
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default Contact;
