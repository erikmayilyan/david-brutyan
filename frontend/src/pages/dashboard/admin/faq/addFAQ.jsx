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
    <div className="add-blogs">
      <h1>
        { language === "ua" ? 'ДОДАТИ FAQ' : language === "ru" ? 'ДОБАВИТЬ FAQ' : 'ADD FAQ' }
      </h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="faq_question_ua" 
          className="add-blog-input"
          placeholder={ language === "ua" ? "FAQ Question Ua" : language === "ru" ? "FAQ Question Ru" : "FAQ Question En" }
          value={formData.faq_question_ua} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="faq_question_ru" 
          className="add-blog-input"
          placeholder="FAQ Question Ru" 
          value={formData.faq_question_ru} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="faq_question_en" 
          className="add-blog-input"
          placeholder="FAQ Question En" 
          value={formData.faq_question_en} 
          onChange={handleChange} 
          required 
        />
        <br />
        <textarea 
          name="faq_answer_ua" 
          className="add-blog-input"
          placeholder="FAQ Answer Ua" 
          value={formData.faq_answer_ua} 
          onChange={handleChange} 
          required 
        />
        <br />
        <textarea 
          name="faq_answer_ru" 
          className="add-blog-input"
          placeholder="FAQ Answer Ru" 
          value={formData.faq_answer_ru} 
          onChange={handleChange} 
          required 
        />
        <br />
        <textarea 
          name="faq_answer_en" 
          className="add-blog-input"
          placeholder="FAQ Answer En" 
          value={formData.faq_answer_en} 
          onChange={handleChange} 
          required 
        />
        <br />
        <button type="submit" className='add-blog-button'>
          { language === "ua" ? 'ДОДАТИ' : language === "ru" ? 'ДОБАВИТЬ' : 'ADD' }
        </button>

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
      </form>
    </div>
  );
};

export default AddFAQ;
