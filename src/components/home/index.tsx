
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onNavigate?: (view: 'home' | 'about' | 'sale' | 'rent' | 'contact') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="relative h-[60vh] min-h-[400px] text-white flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/properties/nairobi-skyline.webp"
            alt="Nairobi skyline"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <h1 className="text-sm sm:text-base lg:text-lg font-bold text-accent tracking-[0.3em] uppercase animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Secure Your Space Today
          </h1>
          <p className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-serif font-bold leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Elevating Urban <br />Living.
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Discover Brookside Oak and Oak Breeze. Premium developments designed for luxury, comfort, and high returns on investment.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={() => onNavigate?.('sale')}
              className="bg-accent text-primary-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              View Projects
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-lg font-semibold"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary font-serif mb-4">Our Premium Developments</h2>
            <p className="text-lg text-gray-600">Discover exceptional living in Nairobi's most sought-after locations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Brookside Oak */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/properties/1BR 65SQM.webp"
                  alt="Brookside Oak"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-2">Brookside Oak</h3>
                  <p className="text-white/90 text-sm">Westlands, Nairobi</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  A Premier Project by Oak Developers. Experience luxury living in the heart of Westlands within the UN Blue Zone.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-accent font-serif">From KES 8.8M</span>
                  <span className="text-sm text-gray-500">40 Months Payment Plan</span>
                </div>
                <button 
                  onClick={() => onNavigate?.('sale')}
                  className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Oak Breeze */}
            <div className="group bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/properties/1BR 45SQM-1.webp"
                  alt="Oak Breeze"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-2">Oak Breeze</h3>
                  <p className="text-white/90 text-sm">Kilimani, Nairobi</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Elevating Urban Living to New Heights! Exceptional 1 & 2-bedroom apartments located along Wood Avenue in Kilimani.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-accent font-serif">From KES 5.65M</span>
                  <span className="text-sm text-gray-500">3 Years Payment Plan</span>
                </div>
                <button 
                  onClick={() => onNavigate?.('sale')}
                  className="w-full bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="/images/properties/Luxury Real Estate Nairobi.webp"
            alt="Luxury real estate in Nairobi"
            className="w-full h-64 sm:h-80 object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
