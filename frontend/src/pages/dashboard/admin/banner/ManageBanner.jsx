import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import axios from 'axios';
import './ManageBanner.css';

const ManageBanner = () => {
  const { language } = useLanguage();
  const [banner, setBanner] = useState(null);
  const [newBannerText, setNewBannerText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/banner/get-banners');
      if (response.data && response.data.length > 0) {
        setBanner(response.data[0]);
        setNewBannerText(response.data[0].banner_text);
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
        await axios.delete(`http://localhost:4000/api/banner/${banner._id}`);
      }
      
      // Then create a new banner
      const response = await axios.post('http://localhost:4000/api/banner/add-banner', {
        banner_text: newBannerText
      });
      
      console.log('Banner updated successfully:', response.data);
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
          value={newBannerText}
          onChange={(e) => setNewBannerText(e.target.value)}
          placeholder={language === "ua" ? "Введіть текст банеру" : 
                     language === "ru" ? "Введите текст баннера" : 
                     "Enter banner text"}
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
            <p>{banner.banner_text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBanner; 