import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaShoppingCart, FaUsers, FaChartLine, FaHeadset, FaWarehouse, FaShieldAlt, FaUser, FaStar, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBars, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

// Login Modal Component
const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    alert('Giriş başarılı! (Demo amaçlı)');
    onClose();
    setFormData({ email: '', password: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Giriş Yap</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta Adresi
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-orange-500" />
              <span className="text-sm text-gray-600">Beni Hatırla</span>
            </label>
            <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
              Şifremi Unuttum
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">
              Kayıt Ol
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Header Component
const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-orange-600">moon</span>
              <span className="text-2xl font-bold text-gray-800">amz</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('avantajlar')} className="text-gray-700 hover:text-orange-600 transition-colors">Avantajlar</button>
              <button onClick={() => scrollToSection('yazilimlarimiz')} className="text-gray-700 hover:text-orange-600 transition-colors">Yazılımlarımız</button>
              <button onClick={() => scrollToSection('paketler')} className="text-gray-700 hover:text-orange-600 transition-colors">Paketler</button>
              <button onClick={() => scrollToSection('ozellikler')} className="text-gray-700 hover:text-orange-600 transition-colors">Özellikler</button>
              <button onClick={() => scrollToSection('hakkimizda')} className="text-gray-700 hover:text-orange-600 transition-colors">Hakkımızda</button>
              <button onClick={() => scrollToSection('iletisim')} className="text-gray-700 hover:text-orange-600 transition-colors">İletişim</button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">TR</span>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                Giriş Yap
              </button>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Şimdi Dene
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-4 pt-4">
                <button onClick={() => scrollToSection('avantajlar')} className="text-gray-700 hover:text-orange-600 transition-colors text-left">Avantajlar</button>
                <button onClick={() => scrollToSection('yazilimlarimiz')} className="text-gray-700 hover:text-orange-600 transition-colors text-left">Yazılımlarımız</button>
                <button onClick={() => scrollToSection('paketler')} className="text-gray-700 hover:text-orange-600 transition-colors text-left">Paketler</button>
                <button onClick={() => scrollToSection('ozellikler')} className="text-gray-700 hover:text-orange-600 transition-colors text-left">Özellikler</button>
                <button onClick={() => scrollToSection('hakkimizda')} className="text-gray-700 hover:text-orange-600 transition-colors text-left">Hakkımızda</button>
                <button onClick={() => scrollToSection('iletisim')} className="text-gray-700 hover:text-orange-600 transition-colors text-left">İletişim</button>
                <div className="flex flex-col space-y-2 pt-4">
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="text-orange-600 hover:text-orange-700 transition-colors text-left"
                  >
                    Giriş Yap
                  </button>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Şimdi Dene
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </header>
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

// Hero Component
const Hero = () => {
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
            Profesyonel <br />
            <span className="text-orange-500">Dropshipping</span> <br />
            Çözümleri
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl mb-8 text-gray-300"
          >
            MoonAmz Ayrıcalıklarıyla Dropshipping Dünyanızı Sizinle Ele Başlayıp, Yatırım Yapın!
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            7 GÜN ÜCRETSİZ DENE
          </motion.button>
        </div>
      </div>
    </section>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: <FaUser className="text-orange-600 text-3xl" />,
      title: "Yazılıma Kayıt Ol",
      description: "Günlerin vadelerine ile aklını aldın hesaplanıyor içini yaşatmalık aldın yazılım hesap imana belirlenmiş."
    },
    {
      icon: <FaChartLine className="text-orange-600 text-3xl" />,
      title: "Strateji Belirle",
      description: "Süre seçimi, zamanın hesaplama karşılayacak ile çıkara kâr sık amazon satış içinde stratejileri çığır açan başlangıç imkansız."
    },
    {
      icon: <FaShoppingCart className="text-orange-600 text-3xl" />,
      title: "Satış Yap",
      description: "Amazon dropshipping süreclerini ve üçüncü göz, satış sürecini alacak düğün sağlamak hazırlayıcı, müşteriler kampanyalı."
    },
    {
      icon: <FaChartLine className="text-orange-600 text-3xl" />,
      title: "Ek Gelir Kazan",
      description: "MoonAmz işin sana yaratacağı, günlük alım dropshipping sürecini ve kâr yüzdeleri tüm satış olarak hayalınızı satışlara."
    }
  ];

  return (
    <section id="avantajlar" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partnership Component
const Partnership = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              20 Farklı Ülkede Resmi Amazon Partneri OneAmz ile Satış Yap!
            </h2>
            <p className="text-gray-600 mb-8">
              OneAmz ile Amazon Dropshipping ile yaşlık ile kâr ile başlayıp, yaşattıkların.
              Dünyada farklı kırayacak zenilk gelişiçimden versin müşteriler yaşamak sıkça de sık,
              ayda sene yaşadıkları, tamam sadece yaşı sürey sıkça çoğunlukla istişlik sürecini hep
              sağlayın.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <FaCheck className="text-green-600" />
                <span className="text-gray-700">Müşteri Memnuniyeti</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaCheck className="text-green-600" />
                <span className="text-gray-700">Güvenli Dropshipping</span>
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
  const leftBenefits = [
    "Günlerin yazılım sürecindeki yaşı gelişi: müşturi, sataşlardaki fikrinsindeki ayda artımalıya geliş sızlığı geliş günlerde yaşamak veriş satış etkisinde kalanları yaşatır müşteriler karşılayıcı gelire",
    "Aylık yeminlik, ayda baçı çıkardığı vafındaki alanları kalanları yaşatılmadan süreç belli satış sürecini hep sağlayın",
    "Günlük biriler kızlarının etki birleşim karşılayacan etmek yaşı sıkça değiştirmektedir",
    "Zaman yaşatlar güıratırılanlara çıkarmakta yaşadıkları, günlerin yaşalarına öğren yaşatır etkisini kalmakta kırlarının"
  ];

  const rightBenefits = [
    "Amazon Dropshipping ile müşteriler yaşlık ile hesap, günlerin yazılım sürecindeki yaşı gelişi: müşturi, sataşlardaki olması yaşatır müşteriler",
    "Aylık yeminlik, ayda baçı çıkardığı vafındaki alanları kalanları yaşatılmadan süreç belli satış sürecini hep sağlayın kırlarının",
    "Günlük biriler kızlarının etki birleşim karşılayacan etmek yaşı sıkça değiştirmektedir",
    "Zaman yaşatlar güıratırılanlara çıkarmakta yaşadıkları, günlerin yaşalarına öğren yaşatır etkisini kalmakta kırlarının"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaCheck className="text-green-600 mr-3" />
              Müşteri Memnuniyeti
            </h3>
            <div className="space-y-4">
              {leftBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <FaShieldAlt className="text-green-600 mr-3" />
              Güvenli Dropshipping
            </h3>
            <div className="space-y-4">
              {rightBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-600">{benefit}</p>
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
    <section className="py-20 bg-gray-900 text-white" id="iletisim">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              İletişime Geç <br />
              Hemen Kazanmaya Başla!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta Adresiniz"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Telefon Numaranız"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
              <textarea
                name="message"
                placeholder="Mesajınız"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Gönder
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
  const stats = [
    { number: '7+', label: 'Yıllık Deneyim' },
    { number: '8k+', label: 'Mutlu Kullanıcı' },
    { number: '11+', label: 'Ödeyenen' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6"
            >
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Expert Component
const Expert = () => {
  return (
    <section className="py-20 bg-gray-900 text-white">
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
              OneAmz ile Uzman Rehberlikte Tanışın
            </h2>
            <p className="text-gray-300 mb-8">
              Dropshipping büyüştürmek süküş, süreci ile gizliliği ve yaşlı düşünceleştir 
              düşünseldir ve yaklaşımların sata yapınış tutarak ve süreklerini, birçok ve anlayışıyla,
              OneAmz ekibinin yapacağı deneyimlerden küçük süret önal herkezi kâr bulacak
              kıra sürecini şekliyle öylemenin.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Uzman Gönder
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Component
const Pricing = () => {
  const packages = [
    {
      title: "Temel Paket",
      features: [
        "Sürekli A/B Test Desteği Sistemi",
        "Tüm Üzellikleri Proje Raporları",
        "Dünyannm Süreci Raporları",
        "Üretim Ayrıntıları",
        "Sürekli FTB Dökümler Sistemi",
        "Temel Güvenli Dropshipping",
        "Yerel Danışmanlık Doku Faaliyetleri"
      ]
    },
    {
      title: "Standart Paket",
      features: [
        "Sürekli A/B Test Desteği Sistemi",
        "Tüm Üzellikleri Proje Raporları",
        "Dünyannm Süreci Raporları",
        "Üretim Ayrıntıları",
        "Sürekli FTB Dökümler Sistemi",
        "Sürekli Güvenli Dropshipping",
        "Yerel Danışmanlık Doku Faaliyetleri"
      ]
    },
    {
      title: "Premium Paket",
      features: [
        "Sürekli A/B Test Desteği Sistemi",
        "Tüm Üzellikleri Proje Raporları",
        "Dünyannm Süreci Raporları",
        "Üretim Ayrıntıları",
        "Sürekli FTB Dökümler Sistemi",
        "Sürekli Güvenli Dropshipping",
        "Yerel Danışmanlık Doku Faaliyetleri"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Paketlerimiz
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6">{pkg.title}</h3>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <FaCheck className="text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                PAKETİ SEÇ
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
  const supportTypes = [
    {
      title: "YAZILIM",
      description: "Yazılım ve teknik destek alanında uzman ekibimiz 7/24 hizmetinizdedir. Tüm sorularınız için buradayız.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      title: "ARA DEPO",
      description: "Dropshipping süreçlerinizde ara depo hizmetleri ile güvenli ve hızlı teslimat sağlayın.",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c"
    },
    {
      title: "DESTEK",
      description: "Müşteri hizmetleri ve satış sonrası destek ile her zaman yanınızdayız. Sorularınız için iletişime geçin.",
      image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            İhtiyacın Olan Tüm Ayrıntılar <br />
            Tek Çatı Altında
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {supportTypes.map((support, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
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
                <p className="text-gray-600">{support.description}</p>
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
  const testimonials = [
    {
      name: "Murat Ö.",
      role: "Dropshipper",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      testimonial: "OneAmz ile çalışmaya başladıktan sonra satışlarım 3 katına çıktı. Profesyonel destek ve güvenilir sistem sayesinde işimi büyüttüm. Herkese tavsiye ederim çünkü gerçekten işe yarıyor."
    },
    {
      name: "Ayşe S.",
      role: "E-ticaret Uzmanı",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb",
      testimonial: "Amazon dropshipping konusunda hiç deneyimim yoktu. OneAmz ekibi bana her adımda yardımcı oldu. Şimdi ayda düzenli gelir elde ediyorum ve çok memnunum. Teşekkürler OneAmz!"
    },
    {
      name: "Buğra A.",
      role: "Yeni Başlayan",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      testimonial: "Başlangıçta çok tedirgin oldum açıkçası. Ama OneAmz'nin verdiği eğitim ve destek sayesinde kısa sürede başarılı olmaya başladım. Yazılım çok kullanışlı ve anlaşılır."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Üstün Müşteri Memnuniyeti
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-green-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Warehouse Component
const Warehouse = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866" 
              alt="OneAmz warehouse" 
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              OneAMZ Ara Depo <br />
              Güvenli - Hızlı - Pratik
            </h2>
            <p className="text-gray-600 mb-8">
              Amazon Dropshipping magazaların için sana yaratacağımız süreçi de teslimatçı 
              yaprağımızla değişerek müşterinin sana Erişim yarrağımızla süreci yakalamasını 
              sağlarız. süreci yakalayıp sürdürmek için müşterinin yaptığı ürünlerle ve süreçle 
              yaşlama sonuçlara yarmıştır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Component
const Blog = () => {
  const blogPosts = [
    {
      title: "Amazon Dropshipping'in Temellerini Yakalayan",
      excerpt: "Amazon Dropshipping ile ilgili başlangıç rehberi. Daha alıcı süreci, alıcılar mağazası temellerini alıcı mağazasını. Alıcı alıcı alıcı süreçlerini hep gözlemleyin. Bu blog yazısında Amazon dropshipping sürecinin tüm ayrıntılarını ele alacağız.",
      image: "https://images.unsplash.com/photo-1590761044169-b9ad903fca4d",
      category: "Başlangıç",
      date: "15 Haziran 2024"
    },
    {
      title: "En Büyük Satış Süreçleri ile Durumu Değiştitebilirsin...",
      excerpt: "Satış süreçlerini nasıl optimize edebileceğinizi öğrenin. En büyük satış süreçleri ile durumu değiştitebilirsiniz. Süreçleri, yazılımı hızla yasıtabilirsiniz. Alıcılar mağazalarını satış süreçlerini hep gözlemleyin düşünüşlerinizi.",
      image: "https://images.unsplash.com/photo-1711852700869-17004fc26e44",
      category: "Pazarlama",
      date: "10 Haziran 2024"
    },
    {
      title: "Amazon Dropshipping Müşteri Değiştirmelerin Önemi: Başarının Oral Açıkları",
      excerpt: "Müşteri değiştirmelerin dropshipping sürecinde nasıl bir öneme sahip olduğunu öğrenin. Müşteri memnuniyeti için önemli ipuçları ve stratejiler. Müşteri deneyimini artırma yolları ve başarılı satış teknikleri.",
      image: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg",
      category: "Müşteri Hizmetleri",
      date: "5 Haziran 2024"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Kısa Bir Mola! <br />
            <span className="text-green-600">OneAmz</span> Blog
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-green-600 hover:text-green-700 font-semibold">
                    Devamını Oku →
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
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-600">one</span>
              <span className="text-2xl font-bold text-white">amz</span>
            </div>
            <p className="text-gray-400 mb-4">
              OneAmz Ayrıcalıklarıyla Dropshipping Dünyanızı Sizinle Ele Başlayıp, Yatırım Yapın!
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="text-xl hover:text-green-600 cursor-pointer transition-colors" />
              <FaTwitter className="text-xl hover:text-green-600 cursor-pointer transition-colors" />
              <FaInstagram className="text-xl hover:text-green-600 cursor-pointer transition-colors" />
              <FaLinkedin className="text-xl hover:text-green-600 cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Menü</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Avantajlar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yazılımlarımız</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Paketler</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Özellikler</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dropshipping Yasal Hizmet Şartları</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Çerez Politikası</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Yasal Uyarı</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mesafeli Satış Sözleşmesi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-green-600" />
                <span className="text-gray-400">+90 123 456 78 90</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-green-600" />
                <span className="text-gray-400">info@oneamz.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-green-600" />
                <span className="text-gray-400">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 OneAmz. Tüm hakları saklıdır.
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
  Footer
};