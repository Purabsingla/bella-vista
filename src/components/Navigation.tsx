"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Utensils,
  ShoppingBagIcon,
  UserIcon,
  LogOut,
  Calendar,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Great_Vibes, Manrope } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import LoaderLink from "./LoaderLink";

// 1. Load the same fonts as Hero/Footer for consistency
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
});
const manrope = Manrope({
  subsets: ["latin"],
});

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();
  const { user, logout } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart();

  // Add scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "Story" }, // Renamed "About" to "Story" for luxury feel
    { path: "/reservation", label: "Reservations" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => pathName === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled || isOpen
          ? "bg-stone-950/90 backdrop-blur-md border-stone-800 py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* --- LOGO --- */}
          <LoaderLink
            href="/"
            className="interactive flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-600/10 flex items-center justify-center border border-amber-600/20 group-hover:border-amber-500/50 transition-all duration-300">
              <Utensils className="w-5 h-5 text-amber-500" />
            </div>
            <span className={`text-3xl text-amber-500 ${greatVibes.className}`}>
              Bella Vista
            </span>
          </LoaderLink>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <LoaderLink
                  key={item.path}
                  href={item.path}
                  className={`relative text-sm font-bold tracking-widest uppercase transition-all duration-300 group py-2 ${
                    isActive(item.path)
                      ? "text-amber-500"
                      : "text-stone-400 hover:text-white"
                  } ${manrope.className}`}
                >
                  {item.label}
                  {/* Elegant Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-1/2"
                    }`}
                  />
                </LoaderLink>
              ))}
            </div>
          </div>

          {/* --- DESKTOP USER ACTIONS --- */}
          <div className="hidden md:flex items-center gap-6">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="interactive group relative p-2 text-stone-400 hover:text-amber-500 transition-colors"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="interactive flex items-center gap-2 text-stone-400 hover:text-white transition-colors py-2">
                  <span
                    className={`${manrope.className} text-xs font-bold uppercase tracking-wider`}
                  >
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <UserIcon className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-stone-950 border border-stone-800 rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                  <div className="py-2">
                    <LoaderLink
                      href="/reservation/my"
                      className="interactive flex items-center gap-3 px-4 py-3 text-sm text-stone-400 hover:text-white hover:bg-stone-900 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      My Reservations
                    </LoaderLink>
                    <button
                      onClick={logout}
                      className="interactive flex w-full items-center gap-3 text-left px-4 py-3 text-sm text-amber-500 hover:text-amber-400 hover:bg-stone-900 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <LoaderLink
                href="/auth"
                className={`${manrope.className} interactive px-6 py-2 bg-white text-stone-950 hover:bg-amber-500 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest`}
              >
                Sign In
              </LoaderLink>
            )}
          </div>

          {/* --- MOBILE HAMBURGER --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="interactive p-2 text-stone-400 hover:text-amber-500 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {/* Changed to slide down for smoother effect */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-stone-950 border-b border-stone-800 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navItems.map((item) => (
            <LoaderLink
              key={item.path}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`interactive block px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-amber-900/20 text-amber-500 border-l-2 border-amber-500"
                  : "text-stone-400 hover:bg-stone-900 hover:text-white"
              } ${manrope.className}`}
            >
              {item.label}
            </LoaderLink>
          ))}

          <div className="h-[1px] bg-stone-800 my-4" />

          {/* Mobile User Actions */}
          <div className="space-y-3">
            <button
              onClick={() => {
                setIsCartOpen(true);
                setIsOpen(false);
              }}
              className="interactive flex items-center justify-between w-full px-4 py-3 text-stone-300 hover:bg-stone-900 hover:text-white rounded-sm"
            >
              <div className="flex items-center gap-3">
                <ShoppingBagIcon className="w-5 h-5 text-amber-500" />
                <span
                  className={`${manrope.className} text-sm font-bold uppercase`}
                >
                  Cart
                </span>
              </div>
              {getTotalItems() > 0 && (
                <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {user ? (
              <>
                <div className="px-4 py-2 text-stone-500 text-xs uppercase tracking-widest">
                  Signed in as {user.displayName}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="interactive block w-full text-left px-4 py-3 text-amber-500 hover:bg-stone-900 rounded-sm text-sm font-bold uppercase"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <LoaderLink
                href="/auth"
                onClick={() => setIsOpen(false)}
                className="interactive block text-center px-4 py-3 bg-amber-600 text-white hover:bg-amber-500 rounded-sm text-sm font-bold uppercase tracking-widest"
              >
                Sign In
              </LoaderLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
