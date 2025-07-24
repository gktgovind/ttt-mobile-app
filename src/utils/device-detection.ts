'use client';

import { useEffect, useState } from 'react';

export type Device = 'mobile' | 'desktop';

// Client-side device detection
export function useDeviceDetection(): Device {
  const [deviceType, setDeviceType] = useState<Device>('desktop');

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobile = mobileRegex.test(navigator.userAgent);
      setDeviceType(isMobile ? 'mobile' : 'desktop');
    }
  }, []);

  return deviceType;
}

// Function for server-side detection (for fallback)
export function getDeviceType(userAgent: string): Device {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent) ? 'mobile' : 'desktop';
}