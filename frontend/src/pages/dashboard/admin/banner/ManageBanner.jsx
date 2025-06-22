import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import axios from 'axios';
import { getBaseUrl } from '../../../../utils/baseURL';
import './ManageBanner.css';

const ManageBanner = () => {
  const { language } = useLanguage();
  const [banner, setBanner] = useState(null);
  const [bannerUa, setBannerUa] = useState('');
  const [bannerRu, setBannerRu] = useState('');
  const [bannerEn, setBannerEn] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/banner/get-banners`);
      if (response.data && response.data.length > 0) {
        setBanner(response.data[0]);
        setBannerUa(response.data[0].banner_text_ua || '');
        setBannerRu(response.data[0].banner_text_ru || '');
        setBannerEn(response.data[0].banner_text_en || '');
      }
    } catch (error) {
      console.error('Error fetching banner:', error);
      setError(language === "ua" ? "Помилка завантаження банеру" : 
               language === "ru" ? "Ошибка загрузки баннера" : 
               "Error loading banner");
    }
  };

  const handleUpdateBanner = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // First delete all existing banners
      if (banner) {
        await axios.delete(`${getBaseUrl()}/api/banner/${banner._id}`);
      }
      // Then create a new banner
      const response = await axios.post(`${getBaseUrl()}/api/banner/add-banner`, {
        banner_text_ua: bannerUa,
        banner_text_ru: bannerRu,
        banner_text_en: bannerEn
      });
      setBanner(response.data);
      setSuccess(language === "ua" ? "Банер успішно оновлено" : 
                language === "ru" ? "Баннер успешно обновлен" : 
                "Banner updated successfully");
    } catch (error) {
      console.error('Error updating banner:', error);
      setError(language === "ua" ? "Помилка оновлення банеру" : 
               language === "ru" ? "Ошибка обновления баннера" : 
               "Error updating banner");
    }
  };

  return (
    <div className="manage-banner-container">
      <h2>{language === "ua" ? "Керування Банером" : 
           language === "ru" ? "Управление Баннером" : 
           "Manage Banner"}</h2>
      <form onSubmit={handleUpdateBanner} className="banner-form">
        <input
          type="text"
          value={bannerUa}
          onChange={e => setBannerUa(e.target.value)}
          placeholder="Введіть текст банеру (UA)"
          required
        />
        <input
          type="text"
          value={bannerRu}
          onChange={e => setBannerRu(e.target.value)}
          placeholder="Введите текст баннера (RU)"
          required
        />
        <input
          type="text"
          value={bannerEn}
          onChange={e => setBannerEn(e.target.value)}
          placeholder="Enter banner text (EN)"
          required
        />
        <button type="submit">
          {language === "ua" ? "Оновити Банер" : 
           language === "ru" ? "Обновить Баннер" : 
           "Update Banner"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <div className="banners-list">
        <h3>{language === "ua" ? "Поточний Банер" : 
             language === "ru" ? "Текущий Баннер" : 
             "Current Banner"}</h3>
        {banner && (
          <div className="banner-item">
            <p>{language === "ua" ? banner.banner_text_ua : language === "ru" ? banner.banner_text_ru : banner.banner_text_en}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBanner; 