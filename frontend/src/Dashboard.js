import React from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaUsers, FaChartLine, FaWarehouse, FaSignOutAlt, FaHome, FaBoxOpen, FaBoxes, FaSun, FaMoon } from 'react-icons/fa';
import { isMaintenance } from './config';
import { useTranslation } from 'react-i18next';
const kpiCards = [
  {
    icon: <FaShoppingCart className="text-3xl text-orange-500 mb-2" />,
    label: 'Toplam Sipariş',
    value: '0',
  },
  {
    icon: <FaUsers className="text-3xl text-orange-500 mb-2" />,
    label: 'Aktif Müşteri',
    value: '0',
  },
  {
    icon: <FaChartLine className="text-3xl text-orange-500 mb-2" />,
    label: 'Aylık Gelir',
    value: '₺0',
  },
  {
    icon: <FaWarehouse className="text-3xl text-orange-500 mb-2" />,
    label: 'Stokta Ürün',
    value: '0',
  },
];

const navLinks = [
  { label: 'Anasayfa', icon: <FaHome />, href: '/dashboard' },
  { label: 'Satışlar', icon: <FaChartLine />, href: '#' },
  { label: 'Siparişler', icon: <FaBoxOpen />, href: '#' },
  { label: 'Stok', icon: <FaBoxes />, href: '#' },
];

const Dashboard = ({ darkMode, setDarkMode }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (!auth.isAuthenticated) {
    navigate('/');
    return null;
  }
  // Bakım/değişiklik durumu için tek değişken
  const navDisabled = isMaintenance ? 'pointer-events-none opacity-50 select-none' : '';
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* Bilgilendirme Overlay */}
      <AnimatePresence>
        {isMaintenance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full text-center border-2 border-orange-500">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t('maintenance-title')}</h2>
              <p className="text-gray-700 dark:text-gray-200 text-lg">{t('maintenance-desc')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl font-extrabold text-orange-600">moon</span>
            <span className="text-3xl font-extrabold text-gray-800 dark:text-white">amz</span>
          </div>
          {/* Nav Links (desktop) */}
          <div className={`hidden md:flex items-center gap-8 ${navDisabled}`}>
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-orange-600 font-medium transition-colors`}
                aria-disabled={isMaintenance ? 'true' : undefined}
                tabIndex={isMaintenance ? -1 : 0}
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
          {/* User & Logout & Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            {auth.user && (
              <span className={`text-gray-600 dark:text-gray-300 text-sm hidden sm:block ${navDisabled}`}>{auth.user.profile.email}</span>
            )}
            <button
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              onClick={() => auth.signoutRedirect()}
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Çıkış Yap</span>
            </button>
            {/* Dark mode toggle */}
            <button
              aria-label={darkMode ? 'Açık moda geç' : 'Koyu moda geç'}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-2">
            {/* Hamburger icon for mobile nav (future: implement if needed) */}
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-20 pb-8 px-2 md:px-8 w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Hoş geldiniz!</p>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {kpiCards.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              {kpi.icon}
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{kpi.value}</div>
              <div className="text-gray-500 dark:text-gray-300 mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>
        {/* Example widgets */}
        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Sales Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-h-[220px] flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Satışlar (Son 7 Gün)</h2>
            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">[Grafik Placeholder]</div>
          </motion.div>
          {/* Orders Table Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-h-[220px] flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Son Siparişler</h2>
            <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500">[Tablo Placeholder]</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 