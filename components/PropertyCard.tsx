import React from 'react';
import { Property } from '../types';
import { Bed, Bath, Square, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
      onClick={() => onClick(property)}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <ImageWithSkeleton 
          src={property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider text-white shadow-sm z-20 ${property.category === 'Sale' ? 'bg-accent' : 'bg-primary'}`}>
          For {property.category}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider text-primary z-20">
          {property.type}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
          <p className="text-white font-bold text-xl font-serif">
            {property.priceLabel || `KES ${property.price.toLocaleString()}`}
          </p>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-primary mb-1 font-serif group-hover:text-accent transition-colors line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <MapPin size={14} className="mr-1 shrink-0" />
            <span className="truncate">{property.address}, {property.city}</span>
          </div>
          
          <div className="flex justify-between items-center text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1">
              <Bed size={18} className="text-accent" />
              <span className="text-sm font-medium">{property.beds} <span className="text-gray-400 text-xs font-normal hidden sm:inline">Beds</span></span>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={18} className="text-accent" />
              <span className="text-sm font-medium">{property.baths} <span className="text-gray-400 text-xs font-normal hidden sm:inline">Baths</span></span>
            </div>
            <div className="flex items-center gap-1">
              <Square size={18} className="text-accent" />
              <span className="text-sm font-medium">{property.sqft} <span className="text-gray-400 text-xs font-normal hidden sm:inline">Sq M</span></span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4">
           <button className="w-full text-center text-sm font-semibold text-accent group-hover:text-primary transition-colors flex items-center justify-center gap-1">
             View Details <ArrowRight size={14}/>
           </button>
        </div>
      </div>
    </div>
  );
};