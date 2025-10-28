import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LeadMagnetForm from './components/LeadMagnetForm';
import RoutesSection from './components/RoutesSection';
import RouteModal from './components/RouteModal';
import AboutSection from './components/AboutSection';
import CustomRouteForm from './components/CustomRouteForm';
import FAQSection from './components/FAQSection';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import JSONLDSchema from './components/JSONLDSchema';
import { Route } from './types';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleRouteClick = (route: Route) => {
    setSelectedRoute(route);
  };

  const handleCloseModal = () => {
    setSelectedRoute(null);
  };

  return (
    <>
      <JSONLDSchema />
      
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <HeroSection />
      
      <LeadMagnetForm />
      
      <RoutesSection onRouteClick={handleRouteClick} />
      
      <RouteModal 
        route={selectedRoute} 
        onClose={handleCloseModal} 
      />
      
      <AboutSection />
      
      <CustomRouteForm />
      
      <FAQSection />
      
      <SocialProof />
      
      <Footer />
      
      <FloatingWhatsApp />
    </>
  );
}

export default App;