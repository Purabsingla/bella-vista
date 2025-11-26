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
import Footer from "@/components/Footer";

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
                {!conditionalNavBar && <Footer />}
              </div>
            </AuthProvider>
          </CartProvider>
        </LoaderProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
