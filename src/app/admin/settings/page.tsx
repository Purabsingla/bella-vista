"use client";

import React, { useState } from "react";
import {
  Save,
  Clock,
  Users,
  CreditCard,
  Bell,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    openingTime: "17:00",
    closingTime: "22:00",
    maxSeatsPerTable: 8,
    stripePublicKey: "",
    stripeSecretKey: "",
    emailNotifications: true,
    smsNotifications: false,
    autoApproveReservations: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSaving(false);
    setIsSaved(true);

    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div
      className={`p-6 md:p-10 space-y-8 text-stone-200 ${manrope.className}`}
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1
            className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-2`}
          >
            Settings
          </h1>
          <p className="text-stone-400 text-sm">
            Configure your restaurant preferences and integrations.
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-sm flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-top-2">
          <Save className="w-5 h-5" />
          <span className="text-sm font-medium">
            Settings saved successfully!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- RESTAURANT HOURS --- */}
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-sm shadow-lg">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-stone-800">
            <div className="bg-blue-900/20 p-2 rounded-full border border-blue-500/20">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3
                className={`${playfair.className} text-xl font-bold text-white`}
              >
                Restaurant Hours
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Set your standard operating hours.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 block group-focus-within:text-amber-500 transition-colors">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                value={settings.openingTime}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm [color-scheme:dark]"
              />
            </div>
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 block group-focus-within:text-amber-500 transition-colors">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={settings.closingTime}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* --- TABLE SETTINGS --- */}
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-sm shadow-lg">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-stone-800">
            <div className="bg-purple-900/20 p-2 rounded-full border border-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3
                className={`${playfair.className} text-xl font-bold text-white`}
              >
                Capacity
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Manage seating arrangements.
              </p>
            </div>
          </div>

          <div className="group">
            <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 block group-focus-within:text-amber-500 transition-colors">
              Maximum Seats Per Table
            </label>
            <input
              type="number"
              name="maxSeatsPerTable"
              value={settings.maxSeatsPerTable}
              onChange={handleChange}
              min="1"
              max="20"
              className="w-full md:w-48 bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
            />
            <p className="text-xs text-stone-500 mt-2 italic">
              Limits the party size for online reservations.
            </p>
          </div>
        </div>

        {/* --- PAYMENT GATEWAY --- */}
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-sm shadow-lg">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-stone-800">
            <div className="bg-emerald-900/20 p-2 rounded-full border border-emerald-500/20">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3
                className={`${playfair.className} text-xl font-bold text-white`}
              >
                Payments
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Stripe API configuration.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 block group-focus-within:text-amber-500 transition-colors">
                Stripe Publishable Key
              </label>
              <input
                type="text"
                name="stripePublicKey"
                value={settings.stripePublicKey}
                onChange={handleChange}
                placeholder="pk_test_..."
                className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm font-mono placeholder-stone-700"
              />
            </div>
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2 block group-focus-within:text-amber-500 transition-colors">
                Stripe Secret Key
              </label>
              <input
                type="password"
                name="stripeSecretKey"
                value={settings.stripeSecretKey}
                onChange={handleChange}
                placeholder="sk_test_..."
                className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm font-mono placeholder-stone-700"
              />
            </div>
          </div>
        </div>

        {/* --- NOTIFICATIONS --- */}
        <div className="bg-stone-900 border border-stone-800 p-8 rounded-sm shadow-lg">
          <div className="flex items-center gap-4 mb-8 pb-4 border-b border-stone-800">
            <div className="bg-amber-900/20 p-2 rounded-full border border-amber-500/20">
              <Bell className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3
                className={`${playfair.className} text-xl font-bold text-white`}
              >
                Notifications
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Manage alerts and automation.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email Toggle */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border border-stone-800 rounded-sm">
              <div>
                <label className="text-sm font-bold text-white block mb-1">
                  Email Notifications
                </label>
                <p className="text-xs text-stone-500">
                  Receive alerts for new reservations via email.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            {/* SMS Toggle */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border border-stone-800 rounded-sm">
              <div>
                <label className="text-sm font-bold text-white block mb-1">
                  SMS Notifications
                </label>
                <p className="text-xs text-stone-500">
                  Receive urgent alerts via text message.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>

            {/* Auto-Approve Toggle */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border border-stone-800 rounded-sm">
              <div>
                <label className="text-sm font-bold text-white block mb-1">
                  Auto-approve Reservations
                </label>
                <p className="text-xs text-stone-500">
                  Skip manual review for standard bookings.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="autoApproveReservations"
                  checked={settings.autoApproveReservations}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-800 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* --- SAVE ACTION --- */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="group relative px-8 py-3 bg-amber-600 text-white font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-2">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
