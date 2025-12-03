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
  const isPdf = typeof src === 'string' && src.toLowerCase().endsWith('.pdf');

  if (isPdf) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {status === 'loading' && (
          <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10 ${skeletonClassName}`}>
             <Loader2 className="animate-spin text-gray-400" />
          </div>
        )}
        
        {/* PDF Viewer via Iframe */}
        <iframe
          src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
          className="w-full h-full border-0 bg-white"
          title={alt}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          // @ts-ignore - loading attribute is supported in modern browsers
          loading={props.loading}
        />

        {/* Transparent overlay to intercept clicks and pass them to parent (for Modal/Lightbox opening) */}
        <div className="absolute inset-0 bg-transparent cursor-pointer z-20" />
      </div>
    );
  }

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
                    // Try to recover with a generated placeholder if not already trying
                    const width = target.width || 800;
                    const height = target.height || 600;
                    const cleanAlt = alt ? alt.substring(0, 30) : 'Property';
                    // Using placehold.co for fallback
                    target.src = `https://placehold.co/${width}x${height}/e2e8f0/475569/png?text=${encodeURIComponent(cleanAlt)}`;
                    // Don't set error status yet, let the fallback load
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