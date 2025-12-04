
import React, { useState } from 'react';

interface ImageWithSkeletonProps {
  src: string;
  placeholderSrc: string;
  alt: string;
  className?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ src, placeholderSrc, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <img 
          src={placeholderSrc}
          alt="Loading placeholder"
          className="w-full h-full object-cover filter blur-sm scale-105"
        />
      )}
      <img 
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        style={{ position: isLoading ? 'absolute' : 'static', top: 0, left: 0 }}
      />
    </div>
  );
};
