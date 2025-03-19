import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-K7PCLHL61R";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const useGoogleAnalytics = () => {
  useEffect(() => {
    // Load GA script only once
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

        // Initialize GA
        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID, {
          send_page_view: true,
        });

        console.log("✅ Google Analytics initialized");
      };
    }
  }, []);
};

export default useGoogleAnalytics;
