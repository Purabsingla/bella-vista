"use client";

import React, { useState } from "react";
import { Menu, X, Utensils, ShoppingBagIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Playfair_Display, Montserrat } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import LoaderLink from "./LoaderLink";

const playfairDisplay = Playfair_Display({
  weight: "400",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { user, logout } = useAuth();
  const { getTotalItems, setIsCartOpen } = useCart();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/reservation", label: "Reservation" },
  ];

  const isActive = (path: string) => pathName === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <LoaderLink
            href="/"
            className="interactive flex items-center space-x-2"
          >
            <Utensils className="w-8 h-8 text-amber-400" />
            <span
              className={`text-xl font-bold text-white ${playfairDisplay.className}`}
            >
              Bella Vista
            </span>
          </LoaderLink>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <LoaderLink
                  key={item.path}
                  href={item.path}
                  className={`interactive px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-amber-600 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }
                  ${montserrat.className}
                  `}
                >
                  {item.label}
                </LoaderLink>
              ))}
            </div>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="interactive relative p-2 text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="interactive flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <UserIcon className="w-6 h-6" />
                  <span className="text-sm">{user.displayName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <LoaderLink
                      href="/reservation/my"
                      className="interactive block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      My Reservations
                    </LoaderLink>
                    <button
                      onClick={logout}
                      className="interactive w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <LoaderLink
                href="/auth"
                className="interactive bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-500 transition-colors"
              >
                Sign In
              </LoaderLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="interactive bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-lg">
            {navItems.map((item) => (
              <LoaderLink
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`interactive block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-amber-600 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }
                ${montserrat.className} `}
              >
                {item.label}
              </LoaderLink>
            ))}

            {/* Mobile User Actions */}
            <div className="border-t border-white/20 pt-3 mt-3">
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsOpen(false);
                }}
                className="interactive flex items-center justify-between w-full px-3 py-2 text-gray-300 hover:text-white"
              >
                <span>Cart</span>
                {getTotalItems() > 0 && (
                  <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {user ? (
                <>
                  <div className="px-3 py-2 text-gray-400 text-sm">
                    Signed in as {user.displayName}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="interactive block w-full text-left px-3 py-2 text-gray-300 hover:text-white"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <LoaderLink
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="interactive block px-3 py-2 text-amber-400 hover:text-amber-300"
                >
                  Sign In
                </LoaderLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
