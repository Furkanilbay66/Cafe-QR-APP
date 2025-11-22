import React, { useState } from 'react';

/**
 * Tek ProductImage component - Tüm projede kullanılabilir
 * 
 * Özellikler:
 * - Lazy loading
 * - Blur-up effect
 * - srcset (responsive)
 * - Fallback (online/offline)
 * - Error handling
 */
const ProductImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = "(max-width: 600px) 400px, 800px",
  fallback = '/images/fallback.jpg'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    e.target.style.filter = 'blur(0px)';
    e.target.style.opacity = '1';
  };

  const handleError = (e) => {
    if (hasError) return; // Sonsuz döngü önleme
    setHasError(true);
    
    // Önce yerel fallback dene
    if (navigator.onLine) {
      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
    } else {
      e.target.src = fallback;
    }
  };

  return (
    <img 
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${isLoaded ? 'loaded' : ''}`}
      style={{
        filter: isLoaded ? 'blur(0px)' : 'blur(8px)',
        opacity: isLoaded ? 1 : 0,
        transition: 'filter 0.3s ease-out, opacity 0.3s ease-out'
      }}
    />
  );
};

export default ProductImage;

