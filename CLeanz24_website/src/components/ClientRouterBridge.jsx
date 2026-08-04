'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import LaundryLoading from '../app/best-laundry-drycleaning/loading';
import CarSpaLoading from '../app/car-spa/loading';

export default function ClientRouterBridge({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [targetPath, setTargetPath] = useState('');

  // Stop loading when navigation is complete
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  // Intercept click events to start loading early
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href) {
        try {
          const url = new URL(target.href);
          
          // Check if it's an internal navigation link that changes the route
          if (
            url.origin === window.location.origin &&
            (url.pathname !== window.location.pathname || url.search !== window.location.search) &&
            !target.hasAttribute('download') &&
            target.target !== '_blank'
          ) {
            setTargetPath(url.pathname);
            setIsLoading(true);
          }
        } catch (err) {
          // Ignore invalid URLs
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {isLoading && (
        targetPath.includes('car-spa') ? <CarSpaLoading /> : <LaundryLoading />
      )}
      {children}
    </>
  );
}
