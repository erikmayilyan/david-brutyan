import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addColorsUa.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const AddSeasonEn = () => {
  const [seasonEn, setSeasonEn] = useState({
    label: '',
    value: ''
  });
  const [message, setMessage] = useState('');
  const [seasonList, setSeasonList] = useState([]);
  const { language } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSeasonEn((prevSeasonEn) => ({
      ...prevSeasonEn,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsEn/add-season-en`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(seasonEn)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || (language === "ua" ? "Помилка запиту" : "Ошибка запроса"));
      };
  
      setMessage(language === "ua" ? 'СЕЗОН УСПІШНО ДОДАНО' : language === "ru" ? 'СЕЗОН УСПЕШНО ДОБАВЛЕН' : 'SEASON SUCCESSFULLY ADDED');
      alert(language === "ua" ? 'СЕЗОН УСПІШНО ДОДАНО' : language === "ru" ? 'СЕЗОН УСПЕШНО ДОБАВЛЕН' : 'SEASON SUCCESSFULLY ADDED');
      setSeasonEn({ label: '', value: '' });
      fetchSeasons();
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК" 
          : language === "ru"
            ? "ЧТО-ТО НЕ ТАК"
            : "SOMETHING WENT WRONG"
      );
    };
  };

  const fetchSeasons = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsEn/get-seasons-en`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");
      };

      setSeasonList(data);
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
          : language === "ru"
            ? "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
            : "SOMETHING WENT WRONG WHILE LOADING"
      );
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити цю сезон?" : language === "ru" ? "Вы уверены, что хотите удалить эту сезон?" : "Are you sure you want to delete this season?")) {
      try {
        const response = await fetch(`${getBaseUrl()}/api/seasonsEn/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (language === "ua" ? "Помилка видалення" : language === "ru" ? "Ошибка удаления" : "Deletion Error"));
        };

        setMessage(language === "ua" ? 'СЕЗОН УСПІШНО ВИДАЛЕНО' : language === "ru" ? 'СЕЗОН УСПЕШНО УДАЛЕНА' : 'SEASON SUCCESSFULLY DELETED');
        alert(language === "ua" ? 'СЕЗОН УСПІШНО ВИДАЛЕНО' : language === "ru" ? 'СЕЗОН УСПЕШНО УДАЛЕНА' : 'SEASON SUCCESSFULLY DELETED');
        setSeasonList((prevSeasonList) => prevSeasonList.filter(season => season._id !== id));        
      } catch (error) {
        setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК ПІД ЧАС ВИДАЛЕННЯ" 
          : language === "ru"
            ? "ЧТО-ТО НЕ ТАК ПРИ УДАЛЕНИИ"
            : "SOMETHING WENT WRONG WHILE DELETING"
        );
      }
    }
  };

  return (
    <div className='add-product-info'>
      <form onSubmit={handleSubmit} className='add-season'>
        <input 
          type="text" 
          name="label" 
          className="add-colors-input"
          value={seasonEn.label} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Назва сезону" : language === "ru" ? "Название сезона" : "Season Name"} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="value" 
          className="add-colors-input"
          value={seasonEn.value} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Значення сезону" : language === "ru" ? "Значение сезона" : "Season Value"} 
          required 
        />
        <br />
        <button type="submit" className="add-colors-button">
          {language === "ua" ? "Додати сезон" : language === "ru" ? "Добавить сезон" : "Add Season"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='color-list'>
        <h3>{ language === "ua" ? 'Список сезонов' : language === "ru" ? 'Список сезонов' : 'Season List' }</h3>
        <ul>
          {seasonList.map((season) => (
            <li key={season._id} className='color-list-li'>
              <span>{season.label}: {season.value}</span>
              <button onClick={() => handleDelete(season._id)}>DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddSeasonEn; 