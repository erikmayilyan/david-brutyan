import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addColorsUa.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const AddColorEn = () => {
  const [colorEn, setColorEn] = useState({
    label: '',
    value: ''
  });
  const [message, setMessage] = useState('');
  const [colorList, setColorList] = useState([]);
  const { language } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setColorEn((prevColorEn) => ({
      ...prevColorEn,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsEn/add-color-en`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(colorEn)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || (language === "ua" ? "Помилка запиту" : "Ошибка запроса"));
      };
  
      setMessage(language === "ua" ? 'КОЛІР УСПІШНО ДОДАНО' : language === "ru" ? 'ЦВЕТ УСПЕШНО ДОБАВЛЕН' : 'COLOR SUCCESSFULLY ADDED');
      alert(language === "ua" ? 'КОЛІР УСПІШНО ДОДАНО' : language === "ru" ? 'ЦВЕТ УСПЕШНО ДОБАВЛЕН' : 'COLOR SUCCESSFULLY ADDED');
      setColorEn({ label: '', value: '' });
      fetchColors();
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК" 
          : language === "ru"
            ? "ЧТО-ТО НЕ ТАК"
            : "SOMETHING WENT WRONG"
      );
    };
  };

  const fetchColors = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsEn/get-colors-en`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");
      };

      setColorList(data);
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
    fetchColors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити цей колір?" : language === "ru" ? "Вы уверены, что хотите удалить этот цвет?" : "Are you sure you want to delete this color?")) {
      try {
        const response = await fetch(`${getBaseUrl()}/api/colorsEn/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (language === "ua" ? "Помилка видалення" : language === "ru" ? "Ошибка удаления" : "Deletion Error"));
        };

        setMessage(language === "ua" ? 'КОЛІР УСПІШНО ВИДАЛЕНО' : language === "ru" ? 'ЦВЕТ УСПЕШНО УДАЛЕН' : 'COLOR SUCCESSFULLY DELETED');
        alert(language === "ua" ? 'КОЛІР УСПІШНО ВИДАЛЕНО' : language === "ru" ? 'ЦВЕТ УСПЕШНО УДАЛЕН' : 'COLOR SUCCESSFULLY DELETED');
        setColorList((prevColorList) => prevColorList.filter(color => color._id !== id));        
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
      <form onSubmit={handleSubmit} className='add-color'>
        <input 
          type="text" 
          name="label" 
          className="add-colors-input"
          value={colorEn.label} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Назва кольору" : language === "ru" ? "Название цвета" : "Color Name"} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="value" 
          className="add-colors-input"
          value={colorEn.value} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Значення кольору" : language === "ru" ? "Значение цвета" : "Color Value"} 
          required 
        />
        <br />
        <button type="submit" className="add-colors-button">
          {language === "ua" ? "Додати колір" : language === "ru" ? "Добавить цвет" : "Add Color"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='color-list'>
        <h3>{ language === "ua" ? 'Список кольорів' : language === "ru" ? 'Список цветов' : 'Color List' }</h3>
        <ul>
          {colorList.map((color) => (
            <li key={color._id} className='color-list-li'>
              <span>{color.label}: {color.value}</span>
              <button onClick={() => handleDelete(color._id)}>DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddColorEn; 