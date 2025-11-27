"use client";

import React, { useEffect, useRef, useState } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Use refs for mutable values to avoid re-renders during animation loop
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // 1. Mouse Movement Handler
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Initial show
      if (!isVisible) setIsVisible(true);

      // Move the small dot instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    // 2. Hover Handlers
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check for interactive elements
      const interactive =
        target.matches("button, a, input, textarea, select") ||
        target.closest("button, a, input, textarea, select") ||
        target.classList.contains("interactive");

      isHovering.current = !!interactive;
    };

    // 3. Animation Loop (The "Liquid" Physics)
    const animate = () => {
      // Linear Interpolation (Lerp) for smooth trailing
      // 0.1 = speed (lower is slower/smoother, higher is snappier)
      follower.current.x += (mouse.current.x - follower.current.x) * 0.1;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.1;

      if (followerRef.current) {
        const scale = isHovering.current ? 1.5 : 1;
        const opacity = isHovering.current ? 0.8 : 0.3;

        followerRef.current.style.transform = `translate3d(${follower.current.x}px, ${follower.current.y}px, 0) scale(${scale})`;
        followerRef.current.style.opacity = opacity.toString();
      }

      requestAnimationFrame(animate);
    };

    // 4. Attach Listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    // Start Animation Loop
    const animationFrame = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible]);

  // Hide on mobile/touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Small Dot (Instant) */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] -mt-1 -ml-1 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Large Ring (Smooth Follower) */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-12 h-12 border border-amber-500 rounded-full pointer-events-none z-[9998] -mt-6 -ml-6 transition-opacity duration-300 will-change-transform ${
          isVisible ? "opacity-30" : "opacity-0"
        }`}
      />
    </>
  );
};

export default CustomCursor;
