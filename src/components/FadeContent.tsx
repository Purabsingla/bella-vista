"use client";

import React, { useEffect, useRef, useState } from "react";

interface FadeContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getTransformClass = () => {
    if (isVisible) return "opacity-100 translate-x-0 translate-y-0";

    switch (direction) {
      case "up":
        return "opacity-0 translate-y-8";
      case "down":
        return "opacity-0 -translate-y-8";
      case "left":
        return "opacity-0 translate-x-8";
      case "right":
        return "opacity-0 -translate-x-8";
      default:
        return "opacity-0 translate-y-8";
    }
  };

  return (
    <div
      ref={contentRef}
      className={`transition-all duration-1000 ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeContent;
