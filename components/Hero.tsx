import React from 'react';
import { Button } from './Button';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    document.getElementById('whystay')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background - Simulating a video or high-res image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/tourstudio-1c4a8.firebasestorage.app/o/Imagenes%20de%20unidades%20flat%2FChanners%20property.jpg?alt=media" 
          alt="Channers on Norfolk Property Grounds" 
          className="w-full h-full object-cover"
        />
        {/* Overlay - Increased slightly to 50% to ensure text pops against property details */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Brand Pre-header */}
        <span className="block font-sans text-xs md:text-sm font-bold tracking-[0.3em] text-norfolk-sand mb-4 uppercase opacity-90">
          Channers on Norfolk
        </span>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          A warm, personal stay <br />
          <span className="italic text-4xl md:text-6xl lg:text-7xl">in the heart of Norfolk Island</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
          Set within two acres of lush subtropical gardens. Peaceful, private, and deeply connected to nature.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Enquiry
          </Button>
          <button 
            onClick={() => document.getElementById('accommodation')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-white border border-white hover:bg-white hover:text-norfolk-green transition-colors font-sans text-lg"
          >
            View Our Apartments
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};