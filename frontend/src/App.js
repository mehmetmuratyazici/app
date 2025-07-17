import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import { Components } from './components';
import { AuthProvider, useAuth } from 'react-oidc-context';

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
  Footer,
  Dashboard
} = Components;

const Home = ({ onLoginSuccess }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onLoginSuccess={onLoginSuccess} />
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
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;