import { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Products from './components/Products';
import Reviews from './components/Reviews';
import Social from './components/Social';
import Contact from './components/Contact'; // Changed from pages/Contact
import Footer from './components/Footer';
import SEO from './components/SEO';
import { ReactLenis } from 'lenis/react';

import ContactPage from './pages/ContactPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={
        <main className="bg-[#0C1E30] min-h-screen text-[#EDEDED] overflow-x-hidden selection:bg-[#C19A6B] selection:text-black">
          <SEO
            title="VITA"
            description="A sensory journey through taste and elegance."
          />
          <Hero />
          <About />
          <Gallery />
          <Products />
          <Social />
          <Reviews />
          <Contact />
        </main >
      } />
      < Route path="/contact" element={< ContactPage />} />
      {/* Keeping other routes for now if user wants them, but Home is the main scroll page */}
    </Routes >
  );
}

function App() {
  return (
    <ReactLenis root>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Router>
    </ReactLenis>
  );
}

export default App;
