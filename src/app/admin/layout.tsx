"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Utensils,
  ChevronRight,
} from "lucide-react";
import { Playfair_Display, Manrope } from "next/font/google";

// --- FONTS ---
const playfair = Playfair_Display({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathName = usePathname();

  const sidebarItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/reservations", icon: Calendar, label: "Reservations" },
    { path: "/admin/orders", icon: Package, label: "Orders" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") return pathName === "/admin";
    return pathName.startsWith(path);
  };

  return (
    <div
      className={`min-h-screen bg-stone-950 text-stone-200 ${manrope.className} flex`}
    >
      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-stone-900 border-r border-stone-800 transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-stone-800 bg-stone-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-600/10 flex items-center justify-center border border-amber-600/20">
              <Utensils className="w-4 h-4 text-amber-500" />
            </div>
            <span
              className={`${playfair.className} text-xl font-bold text-white tracking-wide`}
            >
              Bella Vista
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden ml-auto text-stone-500 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-4">
            Management
          </p>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)} // Close on mobile click
                className={`group flex items-center justify-between px-4 py-3 rounded-sm transition-all duration-200 ${
                  active
                    ? "bg-amber-950/20 text-amber-500 border-l-2 border-amber-500"
                    : "text-stone-400 hover:bg-stone-800 hover:text-white border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      active
                        ? "text-amber-500"
                        : "text-stone-500 group-hover:text-white"
                    }`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {active && <ChevronRight className="w-4 h-4 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Snippet (Bottom Sidebar) */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/30">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold shadow-lg">
              M
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                Marco Bellacorte
              </p>
              <p className="text-xs text-stone-500 truncate">Head Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Header */}
        <header className="h-20 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-md transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Breadcrumb or Page Title Placeholder */}
            <h2
              className={`${playfair.className} text-xl text-white hidden md:block`}
            >
              Dashboard Overview
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Admin Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-stone-900 px-3 py-2 rounded-sm transition-colors border border-transparent hover:border-stone-800"
              >
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-stone-300 hidden md:block">
                  Account
                </span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-stone-900 border border-stone-800 rounded-sm shadow-2xl z-50 py-1 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-stone-800">
                      <p className="text-sm font-bold text-white">
                        Marco Bellacorte
                      </p>
                      <p className="text-xs text-stone-500">
                        admin@bellavista.com
                      </p>
                    </div>
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <div className="border-t border-stone-800 my-1"></div>
                    <button className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-950/10 hover:text-red-400 transition-colors text-left">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content Rendered Here */}
        <main className="flex-1 overflow-y-auto bg-stone-950 p-6 lg:p-10 relative">
          {/* Optional: Faint background grain for texture */}
          <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover mix-blend-overlay" />
          <div className="relative z-10">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
