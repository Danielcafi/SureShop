import { useEffect, useState } from 'react';

export const usePerformance = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Check connection speed
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const slowConnections = ['slow-2g', '2g', '3g'];
      setIsSlowConnection(slowConnections.includes(connection.effectiveType));
    }

    // Check device capabilities
    const checkDeviceCapabilities = () => {
      const memory = (performance as any).memory;
      const cores = navigator.hardwareConcurrency || 1;
      
      // Consider device low-end if:
      // - Less than 4GB RAM (if available)
      // - Less than 4 CPU cores
      // - Small screen (mobile)
      const isLowMemory = memory && memory.jsHeapSizeLimit < 4 * 1024 * 1024 * 1024;
      const isLowCores = cores < 4;
      const isMobile = window.innerWidth < 768;
      
      setIsLowEndDevice(isLowMemory || isLowCores || isMobile);
    };

    checkDeviceCapabilities();
    window.addEventListener('resize', checkDeviceCapabilities);
    
    return () => window.removeEventListener('resize', checkDeviceCapabilities);
  }, []);

  return {
    isSlowConnection,
    isLowEndDevice,
    shouldOptimizeImages: isSlowConnection || isLowEndDevice,
    shouldLazyLoad: true, // Always lazy load for better performance
    shouldReduceAnimations: isLowEndDevice
  };
};

export const useImagePreloading = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map(url => {
        if (loadedImages.has(url) || loadingImages.has(url)) return Promise.resolve();
        
        setLoadingImages(prev => new Set(prev).add(url));
        
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(url));
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
            resolve();
          };
          img.onerror = () => {
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
            resolve();
          };
          img.src = url;
        });
      });

      await Promise.all(promises);
    };

    preloadImages();
  }, [imageUrls, loadedImages, loadingImages]);

  return {
    loadedImages,
    loadingImages,
    isImageLoaded: (url: string) => loadedImages.has(url),
    isImageLoading: (url: string) => loadingImages.has(url)
  };
};
