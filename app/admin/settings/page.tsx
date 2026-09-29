"use client";

import { AdminNavbar } from "@/components/admin/navbar";
import { useState } from "react";
import { Check } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    phone: "0246447824",
    email: "abenahairstudio@gmail.com",
    location: "Osu, Accra",
    openingHours: "Mon-Sat: 8am - 7pm"
  });

  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setSaved(true);
    setIsSaving(false);

    // Hide success message after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <>
      <AdminNavbar title="Settings" />

      <main className="flex-1 overflow-auto">
        <div className="px-4 py-5 sm:px-6">
          <div className="max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Studio Settings
              </h2>
              <p className="text-gray-600">
                Update your studio contact information and details
              </p>
            </div>

            {/* Success Message */}
            {saved && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <Check size={18} />
                Settings saved successfully!
              </div>
            )}

            {/* Settings Form */}
            <form onSubmit={handleSave} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-black mb-6">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) =>
                        setSettings({ ...settings, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) =>
                        setSettings({ ...settings, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-black mb-6">
                  Operating Hours
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours
                  </label>
                  <input
                    type="text"
                    value={settings.openingHours}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        openingHours: e.target.value
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Example: Mon-Sat: 8am - 7pm
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full rounded-lg bg-black px-8 py-2 font-medium text-white transition hover:bg-gray-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="w-full rounded-lg border border-gray-300 px-8 py-2 font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                Database Integration
              </h4>
              <p className="text-sm text-blue-800">
                To connect this admin panel with your actual database (Supabase),
                update the API calls in:
                <code className="block bg-blue-100 px-3 py-1 rounded mt-2 font-mono text-xs">
                  /app/admin/{"{messages,bookings,settings}"}/page.tsx
                </code>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
