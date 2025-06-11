import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL';
import './MoreInfo.css';

const MoreInfo = () => {
  const { language } = useLanguage();
  const [bannerText, setBannerText] = useState('');

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/banner/get-banners`);
      if (response.data && response.data.length > 0) {
        setBannerText(response.data[0].banner_text);
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
    }
  };

  useEffect(() => {
    fetchBanner();
    // Set up polling to check for updates every 5 seconds
    const interval = setInterval(fetchBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  // Create an array of 20 items for smoother infinite scrolling
  const bannerItems = Array(20).fill(null);

  return (
    <div className="more-info-slider">
      <div className="more-info-list">
        {bannerItems.map((_, index) => (
          <div key={index} className="more-info-item">
            <p className="discount-text">{bannerText || 'ЗНИЖКИ ДО 50%'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreInfo;
