import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { Search, MapPin, Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';

// Lazy-loaded components with better error boundaries
const HomeView = React.lazy(() => import('./src/components/home'));
const AboutView = React.lazy(() => import('./src/components/about'));
const SaleView = React.lazy(() => import('./src/components/sale'));
const RentView = React.lazy(() => import('./src/components/rent'));
const ContactView = React.lazy(() => import('./src/components/contact'));

type View = 'home' | 'about' | 'sale' | 'rent' | 'contact';

// Loading fallback component
const LoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]" role="status" aria-live="polite">
    <div className="spinner" aria-label="Loading content"></div>
    <span className="sr-only">Loading content, please wait...</span>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] p-8 text-center">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're sorry for the inconvenience. Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Logo Component with accessibility
const MwalaliLogo = React.memo(({ className = "", variant = "light" }: { className?: string, variant?: "light" | "dark" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/images/properties/logo.webp" 
        alt="Mwalali Homes - Premium Real Estate in Nairobi" 
        className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
        width="48"
        height="48"
        loading="eager"
      />
      <div className="flex flex-col justify-center">
        <span className={`font-serif font-bold text-2xl leading-none tracking-wide ${variant === 'light' ? 'text-primary' : 'text-white'}`}>
          MWALALI
        </span>
        <span className="font-sans font-bold text-[0.6rem] tracking-[0.38em] uppercase mt-0.5 ml-0.5 text-accent">
          HOMES
        </span>
      </div>
    </div>
  );
});

MwalaliLogo.displayName = 'MwalaliLogo';

// Navigation Link Component
const NavLink = React.memo(({ 
  view, 
  label, 
  isActive, 
  onClick 
}: { 
  view: View; 
  label: string; 
  isActive: boolean; 
  onClick: (view: View) => void;
}) => {
  return (
    <button 
      onClick={() => onClick(view)}
      className={`relative px-2 py-1 text-sm font-semibold transition-all duration-300 ease-in-out uppercase tracking-wider group ${
        isActive ? 'text-accent' : 'text-gray-600 hover:text-accent'
      }`}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Navigate to ${label}`}
    >
      {label}
      <span 
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform transition-transform duration-300 ease-in-out origin-left ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
        aria-hidden="true"
      ></span>
    </button>
  );
});

NavLink.displayName = 'NavLink';

// Mobile Navigation Link Component
const MobileNavLink = React.memo(({ 
  view, 
  label, 
  isActive, 
  onClick 
}: { 
  view: View; 
  label: string; 
  isActive: boolean; 
  onClick: (view: View) => void;
}) => {
  return (
    <button 
      onClick={() => onClick(view)}
      className={`group block w-full text-left px-6 py-4 text-base font-semibold transition-all duration-300 ease-in-out border-l-4 ${
        isActive 
          ? 'border-accent bg-accent/5 text-accent pl-8' 
          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:pl-8'
      }`}
      aria-current={isActive ? 'page' : undefined}
      aria-label={`Navigate to ${label}`}
    >
      <div className="flex justify-between items-center">
        {label}
        <ArrowRight 
          size={16} 
          className={`transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
});

MobileNavLink.displayName = 'MobileNavLink';

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update document title based on current view
  useEffect(() => {
    const titles: Record<View, string> = {
      home: 'Mwalali Homes | Premium Real Estate in Nairobi',
      about: 'About Us | Mwalali Homes',
      sale: 'Properties For Sale | Mwalali Homes',
      rent: 'Properties For Rent | Mwalali Homes',
      contact: 'Contact Us | Mwalali Homes'
    };
    document.title = titles[currentView];

    // Scroll to top on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu when view changes
    setMobileMenuOpen(false);
  }, [currentView]);

  // Handle navigation
  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  }, []);

  // Handle mobile menu toggle with keyboard support
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-cream flex flex-col font-sans text-gray-800">
        
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        {/* Top Bar */}
        <div className="bg-primary text-white text-xs py-2 px-4 hidden sm:block" role="banner">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-6">
              <a href="tel:+254721615737" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={12} className="text-accent" aria-hidden="true" />
                <span>+254 721 615 737</span>
              </a>
              <a href="mailto:mwalalihomes@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={12} className="text-accent" aria-hidden="true" />
                <span>mwalalihomes@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-accent" aria-hidden="true" />
              <span>Kilimani, Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm" role="navigation" aria-label="Main navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <button 
                className="cursor-pointer focus:outline-none" 
                onClick={() => handleNavigate('home')}
                aria-label="Mwalali Homes - Go to homepage"
              >
                <MwalaliLogo variant="light" />
              </button>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8 items-center">
                <NavLink view="home" label="Home" isActive={currentView === 'home'} onClick={handleNavigate} />
                <NavLink view="about" label="About Us" isActive={currentView === 'about'} onClick={handleNavigate} />
                <NavLink view="sale" label="Properties" isActive={currentView === 'sale'} onClick={handleNavigate} />
                <NavLink view="contact" label="Contact Us" isActive={currentView === 'contact'} onClick={handleNavigate} />
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu} 
                className="md:hidden text-primary p-2 transition-transform duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent rounded"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            id="mobile-menu"
            className={`md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-50 transition-all duration-300 ease-in-out origin-top overflow-hidden ${
              mobileMenuOpen ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}
            aria-hidden={!mobileMenuOpen}
          >
            <div className="py-2 flex flex-col">
              <MobileNavLink view="home" label="Home" isActive={currentView === 'home'} onClick={handleNavigate} />
              <MobileNavLink view="about" label="About Us" isActive={currentView === 'about'} onClick={handleNavigate} />
              <MobileNavLink view="sale" label="Properties" isActive={currentView === 'sale'} onClick={handleNavigate} />
              <MobileNavLink view="contact" label="Contact Us" isActive={currentView === 'contact'} onClick={handleNavigate} />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main id="main-content" className="flex-grow" role="main">
          <Suspense fallback={<LoadingFallback />}>
            {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}
            {currentView === 'about' && <AboutView />}
            {currentView === 'sale' && <SaleView onNavigate={handleNavigate} />}
            {currentView === 'rent' && <RentView />}
            {currentView === 'contact' && <ContactView />}
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-white pt-16 pb-8 border-t border-gray-800" role="contentinfo">
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
                  <li>
                    <button onClick={() => handleNavigate('home')} className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('about')} className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('sale')} className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
                      Properties For Sale
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('contact')} className="hover:text-accent transition-colors focus:outline-none focus:text-accent">
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-6 font-serif border-b border-gray-700 pb-2 inline-block">Contact Info</h4>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex items-start gap-3">
                    <MapPin className="text-accent shrink-0" size={20} aria-hidden="true" />
                    <span>Kilimani, Nairobi, Kenya</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="text-accent shrink-0" size={20} aria-hidden="true" />
                    <div className="flex flex-col">
                      <a href="tel:+254721615737" className="hover:text-accent transition-colors">
                        +254 721 615 737
                      </a>
                      <a href="tel:+254701009827" className="hover:text-accent transition-colors">
                        +254 701 009 827
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="text-accent shrink-0" size={20} aria-hidden="true" />
                    <a href="mailto:mwalalihomes@gmail.com" className="hover:text-accent transition-colors">
                      mwalalihomes@gmail.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
              <p>&copy; {new Date().getFullYear()} Mwalali Homes. All rights reserved.</p>
              <p className="text-xs">
                Built with ❤️ in Nairobi
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;
