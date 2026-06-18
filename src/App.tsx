import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import WhoWeAre from './sections/WhoWeAre';
import Capabilities from './sections/Capabilities';
import Industries from './sections/Industries';
import Products from './sections/Products';
import SupplyInMotion from './sections/SupplyInMotion';
import GlobalNetwork from './sections/GlobalNetwork';
import WhyRiver from './sections/WhyRiver';
import Values from './sections/Values';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
// Leadership temporarily hidden — to be reintroduced once team profiles are finalised
// import Leadership from './sections/Leadership';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <SplashScreen />}</AnimatePresence>

      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Hero />
          <WhoWeAre />
          <Capabilities />
          <Industries />
          <Products />
          <Values />
          <WhyRiver />
          <SupplyInMotion />
          <GlobalNetwork />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
