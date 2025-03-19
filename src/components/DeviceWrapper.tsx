import { useEffect, useState } from "react";
import { MobileWarning } from "./MobileWarning";

const DeviceWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return <>{children}</>;
};

export default DeviceWrapper;
