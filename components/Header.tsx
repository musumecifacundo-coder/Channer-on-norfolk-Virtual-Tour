import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: View, hash?: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    
    // Allow time for view transition before scrolling
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <button onClick={() => handleNavClick('home')} className="flex flex-col text-left">
          <span className={`font-serif text-2xl lg:text-3xl tracking-wide font-medium ${isScrolled ? 'text-norfolk-green' : 'text-white'}`}>
            CHANNERS
          </span>
          <span className={`font-sans text-xs tracking-widest uppercase ${isScrolled ? 'text-norfolk-clay' : 'text-gray-200'}`}>
            On Norfolk
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavClick('home', '#accommodation')}
            className={`font-sans text-sm font-medium tracking-wide hover:text-norfolk-clay transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Apartments
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className={`font-sans text-sm font-medium tracking-wide hover:text-norfolk-clay transition-colors ${currentView === 'packages' ? 'text-norfolk-clay underline underline-offset-4' : (isScrolled ? 'text-gray-700' : 'text-white')}`}
          >
            2026 Packages
          </button>
          <button
            onClick={() => handleNavClick('home', '#experiences')}
            className={`font-sans text-sm font-medium tracking-wide hover:text-norfolk-clay transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Experiences
          </button>
          <button
            onClick={() => handleNavClick('home', '#heritage')}
            className={`font-sans text-sm font-medium tracking-wide hover:text-norfolk-clay transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            Our History
          </button>
          <button
            onClick={() => handleNavClick('home', '#enquiry')}
            className={`px-5 py-2 font-serif text-lg leading-none border transition-all ${isScrolled ? 'border-norfolk-green text-norfolk-green hover:bg-norfolk-green hover:text-white' : 'border-white text-white hover:bg-white hover:text-norfolk-green'}`}
          >
            Enquire
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-norfolk-sand shadow-xl p-6 flex flex-col space-y-4 animate-fade-in">
          <button
            onClick={() => handleNavClick('home', '#accommodation')}
            className="text-left font-serif text-xl text-norfolk-green py-2 border-b border-gray-200"
          >
            Apartments
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="text-left font-serif text-xl text-norfolk-green py-2 border-b border-gray-200"
          >
            2026 Packages
          </button>
          <button
            onClick={() => handleNavClick('home', '#experiences')}
            className="text-left font-serif text-xl text-norfolk-green py-2 border-b border-gray-200"
          >
            Experiences
          </button>
          <button
            onClick={() => handleNavClick('home', '#heritage')}
            className="text-left font-serif text-xl text-norfolk-green py-2 border-b border-gray-200"
          >
            Our History
          </button>
          <button
             onClick={() => handleNavClick('home', '#enquiry')}
             className="w-full bg-norfolk-green text-white py-3 font-serif text-xl mt-4"
          >
            Check Availability
          </button>
          
          <div className="flex items-center space-x-2 text-norfolk-clay mt-4">
             <Phone size={18} />
             <span className="font-sans text-sm">Direct: +6723 22222</span>
          </div>
        </div>
      )}
    </header>
  );
};