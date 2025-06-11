import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import Opinions from './Opinions';
import "./Reviews.css";
import { getBaseUrl } from '../../utils/baseURL';

const MAX_CHARACTERS = 500;

const Reviews = () => {
  const { language } = useLanguage('');
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);

    try {
      const response = await fetch(`${getBaseUrl()}/api/opinion/post-opinion`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ name, comment: review })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed To Submit Review");
      };

      alert(language === "ua" 
        ? "Ваш відгук надіслано!" 
        : (language === "en" ? "Your review has been submitted!" : "Ваш отзыв отправлен!")
      );
      setName('');
      setReview('');
    } catch (error) {
      setError(error.message);
    };
  };

  return (
    <div className='reviews'>
      <div className='reviews-image'>
        <div className='reviews-text-overlay'>
          <h2>
            {language === "ua" ? 'ВІДГУКИ' : (language === "en" ? 'REVIEWS' : 'ОТЗЫВЫ')}
          </h2>
        </div>
      </div>
      <div className='review-form-container'>
        <div className='review-information'>
          <h2>
            {language === "ua" 
              ? 'ПОЛІТИКА ПОДАННЯ ВІДГУКІВ' 
              : (language === "en" ? 'REVIEW SUBMISSION POLICY' : 'ПОЛИТИКА ПОДАЧИ ОТЗЫВОВ')}
          </h2>
          <p>
            {language === "ua"
              ? 'Користувач має право вільно висловлювати свою думку, проте відгуки, що містять мову ворожнечі або ненормативну лексику, будуть негайно видалені, оскільки це суперечить нашим умовам та положенням. Тому просимо вас залишати відгуки без мови ворожнечі.' 
              : (language === "en" 
                  ? 'Users are free to express their opinions, but reviews containing hate speech or offensive language will be immediately removed as they violate our terms and conditions. We ask you to leave reviews without hate speech.' 
                  : 'Пользователь имеет право свободно выражать своё мнение, однако отзывы, содержащие язык вражды или ненормативную лексику, будут немедленно удалены, так как это противоречит нашим условиям и положениям. Поэтому просим вас оставлять отзывы без языка вражды.')
            }
          </p>
        </div>
        <form onSubmit={handleSubmit} className='review-form'>
          <label>
            {language === "ua" ? 'Ім\'я:' : (language === "en" ? 'Name:' : 'Имя:')}
          </label>
          <input 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />

          <label>
            {language === "ua" ? 'Ваш відгук:' : (language === "en" ? 'Your review:' : 'Ваш отзыв:')}
          </label>
          <textarea 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
            maxLength={MAX_CHARACTERS}
            required
          ></textarea>
          <p className="char-counter">
            {language === "ua" 
              ? `Залишилося символів: ${MAX_CHARACTERS - review.length}` 
              : (language === "en" 
                  ? `Characters remaining: ${MAX_CHARACTERS - review.length}` 
                  : `Осталось символов: ${MAX_CHARACTERS - review.length}`)
            }
          </p>

          <button type='submit'>
            {language === "ua" ? 'Надіслати' : (language === "en" ? 'Submit' : 'Отправить')}
          </button>

          {successMessage && <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>}
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
      </div>
      <div className='reviews-opinion'>
        <h1>
          {language === "ua" ? 'ВІДГУКИ' : (language === "en" ? 'REVIEWS' : 'ОТЗЫВЫ')}
        </h1>
        <Opinions />
      </div>
    </div>
  )
}

export default Reviews;
