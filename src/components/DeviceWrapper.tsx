import { useEffect, useState } from "react";
import MobileApp from "../MobileApp";

type DeviceWrapperProps = {
  children: React.ReactNode;
};

const DeviceWrapper = ({ children }: DeviceWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check both screen size and user agent for better mobile detection
    const checkMobile = () => {
      const isMobileByAgent = /Mobi|Android/i.test(navigator.userAgent);
      const isMobileByWidth = window.innerWidth <= 768;
      setIsMobile(isMobileByAgent || isMobileByWidth);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="device-wrapper">{isMobile ? <MobileApp /> : children}</div>
  );
};

export default DeviceWrapper;
