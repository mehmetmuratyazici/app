import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// i18n setup
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AuthProvider } from "react-oidc-context";
import { cognitoAuthConfig } from "./config";

const resources = {
  TR: {
    translation: {
      "Avantajlar": "Avantajlar",
      "Yazılımlarımız": "Yazılımlarımız",
      "Paketler": "Paketler",
      "Özellikler": "Özellikler",
      "Hakkımızda": "Hakkımızda",
      "İletişim": "İletişim",
      "Giriş Yap": "Giriş Yap",
      "Şimdi Dene": "Şimdi Dene",
      "7 GÜN ÜCRETSİZ DENE": "7 GÜN ÜCRETSİZ DENE",
      "English": "İngilizce",
      "Türkçe": "Türkçe",
      // ... diğer metinler ...
    }
  },
  EN: {
    translation: {
      "Avantajlar": "Advantages",
      "Yazılımlarımız": "Our Software",
      "Paketler": "Packages",
      "Özellikler": "Features",
      "Hakkımızda": "About Us",
      "İletişim": "Contact",
      "Giriş Yap": "Login",
      "Şimdi Dene": "Try Now",
      "7 GÜN ÜCRETSİZ DENE": "TRY 7 DAYS FREE",
      "English": "English",
      "Türkçe": "Turkish",
      // ... diğer metinler ...
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "TR",
    fallbackLng: "TR",
    interpolation: {
      escapeValue: false
    }
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
