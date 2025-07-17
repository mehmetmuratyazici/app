import React from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaUsers, FaChartLine, FaWarehouse, FaSignOutAlt, FaHome, FaBoxOpen, FaBoxes } from 'react-icons/fa';

const kpiCards = [
  {
    icon: <FaShoppingCart className="text-3xl text-orange-500 mb-2" />,
    label: 'Toplam Sipariş',
    value: '1,250',
  },
  {
    icon: <FaUsers className="text-3xl text-orange-500 mb-2" />,
    label: 'Aktif Müşteri',
    value: '320',
  },
  {
    icon: <FaChartLine className="text-3xl text-orange-500 mb-2" />,
    label: 'Aylık Gelir',
    value: '₺45,000',
  },
  {
    icon: <FaWarehouse className="text-3xl text-orange-500 mb-2" />,
    label: 'Stokta Ürün',
    value: '2,100',
  },
];

const navLinks = [
  { label: 'Anasayfa', icon: <FaHome />, href: '/dashboard' },
  { label: 'Satışlar', icon: <FaChartLine />, href: '#' },
  { label: 'Siparişler', icon: <FaBoxOpen />, href: '#' },
  { label: 'Stok', icon: <FaBoxes />, href: '#' },
];

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  if (!auth.isAuthenticated) {
    navigate('/');
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">moon</span>
            <span className="text-2xl font-bold text-gray-800">amz</span>
          </div>
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
          {/* User & Logout */}
          <div className="flex items-center gap-4">
            {auth.user && (
              <span className="text-gray-600 text-sm hidden sm:block">{auth.user.profile.email}</span>
            )}
            <button
              className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              onClick={() => auth.signoutRedirect()}
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-20 pb-8 px-2 md:px-8 w-full max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Hoş geldiniz!</p>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {kpiCards.map((kpi, idx) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              {kpi.icon}
              <div className="text-2xl font-bold text-gray-800">{kpi.value}</div>
              <div className="text-gray-500 mt-1">{kpi.label}</div>
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
            className="bg-white rounded-xl shadow-lg p-6 min-h-[220px] flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Satışlar (Son 7 Gün)</h2>
            <div className="flex-1 flex items-center justify-center text-gray-400">[Grafik Placeholder]</div>
          </motion.div>
          {/* Orders Table Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 min-h-[220px] flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Son Siparişler</h2>
            <div className="flex-1 flex items-center justify-center text-gray-400">[Tablo Placeholder]</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 