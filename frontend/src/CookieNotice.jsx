import React from 'react';
import CookieConsent from 'react-cookie-consent';
import { useLanguage } from '../src/LanguageContext';
import './CookieNotice.css';

const CookieNotice = () => {
  const { language } = useLanguage();

  const buttonLang = () => {
    return language === "ua" 
      ? 'Я РОЗУМІЮ' 
      : language === "ru"
        ? 'Я ПОНИМАЮ'
        : 'I UNDERSTAND';
  };

  const handleAccept = () => {
    console.log("Cookies have been accepted.");
  };

  const handleDecline = () => {
    console.log("Cookies have been declined.");
  };

  return (
    <CookieConsent 
      debug={true} 
      style={{ background: '#000', textAlign: 'left' }}
      buttonStyle={{ color: '#000', background: '#fff', fontSize: '14px', marginRight: '10px' }}
      declineButtonStyle={{ color: '#000', background: '#ddd', fontSize: '14px', marginLeft: '10px' }}
      buttonText={buttonLang()} 
      declineButtonText={language === "ua" 
        ? 'Я ВІДМОВЛЯЮСЯ' 
        : language === "ru"
          ? 'Я ОТКАЗЫВАЮСЬ'
          : 'I DECLINE'}
      expires={365}
      onAccept={handleAccept}    
      onDecline={handleDecline}  
    >
      {language === "ua" ? (
        <div>
          ЦЕЙ САЙТ ВИКОРИСТОВУЄ ФАЙЛИ COOKIE. ПЕРЕГЛЯНЬТЕ НАШУ <u><a href="/ua/termsconditions">ПОЛІТИКУ КОНФІДЕНЦІЙНОСТІ</a></u> ДЛЯ ДОДАТКОВОЇ ІНФОРМАЦІЇ.
        </div>
      ) : language === "ru" ? (
        <div>
          ЭТОТ САЙТ ИСПОЛЬЗУЕТ ФАЙЛЫ COOKIE. ОЗНАКОМЬТЕСЬ С НАШЕЙ <u><a href="/iv/termsconditions">ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ</a></u> ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ.
        </div>
      ) : (
        <div>
          THIS SITE USES COOKIES. PLEASE REVIEW OUR <u><a href="/en/termsconditions">PRIVACY POLICY</a></u> FOR MORE INFORMATION.
        </div>
      )}
    </CookieConsent>
  );
};

export default CookieNotice;
