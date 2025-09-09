"use client";

import React, { useState } from "react";
import SplitText from "@/components/SplitText";
import FadeContent from "@/components/FadeContent";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";
import Toast from "@/components/Toast";

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
    const response = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    showToast(
      result.success
        ? "Message sent successfully!"
        : "Failed to send message. Please try again.",
      result.success ? "success" : "error"
    );

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 4 seconds
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

  const BackgroundAnimations = React.useMemo(
    () => (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-yellow-400/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>
    ),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 relative overflow-hidden">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />

      {/* Liquid Background Animation */}
      {BackgroundAnimations}

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <SplitText className="text-5xl md:text-6xl font-bold text-white mb-4">
          Contact Us
        </SplitText>
        <FadeContent delay={500}>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Get in touch with us for
            reservations, inquiries, or just to say hello.
          </p>
        </FadeContent>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <FadeContent direction="left">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-3xl font-bold text-white mb-8">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-amber-600 p-3 rounded-full flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Visit Us
                      </h4>
                      <p className="text-gray-300">
                        123 Culinary Street
                        <br />
                        Downtown District
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-amber-600 p-3 rounded-full flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Call Us</h4>
                      <p className="text-gray-300">
                        Main: (555) 123-4567
                        <br />
                        Reservations: (555) 123-4568
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-amber-600 p-3 rounded-full flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Email Us
                      </h4>
                      <p className="text-gray-300">
                        info@bellavista.com
                        <br />
                        reservations@bellavista.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-amber-600 p-3 rounded-full flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Opening Hours
                      </h4>
                      <div className="text-gray-300 space-y-1">
                        <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                        <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                        <p>Sunday: 4:00 PM - 9:00 PM</p>
                        <p className="text-amber-400 font-semibold mt-2">
                          Closed on major holidays
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeContent>

            {/* Map */}
            <FadeContent direction="left" delay={300}>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Find Us</h3>
                <div className="w-full h-80 bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959662076!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </FadeContent>
          </div>

          {/* Contact Form */}
          <FadeContent direction="right">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-white mb-8">
                Send us a Message
              </h3>

              {isSubmitted && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-6 flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm opacity-90">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-white font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-800">
                      Select a subject
                    </option>
                    <option value="reservation" className="bg-gray-800">
                      Reservation Inquiry
                    </option>
                    <option value="event" className="bg-gray-800">
                      Private Event
                    </option>
                    <option value="feedback" className="bg-gray-800">
                      Feedback
                    </option>
                    <option value="general" className="bg-gray-800">
                      General Question
                    </option>
                    <option value="other" className="bg-gray-800">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="interactive w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="interactive w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-sm text-center">
                  For immediate assistance, please call us at{" "}
                  <a
                    href="tel:+15551234567"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </p>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </div>
  );
};

export default Contact;
