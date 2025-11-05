"use client";

import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";

export function useDevice(): DeviceType {
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return device;
}

export function useIsMobile(): boolean {
  const device = useDevice();
  return device === "mobile";
}

export function useIsTablet(): boolean {
  const device = useDevice();
  return device === "tablet";
}

export function useIsDesktop(): boolean {
  const device = useDevice();
  return device === "desktop";
}
