import React from 'react';
import { Plane, CalendarCheck } from 'lucide-react';
import { View } from '../types';

interface PackagePromoProps {
  onNavigate: (view: View) => void;
}

export const PackagePromo: React.FC<PackagePromoProps> = ({ onNavigate }) => {
  return (
    <section className="bg-norfolk-green text-white py-16 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-sans tracking-widest uppercase mb-4">
            <CalendarCheck size={14} /> 2026 Now Available
          </div>
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Looking for a stress-free holiday?</h2>
          <p className="font-sans text-gray-200 text-lg max-w-xl">
            We’ve bundled your flights, car hire, accommodation, and tours into one simple, high-value package. 
            Departing directly from Sydney or Brisbane.
          </p>
        </div>

        <div className="flex-shrink-0">
          <button 
            onClick={() => onNavigate('packages')}
            className="group relative inline-flex items-center gap-3 bg-white text-norfolk-green px-8 py-4 text-lg font-serif rounded-sm overflow-hidden transition-transform hover:scale-105"
          >
            <Plane className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            View 2026 Packages
          </button>
        </div>
      </div>
    </section>
  );
};