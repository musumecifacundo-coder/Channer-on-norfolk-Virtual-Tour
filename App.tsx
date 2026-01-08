import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyStay } from './components/WhyStay';
import { Accommodation } from './components/Accommodation';
import { Experiences } from './components/Experiences';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Enquiry } from './components/Enquiry';
import { Footer } from './components/Footer';
import { LiveChat } from './components/LiveChat';
import { PackagePromo } from './components/PackagePromo';
import { Packages } from './components/Packages';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 antialiased selection:bg-norfolk-clay selection:text-white">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero />
            <WhyStay />
            <PackagePromo onNavigate={setCurrentView} />
            <Accommodation />
            <Experiences />
            <Gallery />
            <Reviews />
            <Enquiry />
          </>
        ) : (
          <>
            <Packages />
            <Enquiry />
          </>
        )}
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
};

export default App;