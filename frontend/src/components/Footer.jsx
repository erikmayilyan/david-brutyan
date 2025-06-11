import React, { useState } from 'react';
import { useLanguage } from "../LanguageContext";
import firstImage from '../assets/first.jpg';
import secondImage from '../assets/second.jpg';
import thirdImage from '../assets/third.jpg';
import fourthImage from '../assets/fourth.jpg';
import fifthImage from '../assets/fifth.jpg';
import sixthImage from '../assets/sixth.jpg';
import seventhImage from '../assets/seventh.jpg';
import eightImage from '../assets/eight.jpg';
import ninthImage from '../assets/ninth.jpg';
import "./Footer.css";
import HelpModal from './HelpModal';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };

  return (
    <div>
      <footer className='footer'>
        <div className='footer-more'>
          <h4>
            { language === "ua" ? 'КОНТАКТИ' : language === "ru" ? 'КОНТАКТЫ' : 'CONTACTS'}
          </h4>
          <p>
            <span>
              <i class="ri-mail-line"></i>
            </span>
            mildoshoes2000@gmail.com 
          </p>
          <p>
            <span>
              <i class="ri-phone-line"></i>
            </span>
            +380673923721 
          </p>
        </div>
        <div className='footer-other'>
          <h4>
            { language === "ua" ? 'КОМПАНІЯ' : language === "ru" ? 'КОМПАНИЯ' : 'COMPANY' }
          </h4>
          <a href={`${getLanguagePrefix()}/`}>
            { language === "ua" ? 'ГОЛОВНА' : language === "ru" ? 'ГЛАВНАЯ' : 'HOME' }
          </a>
          <a href={`${getLanguagePrefix()}/about`}>
            { language === "ua" ? 'ПРО НАС' : language === "ru" ? 'О НАС' : 'ABOUT' }
          </a>
          <a href={`${getLanguagePrefix()}/termsconditions`}>
            { language === "ua" ? 'УМОВИ ТА ПОЛОЖЕННЯ' : language === "ru" ? 'УСЛОВИЯ И ПОЛОЖЕНИЯ' : 'TERMS & CONDITIONS' }
          </a>
        </div>
        <div className='footer-other'>
          <h4>
            { language === "ua" ? 'ІНШІ ПОСИЛАННЯ' : language === "ru" ? 'ДРУГИЕ ССЫЛКИ' : 'OTHER LINKS' }
          </h4>
          <a href="/" onClick={(e) => { 
            e.preventDefault(); 
            setIsOpen(true);
          }}>          
            { language === "ua" ? 'ДОПОМОГА' : language === "ru" ? 'ПОМОЩЬ' : 'HELP' }
          </a>
          <a href={`${getLanguagePrefix()}/shop`}>
            { language === "ua" ? 'МАГАЗИН' : language === "ru" ? 'МАГАЗИН' : 'SHOP' }
          </a>
          <a href={`${getLanguagePrefix()}/faq`}>
            { language === "ua" ? 'FAQ' : language === "ru" ? 'FAQ' : 'FAQ' }
          </a>
        </div>
        <HelpModal open={isOpen} onClose={() => setIsOpen(false)}>
              <div className='footer-more'>
                <h4>
                  { language === "ua" ? 'ДОПОМОГА' : language === "ru" ? 'ПОМОЩЬ' : 'HELP' }
                </h4>
                <p>
                  <span>
                    <i class="ri-map-pin-2-line"></i>
                  </span>
                  { language === "ua" ? 'вул. Велика Васильківська, 55, Київ, Україна, 02000' : language === "ru" ? 'ул. Большая Васильковская, 55, Киев, Украина, 02000' : '55 Velyka Vasylkivska St, Kyiv, Ukraine, 02000' }
                </p>
                <p>
                  <span>
                    <i class="ri-mail-line"></i>
                  </span>
                  support@mildo.ua
                </p>
                <p>
                  <span>
                    <i class="ri-phone-line"></i>
                  </span>
                  +380 44 444 44 44
                </p>
              </div>
        </HelpModal>
        <div className='footer-other'>
          <h4>INSTAGRAM</h4>
          <div href="https://www.instagram.com/mildo_shoes/" className='instagram'>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={firstImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={secondImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={thirdImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={fourthImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={fifthImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={sixthImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={seventhImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={eightImage} alt="" />
            </a>
            <a href="https://www.instagram.com/mildo_shoes/" target="_blank" rel="noopener noreferrer">
              <img src={ninthImage} alt="" />
            </a>
          </div>
        </div>
      </footer>
      <div className='footer-bar'>
        Copyright &#169; 2025 MILDO. ALL Rights Reserved
      </div>
    </div>
  )
}

export default Footer
