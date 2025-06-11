import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const savedLanguage = localStorage.getItem("language") || (location.pathname.startsWith("/iv") ? "ru" : location.pathname.startsWith("/en") ? "en" : "ua");

  const [language, setLanguage] = useState(savedLanguage);

  useEffect(() => {
    const pathLanguage = location.pathname.startsWith("/iv") ? "ru" : location.pathname.startsWith("/en") ? "en" : "ua";
    setLanguage(pathLanguage);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("language", language);
    const currentPath = location.pathname.replace(/^\/(iv|en|ua)/, "");

    if (currentPath.startsWith("/success")) return;

    if (language === "ru") {
      navigate(`/iv${currentPath}`, { replace: true });
    } else if (language === "en") {
      navigate(`/en${currentPath}`, { replace: true });
    } else {
      navigate(`/ua${currentPath}`, { replace: true });
    }
  }, [language, navigate, location.pathname]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
