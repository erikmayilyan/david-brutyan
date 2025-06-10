import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addColorsUa.css";

const AddCategoryEn = () => {
  const [categoryEn, setCategoryEn] = useState({
    label: '',
    value: ''
  });
  const [message, setMessage] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const { language } = useLanguage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryEn((prevCategoryEn) => ({
      ...prevCategoryEn,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:4000/api/categoriesEn/add-category-en', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(categoryEn)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || (language === "ua" ? "Помилка запиту" : "Ошибка запроса"));
      };
  
      setMessage(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ДОДАНО' : language === "ru" ? 'КАТЕГОРИЯ УСПЕШНО ДОБАВЛЕНА' : 'CATEGORY SUCCESSFULLY ADDED');
      alert(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ДОДАНО' : language === "ru" ? 'КАТЕГОРИЯ УСПЕШНО ДОБАВЛЕНА' : 'CATEGORY SUCCESSFULLY ADDED');
      setCategoryEn({ label: '', value: '' });
      fetchCategories();
    } catch (error) {
      setMessage(language === "ua" 
          ? "ЩОСЬ НЕ ТАК" 
          : language === "ru"
            ? "ЧТО-ТО НЕ ТАК"
            : "SOMETHING WENT WRONG"
      );
    };
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/categoriesEn/get-categories-en', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");
      };

      setCategoryList(data);
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
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(language === "ua" ? "Ви впевнені, що хочете видалити цю категорію?" : language === "ru" ? "Вы уверены, что хотите удалить эту категорию?" : "Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/categoriesEn/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (language === "ua" ? "Помилка видалення" : language === "ru" ? "Ошибка удаления" : "Deletion Error"));
        };

        setMessage(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ВИДАЛЕНО' : language === "ru" ? 'КАТЕГОРИЯ УСПЕШНО УДАЛЕНА' : 'CATEGORY SUCCESSFULLY DELETED');
        alert(language === "ua" ? 'КАТЕГОРІЮ УСПІШНО ВИДАЛЕНО' : language === "ru" ? 'КАТЕГОРИЯ УСПЕШНО УДАЛЕНА' : 'CATEGORY SUCCESSFULLY DELETED');
        setCategoryList((prevCategoryList) => prevCategoryList.filter(category => category._id !== id));        
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
      <form onSubmit={handleSubmit} className='add-category'>
        <input 
          type="text" 
          name="label" 
          className="add-colors-input"
          value={categoryEn.label} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Назва категорії" : language === "ru" ? "Название категории" : "Category Name"} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="value" 
          className="add-colors-input"
          value={categoryEn.value} 
          onChange={handleChange} 
          placeholder={language === "ua" ? "Значення категорії" : language === "ru" ? "Значение категории" : "Category Value"} 
          required 
        />
        <br />
        <button type="submit" className="add-colors-button">
          {language === "ua" ? "Додати категорію" : language === "ru" ? "Добавить категорию" : "Add Category"}
        </button>
      </form>
      {message && <p>{message}</p>}
      <div className='color-list'>
        <h3>{ language === "ua" ? 'Список категорій' : language === "ru" ? 'Список категорий' : 'Category List' }</h3>
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

export default AddCategoryEn; 