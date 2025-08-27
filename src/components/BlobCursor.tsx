"use client";

import React, { useEffect, useState } from "react";

const BlobCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
      "button, a, .interactive, input, textarea"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main blob cursor */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x - 20}px`,
          top: `${mousePosition.y - 20}px`,
          width: isHovering ? "60px" : isClicking ? "30px" : "40px",
          height: isHovering ? "60px" : isClicking ? "30px" : "40px",
          background: isHovering
            ? "radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.4) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(245, 158, 11, 0.3) 70%, transparent 100%)",
          borderRadius: "50%",
          transform: `scale(${isClicking ? 0.8 : 1})`,
        }}
      />

      {/* Trailing particles */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-500 ease-out"
        style={{
          left: `${mousePosition.x - 8}px`,
          top: `${mousePosition.y - 8}px`,
          width: "16px",
          height: "16px",
          background: "rgba(251, 191, 36, 0.4)",
          borderRadius: "50%",
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      />

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-30 border-2 border-amber-400/30 rounded-full transition-all duration-700 ease-out"
        style={{
          left: `${mousePosition.x - 30}px`,
          top: `${mousePosition.y - 30}px`,
          width: "60px",
          height: "60px",
          transform: `scale(${isHovering ? 1.5 : 1}) rotate(${
            mousePosition.x * 0.1
          }deg)`,
          opacity: isHovering ? 0.8 : 0.3,
        }}
      />
    </>
  );
};

export default BlobCursor;
