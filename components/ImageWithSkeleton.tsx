import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ 
  src, 
  alt, 
  className = "", 
  ...props 
}) => {
  const isPdf = typeof src === 'string' && src.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
          className="w-full h-full border-0 bg-white"
          title={alt}
          // @ts-ignore - loading attribute is supported in modern browsers
          loading={props.loading}
        />
        <div className="absolute inset-0 bg-transparent cursor-pointer z-20" />
      </div>
    );
  }

  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      className={className}
      effect="blur"
      {...props}
    />
  );
};
