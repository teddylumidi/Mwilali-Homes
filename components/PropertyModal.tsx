import React from 'react';
import { Property } from '../types';
import { X, Check, MapPin, Bed, Bath, Square, Phone, Mail } from 'lucide-react';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-none sm:rounded-lg shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in duration-300 border-t-4 border-accent">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <X size={24} className="text-gray-800" />
        </button>

        <div className="h-64 sm:h-80 w-full relative shrink-0">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent p-6 sm:p-8">
             <div className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 mb-3 uppercase tracking-widest">
                For {property.category}
             </div>
             <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-2">{property.title}</h2>
             <div className="flex items-center text-white/90 text-lg">
                <MapPin size={20} className="mr-2" />
                {property.address}, {property.city}
             </div>
           </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8 bg-cream">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Price</p>
              <p className="text-3xl sm:text-4xl font-bold text-accent font-serif">{property.priceLabel || `KES ${property.price.toLocaleString()}`}</p>
            </div>
            <div className="flex gap-6 sm:gap-12 bg-white p-4 rounded-lg shadow-sm">
               <div className="flex flex-col items-center min-w-[60px]">
                  <Bed size={24} className="text-primary mb-1" />
                  <span className="font-bold text-lg text-gray-800">{property.beds}</span>
                  <span className="text-xs text-gray-500 uppercase">Beds</span>
               </div>
               <div className="flex flex-col items-center min-w-[60px]">
                  <Bath size={24} className="text-primary mb-1" />
                  <span className="font-bold text-lg text-gray-800">{property.baths}</span>
                  <span className="text-xs text-gray-500 uppercase">Baths</span>
               </div>
               <div className="flex flex-col items-center min-w-[60px]">
                  <Square size={24} className="text-primary mb-1" />
                  <span className="font-bold text-lg text-gray-800">{property.sqft}</span>
                  <span className="text-xs text-gray-500 uppercase">Sq M</span>
               </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 font-serif border-l-4 border-accent pl-3">Property Details</h3>
                <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  {property.description}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4 font-serif border-l-4 border-accent pl-3">Amenities & Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 bg-white p-3 rounded border border-gray-100">
                      <Check size={18} className="text-accent mr-3 shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-primary text-white p-6 rounded-lg shadow-xl sticky top-6">
                <h3 className="text-2xl font-bold mb-2 font-serif">Interested?</h3>
                <p className="text-gray-300 mb-6 text-sm">
                  Secure your space today. Contact Mwalali Homes for bookings and inquiries.
                </p>
                
                <div className="space-y-4 mb-6">
                    <a href="tel:+254721615737" className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors">
                        <Phone size={18} />
                        <span className="font-mono text-sm">+254 721 615 737</span>
                    </a>
                    <a href="tel:+254701009827" className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors">
                        <Phone size={18} />
                        <span className="font-mono text-sm">+254 701 009 827</span>
                    </a>
                    <a href="mailto:mwalalihomes@gmail.com" className="flex items-center gap-3 text-white/90 hover:text-accent transition-colors">
                        <Mail size={18} />
                        <span className="text-sm">mwalalihomes@gmail.com</span>
                    </a>
                </div>

                <a 
                  href={`mailto:mwalalihomes@gmail.com?subject=Payment Plan Request for ${property.title}&body=I am interested in requesting a payment plan for ${property.title}. Please provide more details.`}
                  className="w-full bg-accent hover:bg-orange-700 text-white font-bold py-4 px-4 rounded transition-all shadow-lg flex items-center justify-center gap-2 mb-3 uppercase tracking-wider text-sm text-center block"
                >
                  Request Payment Plan
                </a>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded transition-colors text-sm border border-white/20">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};