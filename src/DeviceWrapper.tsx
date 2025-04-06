import { useEffect, useState } from "react";
import App from "./App";
import MobileApp from "./MobileApp";

const DeviceWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  if (isMobile) {
    return <MobileApp />;
  }

  return <>{children}</>;
};

export default DeviceWrapper;
