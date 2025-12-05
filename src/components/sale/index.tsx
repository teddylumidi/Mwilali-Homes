import React, { useState } from 'react';
import { MOCK_PROPERTIES } from '../../../constants';
import { PropertyCard } from '../../../components/PropertyCard';
import { PropertyModal } from '../../../components/PropertyModal';
import { Property } from '../../../types';

const Sale = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const properties = MOCK_PROPERTIES.filter(p => p.category === 'Sale');

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-serif mb-4">
            Properties For Sale
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our exclusive collection of premium residential developments in Nairobi's most sought-after neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {properties.map(property => (
            <PropertyCard 
              key={property.id}
              property={property} 
              onClick={setSelectedProperty} 
            />
          ))}
        </div>
      </div>

      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </div>
  );
};

export default Sale;