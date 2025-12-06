import React from 'react';
// @ts-ignore - No type declarations available for this package
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClassName?: string;
  placeholderSrc?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ 
  src, 
  alt, 
  className = "", 
  placeholderSrc,
  ...props 
}) => {
  const isPdf = typeof src === 'string' && src.toLowerCase().endsWith('.pdf');

  const fallbackSrc =
    placeholderSrc ||
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  if (isPdf) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
          className="w-full h-full border-0 bg-white"
          title={alt}
          loading={props.loading as "lazy" | "eager" | undefined}
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
      placeholderSrc={placeholderSrc}
      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallbackSrc) {
          target.src = fallbackSrc;
        }
      }}
      {...props}
    />
  );
};
