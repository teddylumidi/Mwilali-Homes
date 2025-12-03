
import React, { useState } from 'react';
import { Image as ImageIcon, AlertCircle, Loader2 } from 'lucide-react';

interface ImageWithSkeletonProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Allow passing specific classes for the skeleton background if needed
  skeletonClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({ 
  src, 
  alt, 
  className = "", 
  skeletonClassName = "",
  ...props 
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <>
      {/* Skeleton / Loading State */}
      {status === 'loading' && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10 ${skeletonClassName}`}>
           <ImageIcon className="text-gray-300 w-10 h-10 opacity-50" />
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className={`absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400 z-10 border border-gray-100`}>
           <AlertCircle className="w-8 h-8 mb-1 opacity-50" />
           <span className="text-xs font-medium">Image unavailable</span>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}
        onLoad={() => setStatus('loaded')}
        onError={(e) => {
            // Check if placehold.co fallback is already being used to prevent infinite loops
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('placehold.co')) {
                 if (props.onError) {
                    props.onError(e);
                 } else {
                    setStatus('error');
                 }
            } else {
                setStatus('error');
            }
        }}
        {...props}
      />
    </>
  );
};
