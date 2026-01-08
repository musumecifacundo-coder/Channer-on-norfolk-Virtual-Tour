import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-norfolk-green text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-serif text-2xl mb-4">CHANNERS</h4>
          <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-xs">
            Boutique accommodation on Norfolk Island. 
            Rest, recover, and reconnect in our garden sanctuary.
          </p>
        </div>
        
        <div>
          <h5 className="font-bold font-sans text-sm tracking-widest mb-4">CONTACT</h5>
          <address className="font-sans text-sm text-gray-300 not-italic space-y-2">
            <p>PO Box 123, Norfolk Island, 2899</p>
            <p>+6723 22222</p>
            <p>stay@channers.nf</p>
          </address>
        </div>

        <div>
           <h5 className="font-bold font-sans text-sm tracking-widest mb-4">SITEMAP</h5>
           <ul className="space-y-2 font-sans text-sm text-gray-300">
             <li><a href="#accommodation" className="hover:text-white">Accommodation</a></li>
             <li><a href="#experiences" className="hover:text-white">Experiences</a></li>
             <li><a href="#reviews" className="hover:text-white">Guest Reviews</a></li>
             <li><a href="#enquiry" className="hover:text-white">Enquire Now</a></li>
           </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center md:text-left">
        <p className="font-sans text-xs text-gray-400">© {new Date().getFullYear()} Channers on Norfolk. All rights reserved.</p>
      </div>
    </footer>
  );
};