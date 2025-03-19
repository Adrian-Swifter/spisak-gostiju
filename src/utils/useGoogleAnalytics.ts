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
    // Ensure GA script is not added multiple times
    if (!window.dataLayer) {
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
          send_page_view: true,
        });
      };
    }
  }, []);
};

export default useGoogleAnalytics;
