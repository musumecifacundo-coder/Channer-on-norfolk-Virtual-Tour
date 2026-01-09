import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Info, ChevronDown, ChevronUp, Tag, Leaf, ShieldCheck, MapPin } from 'lucide-react';

// Reusing the Pine Tree Icon locally for the specific feature card
const NorfolkPineTreeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="11" y="21" width="2" height="2" />
    <path d="M12 1.5L9 6.5H10.5L7 11.5H9L5 17.5H19L15 11.5H17L13.5 6.5H15L12 1.5Z" />
  </svg>
);

interface FAQItem {
  q: string;
  a: React.ReactNode;
  badge?: {
    text: string;
    color: 'green' | 'gold' | 'blue' | 'gray';
    icon?: React.ReactNode;
  };
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    title: "The Channers Experience",
    items: [
      {
        q: "What makes your gardens special?",
        a: <>Our two-acre property is a botanical sanctuary. We are proud custodians of the <strong>Phillip Island Hibiscus</strong>, one of the rarest plants in the world. It’s the perfect setting for a morning coffee or an evening stroll.</>,
        badge: { text: "Rare Nature", color: "green", icon: <Leaf size={12} /> }
      },
      {
        q: "Do you offer any deals on tours?",
        a: <>Yes! As our guest, you receive an <strong>exclusive 10% discount</strong> on selected tours with <em>Baunti Escapes</em>. We can help you book these upon arrival to ensure you get the best local price.</>,
        badge: { text: "Guest Benefit", color: "gold", icon: <Tag size={12} /> }
      },
      {
        q: "Is the accommodation suitable for Seniors?",
        a: <>Absolutely. We specialise in hosting <strong>mature travellers (50+)</strong>. We understand the need for comfort, ease of access, and a slower pace. Our "Child-free (15+)" policy ensures the peace and quiet you deserve.</>,
        badge: { text: "Seniors Specialist", color: "blue", icon: <ShieldCheck size={12} /> }
      },
      {
        q: "Does every room have its own bathroom?",
        a: <>Yes. Privacy is paramount. Every single bedroom at Channers features its own <strong>en-suite bathroom</strong>. This makes our 2-bedroom apartments ideal for friends travelling together who want their own space.</>,
        badge: { text: "All En-suite", color: "gray" }
      },
      {
        q: "How close are you to shops and cafes?",
        a: <>We offer the best of both worlds: total garden seclusion, yet just a short <strong>10-minute flat walk</strong> (or 2-minute drive) to Burnt Pine township, where you'll find the Cyclorama, restaurants, and shops.</>,
        badge: { text: "Walking Distance", color: "green", icon: <MapPin size={12} /> }
      },
      {
        q: "Is there assistance on site?",
        a: <>Yes. Unlike many holiday rentals, <strong>we (Steve & Kim) live on-site</strong>. We provide 24/7 assistance, local advice, and a friendly face whenever you need it, whilst completely respecting your privacy.</>
      }
    ]
  },
  {
    title: "Travel Essentials",
    items: [
      {
        q: "Do I need a passport to get to Norfolk Island?",
        a: <>No. The Australian government has made it possible to get to Norfolk Island with picture ID, although a passport is desirable. However, <strong>no passport is required</strong> for Australian citizens travelling from the mainland.</>
      },
      {
        q: "Does Norfolk Island have 4G capability?",
        a: <>No. Currently most places on Norfolk are connected to satellite NBN. However, at Channers, we provide free <strong>Starlink WiFi</strong> which gives you excellent quality and speed for streaming and calls.</>,
        badge: { text: "Free Starlink", color: "blue" }
      },
      {
        q: "What is the weather like?",
        a: <>Norfolk Island is located in a temperate zone which translates to mild summers and winters and long springs and autumns. It can still be quite cool on the clifftops, so light layers are recommended.</>
      },
      {
        q: "Where is Norfolk Island?",
        a: <>Norfolk Island is located between New Zealand and New Caledonia on the Norfolk Ridge. Its latitude is 29, roughly equivalent to Ballina on Australia's east coast. Flight time is approximately 2 hours from Brisbane and Sydney.</>
      }
    ]
  },
  {
    title: "Arrival & Logistics",
    items: [
      {
        q: "Will I be met at the airport?",
        a: <>Yes. When you come out of the main doors go to the <strong>Baunti Tours</strong> desk. You will be greeted by a lovely staff member who will give you a half day tour voucher and direct you to their transfer bus. We will be at Channers ready to settle you in.</>
      },
      {
        q: "Who is Norfolk Island's airline?",
        a: <>Currently <strong>Qantas</strong> services Norfolk Island 6 times a week. From Brisbane on Tuesday, Thursday and Saturday and from Sydney on Wednesday, Friday and Sunday.</>
      },
      {
        q: "Can I bring food items to Norfolk Island?",
        a: <>Yes. You can bring all commercially packed food items excluding fresh fruit and vegetables and honey. If you have a favourite food bring it along as it may not be available on island.</>
      },
      {
        q: "Is Norfolk Island part of Australia?",
        a: <>Yes. Norfolk Island is an external territory of Australia (since 1914) and uses Australian dollars and laws.</>
      }
    ]
  }
];

export const Gallery: React.FC = () => {
  // Store open state as "CategoryIndex-QuestionIndex" string, or null for inner items
  const [openItem, setOpenItem] = useState<string | null>("0-0");
  
  // Store open categories (default: first category open)
  const [openCategories, setOpenCategories] = useState<number[]>([0]);

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItem(openItem === key ? null : key);
  };

  const toggleCategory = (index: number) => {
    setOpenCategories(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const getBadgeStyle = (color: string) => {
    switch (color) {
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white border-t border-norfolk-clay/10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-2 text-norfolk-green bg-norfolk-sand px-4 py-1 rounded-full mb-6">
             <HelpCircle size={16} />
             <span className="text-xs font-bold uppercase tracking-widest">Guest Essentials</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-norfolk-green mb-6">Everything you need to know</h2>
          <p className="font-sans text-gray-500 max-w-2xl text-lg font-light">
            We’ve curated the most common questions to help you prepare for a seamless arrival.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main FAQ Column */}
          <div className="lg:col-span-8 space-y-6">
            {FAQ_DATA.map((category, catIdx) => {
              const isCategoryOpen = openCategories.includes(catIdx);
              
              return (
                <div key={catIdx} className="animate-fade-in border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  {/* Category Header (Collapsible Trigger) */}
                  <button 
                    onClick={() => toggleCategory(catIdx)}
                    className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-300 ${isCategoryOpen ? 'bg-norfolk-green text-white' : 'bg-white hover:bg-gray-50 text-norfolk-green'}`}
                  >
                    <h3 className="font-serif text-2xl font-medium tracking-wide">
                      {category.title}
                    </h3>
                    <span className="ml-4">
                       {isCategoryOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </span>
                  </button>
                  
                  {/* Category Content */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isCategoryOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 bg-white space-y-4">
                      {category.items.map((item, itemIdx) => {
                        const isOpen = openItem === `${catIdx}-${itemIdx}`;
                        return (
                          <div 
                            key={itemIdx} 
                            className={`group border rounded-lg transition-all duration-300 ${isOpen ? 'border-norfolk-green/30 bg-norfolk-sand/10' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                          >
                            <button 
                              onClick={() => toggleItem(catIdx, itemIdx)}
                              className="w-full flex justify-between items-center p-5 text-left"
                            >
                              <div className="flex items-center gap-3 flex-1 pr-4">
                                <span className={`font-sans text-base md:text-lg font-medium transition-colors ${isOpen ? 'text-norfolk-green' : 'text-gray-800'}`}>
                                  {item.q}
                                </span>
                                {item.badge && (
                                  <span className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getBadgeStyle(item.badge.color)}`}>
                                    {item.badge.icon}
                                    {item.badge.text}
                                  </span>
                                )}
                              </div>
                              <span className={`flex-shrink-0 transition-transform duration-300 text-norfolk-green`}>
                                {isOpen ? <Minus strokeWidth={1.5} size={20} /> : <Plus strokeWidth={1.5} size={20} />}
                              </span>
                            </button>
                            
                            <div 
                              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                              <div className="px-5 pb-6 pt-0 text-gray-600 font-sans leading-relaxed text-sm md:text-base border-t border-dashed border-gray-200 mt-2 pt-4 mx-5">
                                {item.a}
                                {item.badge && (
                                   <div className="md:hidden mt-3">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getBadgeStyle(item.badge.color)}`}>
                                        {item.badge.icon}
                                        {item.badge.text}
                                      </span>
                                   </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="mt-8 pl-2">
                <p className="font-sans text-sm text-gray-500">
                    Still have questions? 
                    <a href="#enquiry" className="text-norfolk-green font-bold ml-1 hover:underline cursor-pointer">
                      Message the owners directly
                    </a>
                </p>
            </div>
          </div>

          {/* Sidebar Feature: The Pine Tree Rating */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="bg-norfolk-sand/40 border border-norfolk-clay/20 p-8 rounded-2xl relative overflow-hidden">
               {/* Decorative Background Icon */}
               <div className="absolute -top-6 -right-6 text-norfolk-green opacity-5 transform rotate-12">
                  <NorfolkPineTreeIcon size={180} />
               </div>

               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4 text-norfolk-green">
                    <NorfolkPineTreeIcon size={24} />
                    <NorfolkPineTreeIcon size={24} />
                    <NorfolkPineTreeIcon size={24} />
                    <div className="relative">
                         <NorfolkPineTreeIcon size={24} className="opacity-30" />
                         <div className="absolute inset-0 overflow-hidden w-1/2">
                            <NorfolkPineTreeIcon size={24} />
                         </div>
                    </div>
                 </div>

                 <h3 className="font-serif text-2xl text-gray-900 mb-3">Why "3.5 Pine Trees"?</h3>
                 <div className="w-12 h-0.5 bg-norfolk-clay mb-4"></div>
                 
                 <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                   The traditional Star Rating system ceased on Norfolk Island in 2014. Rather than claiming a rating that isn't officially monitored, we choose <strong>transparency</strong>.
                 </p>
                 <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
                   We self-rate Channers at <strong>3.5 Pine Trees</strong> based on our guest feedback, unit renovations, and honest self-assessment. It represents comfortable, well-appointed boutique accommodation without the pretence.
                 </p>

                 <div className="flex items-center gap-2 text-xs font-bold text-norfolk-green uppercase tracking-wider">
                    <Info size={14} />
                    <span>A Local Mark of Integrity</span>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};