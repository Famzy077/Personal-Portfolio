"use client";
import React from "react";
import useOnScreen from "../Hooks/useOnScreen";

const AnimatedSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        transform: isVisible
          ? "perspective(1100px) rotateX(0deg) translate3d(0, 0px, 0px) scale(1)"
          : "perspective(1100px) rotateX(7deg) translate3d(0, 28px, -24px) scale(0.975)",
        opacity: isVisible ? 1 : 0,
        transition:
          "transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease-out",
        willChange: "transform, opacity",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
