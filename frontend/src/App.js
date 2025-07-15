import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import { Components } from './components';

const {
  Header,
  Hero,
  Features,
  Partnership,
  Benefits,
  Contact,
  Statistics,
  Expert,
  Pricing,
  Support,
  Testimonials,
  Warehouse,
  Blog,
  Footer
} = Components;

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Features />
      <Partnership />
      <Benefits />
      <Contact />
      <Statistics />
      <Expert />
      <Pricing />
      <Support />
      <Testimonials />
      <Warehouse />
      <Blog />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;