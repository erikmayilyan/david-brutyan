import React from 'react';
import { useLanguage } from '../../LanguageContext';
import "./Routine.css";

const Routine = () => {
  const { language } = useLanguage();

  const routines = [
    { 
      name: language === 'ua' 
        ? 'БЕЗКОШТОВНЕ ПОВЕРНЕННЯ' 
        : language === 'ru'
          ? 'БЕСПЛАТНЫЙ ВОЗВРАТ'
          : 'FREE RETURNS',
      icon: <i className="ri-store-line"></i> 
    },
    { 
      name: language === 'ua' 
        ? 'БЕЗПЕЧНА ОПЛАТА' 
        : language === 'ru'
          ? 'БЕЗОПАСНАЯ ОПЛАТА'
          : 'SECURE PAYMENT',
      icon: <i className="ri-bank-card-line"></i> 
    },
    { 
      name: language === 'ua' 
        ? 'БЕЗКОШТОВНА ДОСТАВКА' 
        : language === 'ru'
          ? 'БЕСПЛАТНАЯ ДОСТАВКА'
          : 'FREE SHIPPING',
      icon: <i className="ri-truck-line"></i> 
    },
    { 
      name: language === 'ua' 
        ? 'ПІДТРИМКА КЛІЄНТІВ' 
        : language === 'ru'
          ? 'ПОДДЕРЖКА КЛИЕНТОВ'
          : 'CUSTOMER SUPPORT',
      icon: <i className="ri-customer-service-line"></i> 
    }
  ];

  return (
    <div className="routine">
      {
        routines.map((routine) => (
          <div className="routine-more">
            <p>{routine.icon}</p><br />
            <span>{routine.name}</span>
          </div>
        ))
      }
    </div>
  );
};

export default Routine;
