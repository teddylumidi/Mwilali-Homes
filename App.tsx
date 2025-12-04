import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PROPERTIES } from './constants';
import { Property } from './types';
import { PropertyCard } from './components/PropertyCard';
import { SkeletonPropertyCard } from './components/SkeletonPropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { ImageWithSkeleton } from './components/ImageWithSkeleton';
import { Search, MapPin, Menu, X, Phone, Mail, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

type View = 'home' | 'about' | 'sale' | 'rent' | 'contact';

const MwalaliLogo = React.memo(({ className = "", variant = "light" }: { className?: string, variant?: "light" | "dark" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-col justify-center">
        <span className={`font-serif font-bold text-2xl leading-none tracking-wide ${variant === 'light' ? 'text-primary' : 'text-white'}`}>MWALALI</span>
        <span className="font-sans font-bold text-[0.6rem] tracking-[0.38em] uppercase mt-0.5 ml-0.5 text-accent">HOMES</span>
      </div>
    </div>
  );
});

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [allProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    project: 'Brookside Oak',
    message: ''
  });

  const displayedProperties = useMemo(() => {
    let properties = allProperties;
    if (currentView === 'sale') {
      properties = allProperties.filter(p => p.category === 'Sale');
    } else if (currentView === 'rent') {
      properties = allProperties.filter(p => p.category === 'Rent');
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      return properties.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.city.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.address.toLowerCase().includes(lowerQuery)
      );
    }
    return properties;
  }, [currentView, allProperties, searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setCurrentView('sale');
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website Inquiry: ${contactForm.project}`);
    const body = encodeURIComponent(
      `Name: ${contactForm.name}\n` +
      `Email: ${contactForm.email}\n` +
      `Phone: ${contactForm.phone}\n` +
      `Project of Interest: ${contactForm.project}\n\n` +
      `Message:\n${contactForm.message}`
    );
    window.location.href = `mailto:mwalalihomes@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const NavLink = React.memo(({ view, label }: { view: View; label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => {
          setCurrentView(view);
          setMobileMenuOpen(false);
        }}
        className={`relative px-2 py-1 text-sm font-semibold transition-all duration-300 ease-in-out uppercase tracking-wider group ${
          isActive ? 'text-accent' : 'text-gray-600 hover:text-accent'
        }`}
      >
        {label}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform transition-transform duration-300 ease-in-out origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
      </button>
    );
  });

  const MobileNavLink = React.memo(({ view, label }: { view: View; label: string }) => {
    const isActive = currentView === view;
    return (
      <button 
        onClick={() => {
          setCurrentView(view);
          setMobileMenuOpen(false);
        }}
        className={`group block w-full text-left px-6 py-4 text-base font-semibold transition-all duration-300 ease-in-out border-l-4 ${
          isActive 
            ? 'border-accent bg-accent/5 text-accent pl-8' 
            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:pl-8'
        }`}
      >
        <div className="flex justify-between items-center">
          {label}
          <ArrowRight 
            size={16} 
            className={`transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} 
          />
        </div>
      </button>
    );
  });

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans text-gray-800">
      
      <div className="bg-primary text-white text-xs py-2 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-6">
                <span className="flex items-center gap-2"><Phone size={12} className="text-accent"/> +254 721 615 737</span>
                <span className="flex items-center gap-2"><Mail size={12} className="text-accent"/> mwalalihomes@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin size={12} className="text-accent"/> Kilimani, Nairobi, Kenya
            </div>
        </div>
      </div>

      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
                className="cursor-pointer" 
                onClick={() => setCurrentView('home')}
            >
              <MwalaliLogo variant="light" />
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink view="home" label="Home" />
              <NavLink view="about" label="About Us" />
              <NavLink view="sale" label="For Sale" />
              <NavLink view="rent" label="For Rent" />
              <NavLink view="contact" label="Contact Us" />
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-primary p-2 transition-transform duration-200 active:scale-95"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div 
          className={`md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
             mobileMenuOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
          }`}
        >
          <div className="py-2 flex flex-col">
            <MobileNavLink view="home" label="Home" />
            <MobileNavLink view="about" label="About Us" />
            <MobileNavLink view="sale" label="For Sale" />
            <MobileNavLink view="rent" label="For Rent" />
            <MobileNavLink view="contact" label="Contact Us" />
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        
        {currentView === 'home' && (
          <>
            <div className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <ImageWithSkeleton 
                        src={`/images/properties/Luxury%20Real%20Estate%20Nairobi.webp`}
                        alt="Luxury Real Estate Nairobi" 
                        className="w-full h-full object-cover"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-12">
                    <div className="max-w-2xl">
                        <div className="inline-block bg-accent/90 text-white text-xs font-bold px-3 py-1 mb-4 uppercase tracking-widest rounded-sm">
                            Secure Your Space Today
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif leading-tight text-shadow">
                            Elevating Urban <br/> <span className="text-accent">Living.</span>
                        </h1>
                        <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed font-light">
                            Discover Brookside Oak and Oak Breeze. Premium developments designed for luxury, comfort, and high returns on investment.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button 
                                onClick={() => setCurrentView('sale')}
                                className="bg-accent hover:bg-orange-700 text-white px-8 py-4 font-semibold uppercase tracking-wider transition-all shadow-lg text-sm"
                            >
                                View Projects
                            </button>
                            <button 
                                onClick={() => setCurrentView('contact')}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 font-semibold uppercase tracking-wider transition-all text-sm"
                            >
                                Contact Us
                            </button>
                        </div>

                        <form onSubmit={handleSearch} className="bg-white p-2 rounded shadow-2xl flex max-w-md">
                            <input 
                                type="text"
                                placeholder="Search by location or budget..."
                                className="flex-grow px-4 py-2 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button 
                                type="submit"
                                className="bg-primary text-white p-3 rounded-sm hover:bg-gray-800 transition-colors"
                            >
                                {isSearching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Search size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Welcome to Mwalali Homes</h2>
                    <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                        Based in Kilimani, Nairobi, we specialize in delivering high-end residential projects that blend modern architecture with functional living. 
                        Whether you are looking for a dream home or a high-yield investment, our portfolio offers unmatched value.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="p-6 border border-gray-100 rounded hover:shadow-lg transition-all">
                            <Home className="mx-auto text-accent mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Prime Locations</h3>
                            <p className="text-gray-500 text-sm">Strategic positioning in Westlands & Kilimani.</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded hover:shadow-lg transition-all">
                            <CheckCircle2 className="mx-auto text-accent mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
                            <p className="text-gray-500 text-sm">UN-standard security and modern finishes.</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded hover:shadow-lg transition-all">
                            <ArrowRight className="mx-auto text-accent mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2">High Returns</h3>
                            <p className="text-gray-500 text-sm">Ideal for investors seeking rental income.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Featured Developments</h2>
                            <p className="text-gray-500 mt-2">Exclusive listings by Oak Developers</p>
                        </div>
                        <button 
                            onClick={() => setCurrentView('sale')}
                            className="hidden sm:flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors"
                        >
                            View All <ArrowRight size={18} />
                        </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {isLoading ? (
                           <>
                             <SkeletonPropertyCard />
                             <SkeletonPropertyCard />
                           </>
                        ) : (
                          allProperties.filter(p => p.category === 'Sale').slice(0, 2).map(property => (
                              <PropertyCard key={property.id} property={property} onClick={setSelectedProperty} />
                          ))
                        )}
                    </div>
                    
                    <button 
                        onClick={() => setCurrentView('sale')}
                        className="w-full sm:hidden mt-8 bg-white border border-gray-300 text-primary py-3 rounded font-medium"
                    >
                        View All Projects
                    </button>
                </div>
            </section>
          </>
        )}

        {currentView === 'about' && (
          <div className="py-20 max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">About Mwalali Homes</h2>
            <div className="w-20 h-1 bg-accent mb-8"></div>
            <div className="prose prose-lg text-gray-600">
                <p>
                    Mwalali Homes is a modern real estate agency based in Nairobi, Kenya, specializing in residential sales, off-plan marketing, and property promotions for premium urban developments.
We combine deep market knowledge with innovative marketing to deliver exceptional value to both developers and home buyers.
                </p>
                <p>
                    With a commitment to professionalism, transparency, and personalized service, Mwalali Homes has positioned itself as a trusted partner for clients seeking stylish, functional, and investment-worthy homes in Nairobi’s most sought-after neighborhoods
                    Welcome to Mwalali Homes <strong>Where your next chapter begins.</strong>. 
                </p>
                <ImageWithSkeleton 
                    src={`/images/properties/nairobi-skyline.webp`}
                    alt="Nairobi Skyline" 
                    className="w-full h-64 object-cover rounded-lg my-8 shadow-xl"
                    loading="lazy"
                />
                <h3>Why Choose Us?</h3>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Deep local market knowledge of Nairobi's prime zones.</li>
                    <li>Direct access to developer prices and early booking discounts.</li>
                    <li>End-to-end support from viewing to key handover.</li>
                </ul>
            </div>
            <div className="mt-12 bg-primary text-white p-8 rounded-lg text-center">
                <h3 className="text-2xl font-serif mb-4">Ready to invest?</h3>
                <button onClick={() => setCurrentView('contact')} className="bg-accent text-white px-8 py-3 rounded uppercase tracking-wider font-bold hover:bg-white hover:text-primary transition-colors">
                    Get in Touch
                </button>
            </div>
          </div>
        )}

        {(currentView === 'sale' || currentView === 'rent') && (
          <div className="py-12 max-w-7xl mx-auto px-4">
            <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary">
                    {currentView === 'sale' ? 'Properties For Sale' : 'Properties For Rent'}
                </h2>
                <p className="text-gray-500 mt-2">
                    {isLoading ? 'Searching...' : `${displayedProperties.length} listings found`}
                </p>
            </div>
            
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <SkeletonPropertyCard key={i} />)}
                </div>
            ) : (
                displayedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedProperties.map(property => (
                            <PropertyCard key={property.id} property={property} onClick={setSelectedProperty} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-gray-500">No properties found matching your criteria.</p>
                        <button onClick={() => { setSearchQuery(''); setCurrentView('sale'); }} className="mt-4 bg-accent text-white px-6 py-2 rounded font-semibold">
                            Clear Search
                        </button>
                    </div>
                )
            )}
          </div>
        )}

        {currentView === 'contact' && (
          <div className="bg-gray-50 min-h-screen">
             <div className="bg-primary text-white py-20 text-center">
                <h2 className="text-4xl font-serif font-bold mb-4">Contact Us</h2>
                <p className="text-gray-300">We'd love to hear from you. Secure your unit today.</p>
             </div>
             
             <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-xl h-full">
                        <h3 className="text-2xl font-bold font-serif text-primary mb-6">Get in Touch</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <Phone className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Phone</p>
                                    <p className="text-gray-600">+254 721 615 737</p>
                                    <p className="text-gray-600">+254 701 009 827</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <Mail className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Email</p>
                                    <p className="text-gray-600">mwalalihomes@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-accent/10 p-3 rounded-full">
                                    <MapPin className="text-accent" size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">Location</p>
                                    <p className="text-gray-600">Kilimani, Nairobi, Kenya</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h3 className="text-2xl font-bold font-serif text-primary mb-6">Send a Message</h3>
                        <form className="space-y-4" onSubmit={handleContactSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                  type="text" 
                                  name="name"
                                  value={contactForm.name}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-accent" 
                                  placeholder="John Doe" 
                                  required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input 
                                  type="email" 
                                  name="email"
                                  value={contactForm.email}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-accent" 
                                  placeholder="john@example.com" 
                                  required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input 
                                  type="tel" 
                                  name="phone"
                                  value={contactForm.phone}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-accent" 
                                  placeholder="+254..." 
                                  required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interested Project</label>
                                <select 
                                  name="project"
                                  value={contactForm.project}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-accent"
                                >
                                    <option>Brookside Oak</option>
                                    <option>Oak Breeze</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea 
                                  name="message"
                                  value={contactForm.message}
                                  onChange={handleInputChange}
                                  className="w-full bg-gray-50 border border-gray-200 rounded p-3 focus:outline-none focus:border-accent h-32" 
                                  placeholder="I'm interested in the 2 bedroom unit..."
                                  required
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded hover:bg-gray-800 transition-colors uppercase tracking-widest">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
             </div>
          </div>
        )}

      </main>

      <footer className="bg-primary text-white pt-16 pb-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                     <MwalaliLogo variant="dark" className="mb-4" />
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Your trusted partner for luxury real estate in Nairobi. We connect you with premium developments like Brookside Oak and Oak Breeze.
                    </p>
                </div>
                
                <div>
                    <h4 className="text-lg font-bold mb-6 font-serif border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
                    <ul className="space-y-3 text-gray-400">
                        <li><button onClick={() => setCurrentView('home')} className="hover:text-accent transition-colors">Home</button></li>
                        <li><button onClick={() => setCurrentView('about')} className-="hover:text-accent transition-colors">About Us</button></li>
                        <li><button onClick={() => setCurrentView('sale')} className="hover:text-accent transition-colors">Properties For Sale</button></li>
                        <li><button onClick={() => setCurrentView('contact')} className="hover:text-accent transition-colors">Contact Us</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-6 font-serif border-b border-gray-700 pb-2 inline-block">Contact Info</h4>
                    <ul className="space-y-4 text-gray-400">
                         <li className="flex items-start gap-3">
                            <MapPin className="text-accent shrink-0" size={20} />
                            <span>Kilimani, Nairobi, Kenya</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="text-accent shrink-0" size={20} />
                            <span>+254 721 615 737 / +254 701 009 827</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail className="text-accent shrink-0" size={20} />
                            <span>mwalalihomes@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Mwalali Homes. All rights reserved.</p>
            </div>
        </div>
      </footer>

      <PropertyModal 
        property={selectedProperty} 
        onClose={() => setSelectedProperty(null)} 
      />
    </div>
  );
};

export default App;
