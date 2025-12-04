import React from 'react';

export const SkeletonPropertyCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-3" />
          
          {/* Address */}
          <div className="flex items-center gap-2 mb-4">
             <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse" />
             <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
          
          {/* Icons Row */}
          <div className="flex justify-between border-t border-gray-100 pt-4">
             <div className="flex gap-2 items-center">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
             </div>
             <div className="flex gap-2 items-center">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
             </div>
             <div className="flex gap-2 items-center">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
             </div>
          </div>
        </div>
        
        {/* Button */}
        <div className="h-10 bg-gray-100 rounded w-full animate-pulse mt-4" />
      </div>
    </div>
  );
};
