import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Search, MapPin, Menu, X, Phone, Mail, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

const HomeView = React.lazy(() => import('./src/components/home'));
const AboutView = React.lazy(() => import('./src/components/about'));
const SaleView = React.lazy(() => import('./src/components/sale'));
const RentView = React.lazy(() => import('./src/components/rent'));
const ContactView = React.lazy(() => import('./src/components/contact'));

type View = 'home' | 'about' | 'sale' | 'rent' | 'contact';

const MwalaliLogo = React.memo(({ className = "", variant = "light" }: { className?: string, variant?: "light" | "dark" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/images/properties/logo.webp" 
        alt="Mwalali Homes Logo" 
        className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
      <div className="flex-col justify-center">
        <span className={`font-serif font-bold text-2xl leading-none tracking-wide ${variant === 'light' ? 'text-primary' : 'text-white'}`}>MWALALI</span>
        <span className="font-sans font-bold text-[0.6rem] tracking-[0.38em] uppercase mt-0.5 ml-0.5 text-accent">HOMES</span>
      </div>
    </div>
  );
});

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    project: 'Brookside Oak',
    message: ''
  });

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
            <MobileNavLink view="sale" label="Brookside Oak" />
            <MobileNavLink view="rent" label="Oak Breeze" />
            <MobileNavLink view="contact" label="Contact Us" />
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Suspense fallback={<div>Loading...</div>}>
        {currentView === 'home' && (
          <HomeView onNavigate={setCurrentView} />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'sale' && (
          <SaleView />
        )}

        {currentView === 'rent' && (
          <RentView />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}
        </Suspense>
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
                        <li><button onClick={() => setCurrentView('about')} className="hover:text-accent transition-colors">About Us</button></li>
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
    </div>
  );
};

export default App;
