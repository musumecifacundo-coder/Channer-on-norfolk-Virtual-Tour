import React from 'react';
import { Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-norfolk-green text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-serif text-2xl mb-4">CHANNERS</h4>
          <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-xs mb-6">
            Boutique accommodation on Norfolk Island. 
            Rest, recover, and reconnect in our garden sanctuary.
          </p>
          
          <a 
            href="https://www.facebook.com/channersonnorfolk" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors border border-white/20 px-4 py-2 rounded-full hover:bg-white/10"
          >
            <Facebook size={18} />
            <span className="font-sans text-xs uppercase tracking-widest font-bold">Follow us</span>
          </a>
        </div>
        
        <div>
          <h5 className="font-bold font-sans text-sm tracking-widest mb-6 opacity-60">CONTACT</h5>
          <address className="font-sans text-sm text-gray-300 not-italic space-y-6">
            <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider mb-1">Call us to book</p>
                <a href="tel:0255213000" className="hover:text-white transition-colors">Aus: 02 5521 3000</a>
            </div>
            
            <div>
                <p className="font-bold text-white text-xs uppercase tracking-wider mb-1">Find us</p>
                <p>144 Taylors Rd<br/>Norfolk Island</p>
            </div>

            <div>
                 <p className="font-bold text-white text-xs uppercase tracking-wider mb-1">Email us</p>
                 <a href="mailto:ask@channersonnorfolk.com" className="hover:text-white transition-colors">ask@channersonnorfolk.com</a>
            </div>
          </address>
        </div>

        <div>
           <h5 className="font-bold font-sans text-sm tracking-widest mb-6 opacity-60">SITEMAP</h5>
           <ul className="space-y-3 font-sans text-sm text-gray-300">
             <li><a href="#accommodation" className="hover:text-white transition-colors">Accommodation</a></li>
             <li><a href="#experiences" className="hover:text-white transition-colors">Experiences</a></li>
             <li><a href="#heritage" className="hover:text-white transition-colors">A Legacy of Care</a></li>
             <li><a href="#reviews" className="hover:text-white transition-colors">Guest Reviews</a></li>
             <li><a href="#enquiry" className="hover:text-white transition-colors">Enquire Now</a></li>
           </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs text-gray-400">© {new Date().getFullYear()} Channers on Norfolk. All rights reserved.</p>
        <p className="font-sans text-xs text-gray-500">Website designed for mature travellers.</p>
      </div>
    </footer>
  );
};