
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-sm font-semibold text-accent tracking-widest uppercase">
          About Us – Mwalali Homes
        </h2>
        <p className="mt-8 text-lg text-gray-600 space-y-6 text-justify">
            Mwalali Homes is a modern real estate agency based in Nairobi, Kenya, specializing in residential sales, off-plan marketing, and property promotions for premium urban developments.
            We combine deep market knowledge with innovative marketing to deliver exceptional value to both developers and home buyers.
            With a commitment to professionalism, transparency, and personalized service, Mwalali Homes has positioned itself as a trusted partner for clients seeking stylish, functional, and investment-worthy homes in Nairobi’s most sought-after neighborhoods
        </p>
        <div className="mt-12 text-center">
            <p className="text-2xl font-serif font-semibold text-gray-800">Welcome to Mwalali Homes.</p>
            <p className="mt-2 text-lg text-gray-500">Where your next chapter begins.</p>
        </div>
        <div className="mt-16 border-t pt-10">
          <h3 className="text-center text-2xl font-serif font-bold text-gray-900 mb-6">Contact Us</h3>
          <div className="flex justify-center items-center flex-wrap gap-x-8 gap-y-4">
              <a href="tel:+254721615737" className="flex items-center gap-2 text-lg text-gray-600 hover:text-accent transition-colors">
                  <Phone size={20} className="text-accent"/>
                  <span>0721 615 737 / 0701 009 827</span>
              </a>
              <a href="mailto:mwalalihomes@gmail.com" className="flex items-center gap-2 text-lg text-gray-600 hover:text-accent transition-colors">
                  <Mail size={20} className="text-accent"/>
                  <span>mwalalihomes@gmail.com</span>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
