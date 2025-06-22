import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./addFAQ.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const AddFAQ = () => {
  const { language } = useLanguage('');
  
  const [formData, setFormData] = useState({
    faq_question_ua: '',
    faq_question_ru: '',
    faq_question_en: '',
    faq_answer_ua: '',
    faq_answer_ru: '',
    faq_answer_en: ''
  });

  const [faq, setFaq] = useState([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(`${getBaseUrl()}/api/faq/`);
        const data = await response.json();
        console.log(data);
        setFaq(data);
      } catch (error) {
        console.error('Error Fetching Blogs:', error);
      };
    };

    fetchFAQs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getBaseUrl()}/api/faq/post-faq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("FAQ Add Successfully");
        setFaq((prevFAQs) => [...prevFAQs, data]);
      } else {
        alert(`Error: ${data.message}`);
      };
    } catch (error) {
      console.error("Error Submitting FAQ:", error);
      alert("There Was An Error Submitting Your FAQ");
    }
  };

  const handleDelete = async (faqId) => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/faq/${faqId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFaq((prevFAQs) => prevFAQs.filter(faq => faq._id !== faqId));
        alert("Faq Deleted Successfully");
      } else {
        const data = await response.json();
        alert(`Error ${data.message}`);
      };
    } catch (error) {
      console.error('Error deleting faq:', error);
      alert('Error deleting the faq');
    }
  };

  return (
    <div className="add-faq-container">
      <div className="add-faq-form">
        <h2>
          { language === "ua" ? 'ДОДАТИ FAQ' : language === "ru" ? 'ДОБАВИТЬ FAQ' : 'ADD FAQ' }
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="faq_question_ua">FAQ Question Ua</label>
            <input 
              type="text" 
              name="faq_question_ua" 
              id="faq_question_ua"
              placeholder="FAQ Question Ua" 
              value={formData.faq_question_ua} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="faq_question_ru">FAQ Question Ru</label>
            <input 
              type="text" 
              name="faq_question_ru" 
              id="faq_question_ru"
              placeholder="FAQ Question Ru" 
              value={formData.faq_question_ru} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="faq_question_en">FAQ Question En</label>
            <input 
              type="text" 
              name="faq_question_en" 
              id="faq_question_en"
              placeholder="FAQ Question En" 
              value={formData.faq_question_en} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="faq_answer_ua">FAQ Answer Ua</label>
            <textarea 
              name="faq_answer_ua" 
              id="faq_answer_ua"
              placeholder="FAQ Answer Ua" 
              value={formData.faq_answer_ua} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="faq_answer_ru">FAQ Answer Ru</label>
            <textarea 
              name="faq_answer_ru" 
              id="faq_answer_ru"
              placeholder="FAQ Answer Ru" 
              value={formData.faq_answer_ru} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="faq_answer_en">FAQ Answer En</label>
            <textarea 
              name="faq_answer_en" 
              id="faq_answer_en"
              placeholder="FAQ Answer En" 
              value={formData.faq_answer_en} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className='submit-button'>
            { language === "ua" ? 'ДОДАТИ' : language === "ru" ? 'ДОБАВИТЬ' : 'ADD' }
          </button>
        </form>
      </div>
      <table className="blogs-table">
        <thead>
          <tr>
            <th>{ language === "ua" ? 'Питання (UA)' : language === "ru" ? 'Вопрос (UA)' : 'Question (UA)' }</th>
            <th>{ language === "ua" ? 'Питання (RU)' : language === "ru" ? 'Вопрос (RU)' : 'Question (RU)' }</th>
            <th>{ language === "ua" ? 'Питання (EN)' : language === "ru" ? 'Вопрос (EN)' : 'Question (EN)' }</th>
            <th>{ language === "ua" ? 'Відповідь (UA)' : language === "ru" ? 'Ответ (RU)' : 'Answer (UA)' }</th>
            <th>{ language === "ua" ? 'Відповідь (RU)' : language === "ru" ? 'Ответ (RU)' : 'Answer (RU)' }</th>
            <th>{ language === "ua" ? 'Відповідь (EN)' : language === "ru" ? 'Ответ (EN)' : 'Answer (EN)' }</th>
            <th>{ language === "ua" ? 'Дії' : language === "ru" ? 'Действия' : 'Actions' }</th>
          </tr>
        </thead>
        <tbody>
          {faq.map((fa) => (
            <tr key={fa._id}>
              <td>{fa.faq_question_ua}</td>
              <td>{fa.faq_question_ru}</td>
              <td>{fa.faq_question_en}</td>
              <td>{fa.faq_answer_ua}</td>
              <td>{fa.faq_answer_ru}</td>
              <td>{fa.faq_answer_en}</td>
              <td>
                <button 
                  onClick={() => handleDelete(fa._id)} 
                  className="delete-blog-button"
                >
                  { language === "ua" ? 'ВИДАЛИТИ' : language === "ru" ? 'УДАЛИТЬ' : 'DELETE' }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddFAQ;
