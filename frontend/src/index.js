import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// i18n setup
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { AuthProvider } from "react-oidc-context";
import { cognitoAuthConfig } from "./config";
import resources from "./lang-config";

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
