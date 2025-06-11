import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import "./Home.css";
import Routine from './Routine';
import HomeModal from './HomeModal';
import TrendingProducts from '../shop/TrendingProducts';
import Opinions from '../reviews/Opinions';
import Blogs from '../blogs/Blogs';
import MoreInfo from './MoreInfo';

const Home = () => {
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem('modalShown');
    if (!hasModalBeenShown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    };
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.setItem('modalShown', 'true');
  };

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };

  return (
    <div className='home'>
      {isModalOpen && <HomeModal onClose={handleCloseModal} />}
      <div className='banner banner-plus'>
        <h1>
          {language == "ua" ? 'ВАШ СТИЛЬ ТА КОМФОРТ —НАША ПРИСТРАСТЬ' : language == "ru" ? 'ВАШ СТИЛЬ И КОМФОРТ — НАША СТРАСТЬ' : 'YOUR STYLE AND COMFORT ARE OUR PASSION'}
        </h1>
        <p>
          {language == "ua" 
            ? "MILDO — бренд стильного та зручного взуття. Ми поєднуємо сучасні тенденції з високою якістю, щоб кожен крок був комфортним і впевненим." 
            : language == "ru" 
              ? "MILDO — бренд стильной и удобной обуви. Мы сочетаем современные тренды с высоким качеством, чтобы каждый шаг был комфортным и уверенным."
              : "MILDO is a brand of stylish and comfortable footwear. We combine modern trends with high quality to ensure every step is comfortable and confident."}
        </p>
        <a className="the-button">
          <Link to={`${getLanguagePrefix()}/shop`}>
            {language == "ua" ? "ДОСЛІДЖУЙ ЗАРАЗ" : language == "ru" ? "ИССЛЕДУЙТЕ СЕЙЧАС" : "EXPLORE NOW"}
          </Link>
        </a>
      </div>
      <MoreInfo />
      <Routine />
      <TrendingProducts />
      <Blogs />
    </div>
  )
}

export default Home
