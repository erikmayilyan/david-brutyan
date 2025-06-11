import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addColorsUa.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const AddColorsRu = () => {
  const [colorsRu, setColorsRu] = useState({
    label: '',
    value: ''
  });
  const [message, setMessage] = useState('');
  const [colorList, setColorList] = useState([]);
  const { language } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setColorsRu((prevColorsRu) => ({
      ...prevColorsRu,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsRu/add-new-color-ru`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(colorsRu)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || (language === "ua" ? "Помилка запиту" : "Ошибка запроса"));
      };
  
      setMessage(language === "ua" ? 'КОЛІР УСПІШНО ДОДАНО' : 'ЦВЕТ УСПЕШНО ДОБАВЛЕН');
      alert(language === "ua" ? 'КОЛІР УСПІШНО ДОДАНО' : 'ЦВЕТ УСПЕШНО ДОБАВЛЕН');
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК" 
          : "ЧТО-ТО НЕ ТАК"
        );
    };
  };

  const fetchColors = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsRu/get-colors-ru`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setColorList(data);
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
          : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити цей колір?" : "Вы уверены, что хотите удалить этот цвет?")) {
      try {
        const response = await fetch(`${getBaseUrl()}/api/colorsRu/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (language === "ua" ? "Помилка видалення" : "Ошибка удаления"));
        };

        setMessage(language === "ua" ? 'КОЛІР УСПІШНО ВИДАЛЕНО' : 'ЦВЕТ УСПЕШНО УДАЛЕН');
        alert(language === "ua" ? 'КОЛІР УСПІШНО ВИДАЛЕНО' : 'ЦВЕТ УСПЕШНО УДАЛЕН');
        setColorList((prevColorList) => prevColorList.filter(color => color._id !== id));        
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
      <form onSubmit={handleSubmit} className='add-colors'>
        <input 
          type="text" 
          name="label" 
          className="add-colors-input"
          value={colorsRu.label} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Назва кольору" : "Название цвета"} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="value" 
          className="add-colors-input"
          value={colorsRu.value} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Значення кольору" : "Значение цвета"} 
          required 
        />
        <br />
        <button type="submit" className="add-colors-button">
          {language === "ua" ? "Додати колір" : "Добавить цвет"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='color-list'>
        <h3>{ language === "ua" ? 'Список кольорів' : 'Список цветов' }</h3>
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

export default AddColorsRu;
