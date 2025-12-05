import React from 'react';
import { Building2, MapPin, Phone, Mail } from 'lucide-react';

const Rent = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-serif mb-4">
            Rental Properties
          </h1>
          <p className="text-lg text-gray-600">
            Flexible rental options available for select units
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 mb-8">
          <div className="text-center mb-8">
            <Building2 size={64} className="text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary font-serif mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are preparing an exclusive selection of rental units in our premium developments. 
              Contact us to express your interest and get early access to availability.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-xl font-bold text-primary mb-6 text-center">Interested in Renting?</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-accent" />
                  Available Locations
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Westlands - Brookside Oak</li>
                  <li>• Kilimani - Oak Breeze</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-primary mb-4">Unit Options</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• 1 Bedroom Apartments</li>
                  <li>• 2 Bedroom Apartments</li>
                  <li>• 3 Bedroom Apartments</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">Get in Touch</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="tel:+254721615737" 
                className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors"
              >
                <Phone size={20} className="text-accent" />
                <span>0721 615 737 / 0701 009 827</span>
              </a>
              <a 
                href="mailto:mwalalihomes@gmail.com" 
                className="flex items-center gap-2 text-gray-700 hover:text-accent transition-colors"
              >
                <Mail size={20} className="text-accent" />
                <span>mwalalihomes@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;