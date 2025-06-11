import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addColorsUa.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const AddSeasonRu = () => {
  const [seasonRu, setSeasonRu] = useState({
    label: '',
    value: ''
  });
  const [message, setMessage] = useState('');
  const [seasonList, setSeasonList] = useState([]);
  const { language } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSeasonRu((prevSeasonRu) => ({
      ...prevSeasonRu,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      console.log("Sending data:", JSON.stringify(seasonRu)); 
      const response = await fetch(`${getBaseUrl()}/api/seasonsRu/add-new-season-ru`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(seasonRu)
      });
  
      const data = await response.json();
      console.log("Server response:", data); 
  
      if (!response.ok) {
        throw new Error(data.message || (language === "ua" ? "Помилка запиту" : "Ошибка запроса"));
      }
  
      setMessage(language === "ua" ? 'СЕЗОН УСПІШНО ДОДАНО' : 'СЕЗОН УСПЕШНО ДОБАВЛЕН');
      alert(language === "ua" ? 'СЕЗОН УСПІШНО ДОДАНО' : 'СЕЗОН УСПЕШНО ДОБАВЛЕН');
      setSeasonRu({ label: '', value: '' });
      fetchSeasons();
    } catch (error) {
      console.error("Error submitting season:", error); // Debugging line
      setMessage(language === "ua" ? "ЩОСЬ НЕ ТАК" : "ЧТО-ТО НЕ ТАК");
    }
  };  

  const fetchSeasons = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsRu/get-seasons-ru`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setSeasonList(data);
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
          : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchSeasons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити цю сезон?" : "Вы уверены, что хотите удалить эту сезон?")) {
      try {
        const response = await fetch(`${getBaseUrl()}/api/seasonsRu/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (language === "ua" ? "Помилка видалення" : "Ошибка удаления"));
        };

        setMessage(language === "ua" ? 'СЕЗОН УСПІШНО ВИДАЛЕНО' : 'СЕЗОН УСПЕШНО УДАЛЕНА');
        alert(language === "ua" ? 'СЕЗОН УСПІШНО ВИДАЛЕНО' : 'СЕЗОН УСПЕШНО УДАЛЕНА');
        setSeasonList((prevSeasonList) => prevSeasonList.filter(season => season._id !== id));        
      } catch (error) {
        setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК ПІД ЧАС ВИДАЛЕННЯ" 
          : "ЧТО-ТО НЕ ТАК ПРИ УДАЛЕНИИ"
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
          value={seasonRu.label} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Назва сезону" : "Название сезона"} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="value" 
          className="add-colors-input"
          value={seasonRu.value} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Значення сезону" : "Значение сезона"} 
          required 
        />
        <br />
        <button type="submit" className="add-colors-button">
          {language === "ua" ? "Додати сезон" : "Добавить сезон"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='color-list'>
        <h3>{ language === "ua" ? 'Список сезонов' : 'Список сезонов' }</h3>
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

export default AddSeasonRu;
