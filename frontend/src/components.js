import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaShoppingCart, FaUsers, FaChartLine, FaHeadset, FaWarehouse, FaShieldAlt, FaUser, FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBars, FaTimes, FaEye, FaEyeSlash, FaMoon, FaSun } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useOidc, useOidcUser } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { cognitoAuthConfig } from './config';
import Dashboard from './Dashboard';

// AWS Cognito config (replace with your actual values)
/*
const poolData = {
  UserPoolId: 'YOUR_USER_POOL_ID', // e.g. 'eu-west-1_XXXXXXX'
  ClientId: 'YOUR_CLIENT_ID', // e.g. '1h57kf5cpq17m0eml12EXAMPLE'
};
*/
//const userPool = new CognitoUserPool(poolData);

// Login Modal Component (OIDC)
const LoginModal = ({ isOpen, onClose }) => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Eğer user varsa dashboard'a yönlendir
  if (auth.isAuthenticated) {
    navigate('/dashboard');
    return null;
  }
  // Modal açılır açılmaz Cognito Hosted UI'ya yönlendir
  React.useEffect(() => {
    if (isOpen) {
      auth.signinRedirect();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return null; // Modal hiç gösterilmesin, direkt yönlendirme olsun
};

// Header Component (login durumuna göre yönlendirme)
const Header = ({ isMenuOpen, setIsMenuOpen, darkMode, setDarkMode }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [language, setLanguage] = useState('TR');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  // Eğer user varsa dashboard'a yönlendir
  if (auth.isAuthenticated) {
    navigate('/dashboard');
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl font-extrabold text-orange-600">moon</span>
            <span className="text-3xl font-extrabold text-gray-800 dark:text-white">amz</span>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('avantajlar')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors">{t('Avantajlar')}</button>
            <button onClick={() => scrollToSection('yazilimlarimiz')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors">{t('Yazılımlarımız')}</button>
            <button onClick={() => scrollToSection('paketler')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors">{t('Paketler')}</button>
            <button onClick={() => scrollToSection('ozellikler')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors">{t('Özellikler')}</button>
            <button onClick={() => scrollToSection('hakkimizda')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors">{t('Hakkımızda')}</button>
            <button onClick={() => scrollToSection('iletisim')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors">{t('İletişim')}</button>
            {/* Language Dropdown */}
            <div className="relative flex items-center">
              <button
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-orange-600 focus:outline-none"
                onClick={() => setLangDropdownOpen((open) => !open)}
              >
                <span className="mr-1">{language}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-10">
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${language === 'TR' ? 'font-bold text-orange-600' : ''}`}
                    onClick={() => handleLanguageChange('TR')}
                  >
                    {t('Türkçe')}
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${language === 'EN' ? 'font-bold text-orange-600' : ''}`}
                    onClick={() => handleLanguageChange('EN')}
                  >
                    {t('English')}
                  </button>
                </div>
              )}
            </div>
          </nav>
          {/* CTA Buttons & Dark Mode Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setIsLoginOpen(true)}
              disabled={isLoginOpen}
              className={`text-orange-600 hover:text-orange-700 transition-colors ${isLoginOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {t('Giriş Yap')}
            </button>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors" onClick={() => scrollToSection('paketler')}>
              {t('Şimdi Dene')}
            </button>
            {/* Dark mode toggle */}
            <button
              aria-label={darkMode ? 'Açık moda geç' : 'Koyu moda geç'}
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="text-gray-700 dark:text-gray-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            {/* Dark mode toggle (mobile) */}
            <button
              aria-label={darkMode ? 'Açık moda geç' : 'Koyu moda geç'}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700"
          >
            <nav className="flex flex-col space-y-4 pt-4">
              <button onClick={() => scrollToSection('avantajlar')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors text-left">{t('Avantajlar')}</button>
              <button onClick={() => scrollToSection('yazilimlarimiz')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors text-left">{t('Yazılımlarımız')}</button>
              <button onClick={() => scrollToSection('paketler')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors text-left">{t('Paketler')}</button>
              <button onClick={() => scrollToSection('ozellikler')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors text-left">{t('Özellikler')}</button>
              <button onClick={() => scrollToSection('hakkimizda')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors text-left">{t('Hakkımızda')}</button>
              <button onClick={() => scrollToSection('iletisim')} className="text-gray-700 dark:text-gray-200 hover:text-orange-600 transition-colors text-left">{t('İletişim')}</button>
              <div className="flex flex-col space-y-2 pt-4">
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  disabled={isLoginOpen}
                  className={`text-orange-600 hover:text-orange-700 transition-colors text-left ${isLoginOpen ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {t('Giriş Yap')}
                </button>
                <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors" onClick={() => scrollToSection('paketler')}>
                  {t('Şimdi Dene')}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

// Hero Component
const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="hero" className="relative bg-gray-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" 
          alt="Professional team" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            {t('Profesyonel')} <br />
            <span className="text-orange-500">{t('Dropshipping')}</span> <br />
            {t('Çözümleri')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-gray-300"
          >
            {t('MoonAmz Ayrıcalıklarıyla Dropshipping Dünyanızı Sizinle Ele Başlayıp, Yatırım Yapın!')}
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
            onClick={redirectToCognitoSignUp}
          >
            {t('7 GÜN ÜCRETSİZ DENE')}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <FaUser className="text-orange-600 text-3xl" />,
      title: t('Yazılıma Kayıt Ol'),
      description: t('Günlerin vadelerine ile aklını aldın hesaplanıyor içini yaşatmalık aldın yazılım hesap imana belirlenmiş.')
    },
    {
      icon: <FaChartLine className="text-orange-600 text-3xl" />,
      title: t('Strateji Belirle'),
      description: t('Süre seçimi, zamanın hesaplama karşılayacak ile çıkara kâr sık amazon satış içinde stratejileri çığır açan başlangıç imkansız.')
    },
    {
      icon: <FaShoppingCart className="text-orange-600 text-3xl" />,
      title: t('Satış Yap'),
      description: t('Amazon dropshipping süreclerini ve üçüncü göz, satış sürecini alacak düğün sağlamak hazırlayıcı, müşteriler kampanyalı.')
    },
    {
      icon: <FaChartLine className="text-orange-600 text-3xl" />,
      title: t('Ek Gelir Kazan'),
      description: t('MoonAmz işin sana yaratacağı, günlük alım dropshipping sürecini ve kâr yüzdeleri tüm satış olarak hayalınızı satışlara.')
    }
  ];

  return (
    <section id="avantajlar" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partnership Component
const Partnership = () => {
  const { t } = useTranslation();
  return (
    <section id="yazilimlarimiz" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              {t('20 Farklı Ülkede Resmi Amazon Partneri MoonAmz ile Satış Yap!')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('MoonAmz ile Amazon Dropshipping ile yaşlık ile kâr ile başlayıp, yaşattıkların. Dünyada farklı kırayacak zenilk gelişiçimden versin müşteriler yaşamak sıkça de sık, ayda sene yaşadıkları, tamam sadece yaşı sürey sıkça çoğunlukla istişlik sürecini hep sağlayın.')}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <FaCheck className="text-orange-600" />
                <span className="text-gray-700 dark:text-gray-200">{t('Müşteri Memnuniyeti')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaCheck className="text-orange-600" />
                <span className="text-gray-700 dark:text-gray-200">{t('Güvenli Dropshipping')}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1591270551371-3401a1a9382f" 
              alt="Amazon packages" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Component
const Benefits = () => {
  const { t } = useTranslation();
  const leftBenefits = [
    t('Günlerin yazılım sürecindeki yaşı gelişi: müşturi, sataşlardaki fikrinsindeki ayda artımalıya geliş sızlığı geliş günlerde yaşamak veriş satış etkisinde kalanları yaşatır müşteriler karşılayıcı gelire'),
    t('Aylık yeminlik, ayda baçı çıkardığı vafındaki alanları kalanları yaşatılmadan süreç belli satış sürecini hep sağlayın'),
    t('Günlük biriler kızlarının etki birleşim karşılayacan etmek yaşı sıkça değiştirmektedir'),
    t('Zaman yaşatlar güıratırılanlara çıkarmakta yaşadıkları, günlerin yaşalarına öğren yaşatır etkisini kalmakta kırlarının')
  ];

  const rightBenefits = [
    t('Amazon Dropshipping ile müşteriler yaşlık ile hesap, günlerin yazılım sürecindeki yaşı gelişi: müşturi, sataşlardaki olması yaşatır müşteriler'),
    t('Aylık yeminlik, ayda baçı çıkardığı vafındaki alanları kalanları yaşatılmadan süreç belli satış sürecini hep sağlayın kırlarının'),
    t('Günlük biriler kızlarının etki birleşim karşılayacan etmek yaşı sıkça değiştirmektedir'),
    t('Zaman yaşatlar güıratırılanlara çıkarmakta yaşadıkları, günlerin yaşalarına öğren yaşatır etkisini kalmakta kırlarının')
  ];

  return (
    <section id="ozellikler" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaCheck className="text-orange-600 mr-3" />
              {t('Müşteri Memnuniyeti')}
            </h3>
            <div className="space-y-4">
              {leftBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheck className="text-orange-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <FaShieldAlt className="text-orange-600 mr-3" />
              {t('Güvenli Dropshipping')}
            </h3>
            <div className="space-y-4">
              {rightBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheck className="text-orange-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="iletisim" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('İletişime Geç')} <br />
              {t('Hemen Kazanmaya Başla!')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t('Adınız Soyadınız')}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('E-posta Adresiniz')}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder={t('Telefon Numaranız')}
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                required
              />
              <textarea
                name="message"
                placeholder={t('Mesajınız')}
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                {t('Gönder')}
              </button>
            </form>
          </div>
          <div className="text-center">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" 
              alt="Business consultation" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Statistics Component
const Statistics = () => {
  const { t } = useTranslation();
  const stats = [
    { number: '7+', label: t('Yıllık Deneyim') },
    { number: '8k+', label: t('Mutlu Kullanıcı') },
    { number: '11+', label: t('Ödeyenen') }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Expert Component
const Expert = () => {
  const { t } = useTranslation();
  return (
    <section id="hakkimizda" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952" 
              alt="Expert advisor" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('MoonAmz ile Uzman Rehberlikte Tanışın')}
            </h2>
            <p className="text-gray-300 mb-8">
              {t('Dropshipping büyüştürmek süküş, süreci ile gizliliği ve yaşlı düşünceleştir düşünseldir ve yaklaşımların sata yapınış tutarak ve süreklerini, birçok ve anlayışıyla, MoonAmz ekibinin yapacağı deneyimlerden küçük süret önal herkezi kâr bulacak kıra sürecini şekliyle öylemenin.')}
            </p>
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              {t('Uzman Gönder')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

function redirectToCognitoSignUp() {
  const signupUrl = `${cognitoAuthConfig.cognito_domain}/signup?client_id=${cognitoAuthConfig.client_id}&response_type=code&scope=openid+phone+email&redirect_uri=${encodeURIComponent(cognitoAuthConfig.redirect_uri)}`;
  window.location.href = signupUrl;
}

// Pricing Component
const Pricing = () => {
  const { t } = useTranslation();
  const packages = [
    {
      title: t('Temel Paket'),
      price: 30,
      features: [
        t('Sürekli A/B Test Desteği Sistemi'),
        t('Tüm Üzellikleri Proje Raporları'),
        t('Dünyannm Süreci Raporları'),
        t('Üretim Ayrıntıları'),
        t('Sürekli FTB Dökümler Sistemi'),
        t('Temel Güvenli Dropshipping'),
        t('Yerel Danışmanlık Doku Faaliyetleri')
      ]
    },
    {
      title: t('Standart Paket'),
      price: 50,
      features: [
        t('Sürekli A/B Test Desteği Sistemi'),
        t('Tüm Üzellikleri Proje Raporları'),
        t('Dünyannm Süreci Raporları'),
        t('Üretim Ayrıntıları'),
        t('Sürekli FTB Dökümler Sistemi'),
        t('Sürekli Güvenli Dropshipping'),
        t('Yerel Danışmanlık Doku Faaliyetleri')
      ]
    },
    {
      title: t('Premium Paket'),
      price: 100,
      features: [
        t('Sürekli A/B Test Desteği Sistemi'),
        t('Tüm Üzellikleri Proje Raporları'),
        t('Dünyannm Süreci Raporları'),
        t('Üretim Ayrıntıları'),
        t('Sürekli FTB Dökümler Sistemi'),
        t('Sürekli Güvenli Dropshipping'),
        t('Yerel Danışmanlık Doku Faaliyetleri')
      ]
    }
  ];

  return (
    <section id="paketler" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('Paketlerimiz')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{pkg.title}</h3>
              <div className="text-3xl font-bold text-orange-600 mb-4">${pkg.price} <span className="text-base font-medium text-gray-600 dark:text-gray-300">/ Ay</span></div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <FaCheck className="text-orange-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors" onClick={redirectToCognitoSignUp}>
                {t('PAKETİ SEÇ')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Support Component
const Support = () => {
  const { t } = useTranslation();
  const supportTypes = [
    {
      title: t('YAZILIM'),
      description: t('Yazılım ve teknik destek alanında uzman ekibimiz 7/24 hizmetinizdedir. Tüm sorularınız için buradayız.'),
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      title: t('ARA DEPO'),
      description: t('Dropshipping süreçlerinizde ara depo hizmetleri ile güvenli ve hızlı teslimat sağlayın.'),
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c"
    },
    {
      title: t('DESTEK'),
      description: t('Müşteri hizmetleri ve satış sonrası destek ile her zaman yanınızdayız. Sorularınız için iletişime geçin.'),
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('İhtiyacın Olan Tüm Ayrıntılar')} <br />
            {t('Tek Çatı Altında')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {supportTypes.map((support, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img 
                  src={support.image} 
                  alt={support.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{support.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300">{support.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      name: t('Murat Ö.'),
      role: t('Dropshipper'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      testimonial: t('MoonAmz ile çalışmaya başladıktan sonra satışlarım 3 katına çıktı. Profesyonel destek ve güvenilir sistem sayesinde işimi büyüttüm. Herkese tavsiye ederim çünkü gerçekten işe yarıyor.')
    },
    {
      name: t('Ayşe S.'),
      role: t('E-ticaret Uzmanı'),
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb",
      testimonial: t('Amazon dropshipping konusunda hiç deneyimim yoktu. MoonAmz ekibi bana her adımda yardımcı oldu. Şimdi ayda düzenli gelir elde ediyorum ve çok memnunum. Teşekkürler MoonAmz!')
    },
    {
      name: t('Buğra A.'),
      role: t('Yeni Başlayan'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      testimonial: t('Başlangıçta çok tedirgin oldum açıkçası. Ama MoonAmz\'nin verdiği eğitim ve destek sayesinde kısa sürede başarılı olmaya başladım. Yazılım çok kullanışlı ve anlaşılır.')
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('Üstün Müşteri Memnuniyeti')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                  <p className="text-orange-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.testimonial}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Warehouse Component
const Warehouse = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866" 
              alt="MoonAmz warehouse" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              {t('MoonAMZ Ara Depo')} <br />
              {t('Güvenli - Hızlı - Pratik')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('Amazon Dropshipping magazaların için sana yaratacağımız süreçi de teslimatçı yaprağımızla değişerek müşterinin sana Erişim yarrağımızla süreci yakalamasını sağlarız. süreci yakalayıp sürdürmek için müşterinin yaptığı ürünlerle ve süreçle yaşlama sonuçlara yarmıştır.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Component
const Blog = () => {
  const { t } = useTranslation();
  const blogPosts = [
    {
      title: t('Amazon Dropshipping\'in Temellerini Yakalayan'),
      excerpt: t('Amazon Dropshipping ile ilgili başlangıç rehberi. Daha alıcı süreci, alıcılar mağazası temellerini alıcı mağazasını. Alıcı alıcı alıcı süreçlerini hep gözlemleyin. Bu blog yazısında Amazon dropshipping sürecinin tüm ayrıntılarını ele alacağız.'),
      image: "https://images.unsplash.com/photo-1590761044169-b9ad903fca4d",
      category: t('Başlangıç'),
      date: t('15 Haziran 2024')
    },
    {
      title: t('En Büyük Satış Süreçleri ile Durumu Değiştitebilirsin...'),
      excerpt: t('Satış süreçlerini nasıl optimize edebileceğinizi öğrenin. En büyük satış süreçleri ile durumu değiştitebilirsiniz. Süreçleri, yazılımı hızla yasıtabilirsiniz. Alıcılar mağazalarını satış süreçlerini hep gözlemleyin düşünüşlerinizi.'),
      image: "https://images.unsplash.com/photo-1711852700869-17004fc26e44",
      category: t('Pazarlama'),
      date: t('10 Haziran 2024')
    },
    {
      title: t('Amazon Dropshipping Müşteri Değiştirmelerin Önemi: Başarının Oral Açıkları'),
      excerpt: t('Müşteri değiştirmelerin dropshipping sürecinde nasıl bir öneme sahip olduğunu öğrenin. Müşteri memnuniyeti için önemli ipuçları ve stratejiler. Müşteri deneyimini artırma yolları ve başarılı satış teknikleri.'),
      image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg",
      category: t('Müşteri Hizmetleri'),
      date: t('5 Haziran 2024')
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('Kısa Bir Mola!')} <br />
            <span className="text-orange-600">{t('MoonAmz')}</span> {t('Blog')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  <button className="text-orange-600 hover:text-orange-700 font-semibold">
                    {t('Devamını Oku →')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-extrabold text-orange-600">moon</span>
              <span className="text-3xl font-extrabold text-white">amz</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('MoonAmz Ayrıcalıklarıyla Dropshipping Dünyanızı Sizinle Ele Başlayıp, Yatırım Yapın!')}
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="text-xl hover:text-orange-600 cursor-pointer transition-colors" />
              <FaTwitter className="text-xl hover:text-orange-600 cursor-pointer transition-colors" />
              <FaInstagram className="text-xl hover:text-orange-600 cursor-pointer transition-colors" />
              <FaLinkedin className="text-xl hover:text-orange-600 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Menü')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Avantajlar')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Yazılımlarımız')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Paketler')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Özellikler')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Hakkımızda')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('İletişim')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('Hızlı Erişim')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Dropshipping Yasal Hizmet Şartları')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Gizlilik Politikası')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Çerez Politikası')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Yasal Uyarı')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Mesafeli Satış Sözleşmesi')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('Hakkımızda')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('İletişim')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-orange-600" />
                <span className="text-gray-400">+90 123 456 78 90</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-orange-600" />
                <span className="text-gray-400">info@moonamz.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-orange-600" />
                <span className="text-gray-400">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t('© 2024 MoonAmz. Tüm hakları saklıdır.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Components = {
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
};