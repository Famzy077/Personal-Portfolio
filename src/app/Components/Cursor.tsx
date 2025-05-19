// components/CustomCursor.tsx
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  // Initialize the cursor's state
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    scale: 1,
    background: 'rgba(0, 0, 0, 0.7)',
  });

  // Update the cursor's position on mouse move
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  // OPTIONAL: If you want to change the cursor style on hovering over certain elements
  // you can add event delegation here or attach listeners to specific elements.
  // For example, to change the cursor when hovering over all <a> tags:
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a') {
        setCursor((prev) => ({ ...prev, scale: 1.5, background: 'red' }));
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a') {
        setCursor((prev) => ({ ...prev, scale: 1, background: 'rgba(0, 0, 0, 0.7)' }));
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: cursor.x,
        top: cursor.y,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: cursor.background,
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) scale(${cursor.scale})`,
        transition: 'transform 0.1s ease, background-color 0.3s ease',
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
