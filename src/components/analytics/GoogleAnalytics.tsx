import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const isEnabled = import.meta.env.PROD && Boolean(measurementId);

let isInitialized = false;
let lastTrackedPath = "";
let scriptLoadPromise: Promise<void> | null = null;

function isPrerendering() {
  return Boolean(window.__SHEPIT_PRERENDERING__);
}

function loadGtagScript(id: string): Promise<void> {
  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="https://www.googletagmanager.com/gtag/js?id=${id}"]`,
  );

  if (existingScript) {
    scriptLoadPromise = Promise.resolve();
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Analytics"));
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

function runWhenIdle<T>(callback: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const run = () => {
      callback().then(resolve).catch(reject);
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 2_000 });
      return;
    }

    setTimeout(run, 0);
  });
}

function initializeAnalytics(id: string): Promise<void> {
  if (isInitialized || isPrerendering()) {
    return scriptLoadPromise || Promise.resolve();
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: false,
  });

  isInitialized = true;
  return runWhenIdle(() => loadGtagScript(id));
}

function trackPageView(id: string, path: string) {
  if (!window.gtag || path === lastTrackedPath || isPrerendering()) {
    return;
  }

  lastTrackedPath = path;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
    send_to: id,
  });
}

export default function GoogleAnalytics() {
  const location = useLocation();
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isEnabled || !measurementId) {
      return;
    }

    void initializeAnalytics(measurementId);
  }, []);

  useEffect(() => {
    if (!isEnabled || !measurementId) {
      return;
    }

    const path = `${location.pathname}${location.search}`;
    let isCancelled = false;

    void initializeAnalytics(measurementId).then(() => {
      if (isCancelled) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(() => {
        trackPageView(measurementId, path);
      });
    });

    return () => {
      isCancelled = true;

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [location.pathname, location.search]);

  return null;
}
