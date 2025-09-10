"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart";
import { usePathname } from "next/navigation";
import { LoaderProvider } from "@/context/LoaderContext";
import RouteChangeLoader from "@/components/RouteChangeLoader";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conditionalNavBar = usePathname().startsWith("/admin");
  return (
    <html lang="en">
      <head>
        <title>Bella Vista - Fine Dining</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoaderProvider>
          <CartProvider>
            <AuthProvider>
              {!conditionalNavBar && <Navigation />}
              <RouteChangeLoader />
              <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 cursor-none">
                <Cart />
                {children}
                {!conditionalNavBar && (
                  <footer className="bg-black/50 backdrop-blur-lg text-white py-8 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                      <h3 className="text-2xl font-bold mb-2">Bella Vista</h3>
                      <p className="text-gray-400 mb-4">
                        Fine dining experience since 1995
                      </p>
                      <p className="text-gray-500 text-sm">
                        © 2025 Bella Vista Restaurant. All rights reserved.
                      </p>
                    </div>
                  </footer>
                )}
              </div>
            </AuthProvider>
          </CartProvider>
        </LoaderProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
