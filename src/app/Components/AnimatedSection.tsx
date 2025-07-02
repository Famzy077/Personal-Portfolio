'use client';
import React from 'react';
import useOnScreen from "../Hooks/useOnScreen";

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <div
            ref={ref as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ease-in-out ${className} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;
