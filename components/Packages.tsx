import React, { useState } from 'react';
import { Button } from './Button';
import { Check, Plane, Car, Home, Coffee, Wifi, ChevronDown, ChevronUp } from 'lucide-react';

export const Packages: React.FC = () => {
  const [departureCity, setDepartureCity] = useState<'sydney' | 'brisbane'>('sydney');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const inclusions = [
    { icon: <Plane size={24} />, title: 'Return Flights', desc: `Qantas from ${departureCity === 'sydney' ? 'Sydney' : 'Brisbane'} (incl. taxes & bags)` },
    { icon: <Home size={24} />, title: '7 Nights Stay', desc: 'Choice of Garden or Ocean View Apartment' },
    { icon: <Car size={24} />, title: 'Car Hire', desc: '7 days car hire (includes insurance)' },
    { icon: <Coffee size={24} />, title: 'Island Tours', desc: 'Orientation tour + Historic tour included' },
    { icon: <Wifi size={24} />, title: 'Essentials', desc: 'Airport transfers & unlimited Wi-Fi' },
  ];

  const packages = [
    {
      name: 'Garden Suite Package',
      price: departureCity === 'sydney' ? '2,150' : '2,250',
      description: 'Perfect for couples wanting ground-floor convenience and lush garden views.',
      features: ['King Bed', 'Private Veranda', 'Full Kitchenette', 'Walk-in Shower'],
      image: 'https://picsum.photos/800/600?random=101'
    },
    {
      name: 'Ocean View Package',
      price: departureCity === 'sydney' ? '2,450' : '2,550',
      description: 'Elevated luxury with sweeping views of the valley and ocean.',
      features: ['2 Bedrooms', 'Large Balcony', 'Full Kitchen', 'Premium Views'],
      image: 'https://picsum.photos/800/600?random=102'
    },
    {
      name: 'Treetop Apartment Package',
      price: departureCity === 'sydney' ? '2,350' : '2,450',
      description: 'A secluded hideaway amongst the pines, offering total privacy.',
      features: ['Tree-level Views', 'Spacious Living', 'Ensuite', 'Birdwatcher’s Dream'],
      image: 'https://picsum.photos/800/600?random=103'
    }
  ];

  const faqs = [
    { q: "What are the flight details?", a: `Flights are with Qantas. From Sydney (International Terminal), flights operate on Tuesdays, Thursdays, and Sundays. From Brisbane (International Terminal), flights operate on Tuesdays, Thursdays, and Saturdays. Flight time is approx. 2.5 hours.` },
    { q: "Can I stay longer than 7 nights?", a: "Absolutely. We can customize your package to 10 or 14 nights depending on flight schedules. Just mention this in your enquiry." },
    { q: "Is travel insurance included?", a: "No, travel insurance is not included but is highly recommended. As Norfolk Island is an external territory, Medicare applies, but medical evacuation does not." },
    { q: "What is the policy on children?", a: "To ensure a restful experience for all our guests, Channers on Norfolk maintains a policy of being child-free for guests under the age of 15." },
  ];

  return (
    <div className="animate-fade-in pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?random=99" 
            alt="Norfolk Island Coast" 
            className="w-full h-full object-cover opacity-60" 
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">The Complete Norfolk Experience.<br/><span className="italic">Wrapped up for you.</span></h1>
          <p className="font-sans text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Flights, car, accommodation, and tours. A seamless 2026 holiday package designed for relaxation.
          </p>
          <Button onClick={() => document.getElementById('package-selector')?.scrollIntoView({ behavior: 'smooth' })}>
            View 2026 Packages
          </Button>
        </div>
      </section>

      {/* Value Prop Grid (The Bundle) */}
      <section className="py-16 bg-white -mt-10 relative z-20 rounded-t-3xl shadow-xl max-w-6xl mx-auto">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-norfolk-green">Everything you need, nothing you don't.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {inclusions.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-norfolk-sand flex items-center justify-center text-norfolk-green mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold font-sans text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 max-w-[140px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Package Selector */}
      <section id="package-selector" className="py-16 bg-norfolk-sand">
        <div className="container mx-auto px-4">
          
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-1 rounded-full shadow-sm inline-flex">
              <button
                onClick={() => setDepartureCity('sydney')}
                className={`px-8 py-3 rounded-full font-sans font-medium transition-all ${
                  departureCity === 'sydney' ? 'bg-norfolk-green text-white shadow-md' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Departing Sydney
              </button>
              <button
                onClick={() => setDepartureCity('brisbane')}
                className={`px-8 py-3 rounded-full font-sans font-medium transition-all ${
                  departureCity === 'brisbane' ? 'bg-norfolk-green text-white shadow-md' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Departing Brisbane
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 font-sans">
              Showing 7-night packages departing from <span className="font-bold text-norfolk-green capitalize">{departureCity}</span>. Prices are per person, twin share.
            </p>
          </div>

          {/* Accommodation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                <div className="h-64 overflow-hidden relative group">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-norfolk-green mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-1">{pkg.description}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check size={16} className="text-norfolk-clay" /> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-gray-100 mt-auto">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">From</p>
                    <div className="flex items-end justify-between mb-4">
                      <span className="text-3xl font-serif text-gray-800">${pkg.price}</span>
                      <span className="text-sm text-gray-500 mb-1">pp / twin share</span>
                    </div>
                    <Button className="w-full" onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}>
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-norfolk-green mb-6">Good to know</h2>
            <div className="inline-flex gap-4 items-center justify-center grayscale opacity-70 mb-8">
                {/* Placeholders for trust badges */}
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 text-center leading-tight">TripAdvisor<br/>Excellence</div>
                <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 text-center leading-tight">Local<br/>Expert</div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-serif text-lg text-gray-800">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-norfolk-green" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-gray-600 text-sm leading-relaxed border-t border-gray-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};