import React from 'react';
import { Mail } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const scrollToEnquiry = () => {
    const element = document.getElementById('enquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToEnquiry}
      className="fixed bottom-6 right-6 z-50 bg-norfolk-green text-white px-6 py-4 rounded-full shadow-xl hover:bg-opacity-90 hover:scale-105 transition-all flex items-center gap-3 group animate-fade-in"
      aria-label="Scroll to enquiry form"
    >
      {/* Icon matches the 'Contact' mental model */}
      <Mail size={22} className="group-hover:-translate-y-0.5 transition-transform" />
      
      {/* Text specifically chosen for high-trust/personal hospitality feel */}
      <span className="font-serif text-lg tracking-wide hidden md:inline">Message Owners</span>
      <span className="font-serif text-lg tracking-wide md:hidden">Contact Us</span>
    </button>
  );
};