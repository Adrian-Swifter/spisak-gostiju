import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-K7PCLHL61R";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const useGoogleAnalytics = () => {
  useEffect(() => {
    // Add Google Analytics script only once
    if (!window.gtag) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
          window.dataLayer.push(args);
        };

        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID, {
          send_page_view: false, // Prevent duplicate initial page load
        });

        // Track the initial page load
        trackPageView();
      };
    }
  }, []);

  // Function to track page views manually
  const trackPageView = () => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: window.location.hostname + window.location.pathname,
      });
    }
  };

  // Track URL changes in single-page apps
  useEffect(() => {
    const observer = new MutationObserver(() => {
      trackPageView();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

export default useGoogleAnalytics;
