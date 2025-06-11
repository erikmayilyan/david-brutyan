import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import './FAQ.css';
import { getBaseUrl } from '../utils/baseURL';

const FAQ = () => {
  const { language } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch(`${getBaseUrl()}/api/faq/`)
      .then(response => response.json())
      .then(data => setFaqs(data))
      .catch(error => console.error('Error fetching FAQ data:', error));
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='faq'>
      <div className="faq-image">
        <div className="faq-text-overlay">
          <h2>FAQ</h2>
        </div>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {language === "ua" ? faq.faq_question_ua 
                : language === "ru" ? faq.faq_question_ru 
                : language === "en" ? faq.faq_question_en
                : faq.faq_question}
              <span className="faq-icon">{openIndex === index ? '-' : '+'}</span>
            </button>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              {language === "ua" ? faq.faq_answer_ua 
                : language === "ru" ? faq.faq_answer_ru 
                : language === "en" ? faq.faq_answer_en
                : faq.faq_answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
