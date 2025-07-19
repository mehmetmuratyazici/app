import React, { useState, useEffect } from 'react';
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

const Home = ({ onLoginSuccess, darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onLoginSuccess={onLoginSuccess} darkMode={darkMode} setDarkMode={setDarkMode} />
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
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;