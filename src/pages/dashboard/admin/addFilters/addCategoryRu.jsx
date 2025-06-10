import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addColorsUa.css";

const AddCategoryRu = () => {
  const [categoryRu, setCategoryRu] = useState({
    label: '',
    value: ''
  });
  const [message, setMessage] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const { language } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryRu((prevCategoryRu) => ({
      ...prevCategoryRu,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:4000/api/categoriesRu/add-new-category-ru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(categoryRu)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || (language === "ua" ? "Помилка запиту" : "Ошибка запроса"));
      };
  
      setMessage(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ДОДАНО' : 'КАТЕГОРИЯ УСПЕШНО ДОБАВЛЕНА');
      alert(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ДОДАНО' : 'КАТЕГОРИЯ УСПЕШНО ДОБАВЛЕНА');
      setCategoryRu({ label: '', value: '' });
      fetchCategories();
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК" 
          : "ЧТО-ТО НЕ ТАК"
      );
    };
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/categoriesRu/get-categories-ru', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setCategoryList(data);
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
          : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити цю категорію?" : "Вы уверены, что хотите удалить эту категорию?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/categoriesRu/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (language === "ua" ? "Помилка видалення" : "Ошибка удаления"));
        };

        setMessage(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ВИДАЛЕНО' : 'КАТЕГОРИЯ УСПЕШНО УДАЛЕНА');
        alert(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ВИДАЛЕНО' : 'КАТЕГОРИЯ УСПЕШНО УДАЛЕНА');
        setCategoryList((prevCategoryList) => prevCategoryList.filter(category => category._id !== id));        
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
      <form onSubmit={handleSubmit} className='add-category'>
        <input 
          type="text" 
          name="label" 
          className="add-colors-input"
          value={categoryRu.label} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Назва категорії" : "Название категории"} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="value" 
          className="add-colors-input"
          value={categoryRu.value} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Значення категорії" : "Значение категории"} 
          required 
        />
        <br />
        <button type="submit" className="add-colors-button">
          {language === "ua" ? "Додати категорію" : "Добавить категорию"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='color-list'>
        <h3>{ language === "ua" ? 'Список категорій' : 'Список категорий' }</h3>
        <ul>
          {categoryList.map((category) => (
            <li key={category._id} className='color-list-li'>
              <span>{category.label}: {category.value}</span>
              <button onClick={() => handleDelete(category._id)}>DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategoryRu;
