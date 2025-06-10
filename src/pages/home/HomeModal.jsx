import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import './HomeModal.css';

const HomeModal = ({ onClose }) => {
  const { language, changeLanguage } = useLanguage(); 

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    onClose();
  };

  return (
    <div className='popup-modal-overlay'>
      <div className='popup-modal-content'> 
        <h2>
          { language === "ua" ? 'ВИБЕРІТЬ ВАШУ МОВУ' : language === "ru" ? 'ВЫБЕРИТЕ ВАШ ЯЗЫК' : 'CHOOSE YOUR LANGUAGE' }
        </h2>
        <div className="modal-language-buttons">
          <button className="modal-language-button" onClick={() => handleLanguageChange('ua')}>
            {language === "ua" ? 'УКРАЇНСЬКА' : language === "ru" ? 'УКРАИНСКИЙ' : 'UKRAINIAN'}
          </button>
          <button className="modal-language-button" onClick={() => handleLanguageChange('ru')}>
            {language === "ua" ? 'РУССКИЙ' : language === "ru" ? 'РУССКИЙ' : 'RUSSIAN'}
          </button>
          <button className="modal-language-button" onClick={() => handleLanguageChange('en')}>
            {language === "ua" ? 'ENGLISH' : language === "ru" ? 'АНГЛИЙСКИЙ' : 'ENGLISH'}
          </button>
        </div>
      </div>
    </div>
  )
};

export default HomeModal
