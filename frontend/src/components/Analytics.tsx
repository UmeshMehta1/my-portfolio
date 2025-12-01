'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

