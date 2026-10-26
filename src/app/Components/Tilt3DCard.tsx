"use client";
import React, { useRef, useState, MouseEvent } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glareOpacity?: number;
  perspective?: number;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.015,
  glareOpacity = 0.14,
  perspective = 1000,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  );
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    const rotateY = xPct * maxTilt * 2;
    const rotateX = -yPct * maxTilt * 2;

    setTransformStyle(
      `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
    setGlarePosition({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    );
    setGlarePosition((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: "preserve-3d",
        transition: glarePosition.active
          ? "transform 120ms cubic-bezier(0.03, 0.98, 0.52, 0.99)"
          : "transform 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      {/* Dynamic 3D Specular Spotlight Glare */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 overflow-hidden transition-opacity duration-300"
        style={{
          opacity: glarePosition.active ? 1 : 0,
          background: `radial-gradient(420px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(59, 130, 246, ${glareOpacity}), rgba(99, 102, 241, ${
            glareOpacity * 0.5
          }) 40%, transparent 75%)`,
        }}
      />
      {children}
    </div>
  );
};

export default Tilt3DCard;
