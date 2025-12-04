
import React from 'react';
import { ImageWithSkeleton } from '../ImageWithSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      <div className="relative h-[60vh] min-h-[400px] text-white flex items-center">
        <div className="absolute inset-0">
          <ImageWithSkeleton 
            src="/images/properties/nairobi-skyline.webp"
            placeholderSrc="/images/placeholder.webp"
            alt="Nairobi skyline with modern architecture"
            className="w-full h-full object-cover"
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
            <Button size="lg" className="bg-accent text-primary-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105">
              View Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
