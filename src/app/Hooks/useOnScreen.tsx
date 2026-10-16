"use client"
import { useEffect, useRef, useState } from "react";

const useOnScreen = (options?: IntersectionObserverInit): [React.RefObject<HTMLElement | null>, boolean] => {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const root = options?.root;
    const rootMargin = options?.rootMargin;
    const threshold = options?.threshold;

    useEffect(() => {
        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            !("IntersectionObserver" in window)
        ) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { root, rootMargin, threshold });

        const current = ref.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [root, rootMargin, threshold]);

    return [ref, isVisible];
};

export default useOnScreen;
