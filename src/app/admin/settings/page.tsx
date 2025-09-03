"use client";

import React, { useState } from "react";
import { Save, Clock, Users, CreditCard, Bell } from "lucide-react";

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure your restaurant settings and preferences
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <Save className="w-5 h-5" />
          Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Restaurant Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Restaurant Hours
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Time
              </label>
              <input
                type="time"
                name="openingTime"
                value={settings.openingTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Time
              </label>
              <input
                type="time"
                name="closingTime"
                value={settings.closingTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Table Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Table Settings
            </h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Seats Per Table
            </label>
            <input
              type="number"
              name="maxSeatsPerTable"
              value={settings.maxSeatsPerTable}
              onChange={handleChange}
              min="1"
              max="20"
              className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum number of guests per table reservation
            </p>
          </div>
        </div>

        {/* Payment Gateway */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Gateway
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stripe Publishable Key
              </label>
              <input
                type="text"
                name="stripePublicKey"
                value={settings.stripePublicKey}
                onChange={handleChange}
                placeholder="pk_test_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stripe Secret Key
              </label>
              <input
                type="password"
                name="stripeSecretKey"
                value={settings.stripeSecretKey}
                onChange={handleChange}
                placeholder="sk_test_..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive email alerts for new reservations
                </p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  SMS Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive SMS alerts for urgent updates
                </p>
              </div>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleChange}
                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Auto-approve Reservations
                </label>
                <p className="text-sm text-gray-500">
                  Automatically approve reservations without manual review
                </p>
              </div>
              <input
                type="checkbox"
                name="autoApproveReservations"
                checked={settings.autoApproveReservations}
                onChange={handleChange}
                className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
