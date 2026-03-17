/**
 * useScrollFadeIn — Intersection Observer hook for scroll-triggered animations.
 * Add the returned `ref` to any element and it will get the `.visible` class
 * when it enters the viewport, triggering the CSS `.fade-up` animation.
 */

import { useEffect, useRef } from "react";

export function useScrollFadeIn<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el); // Only animate once
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
