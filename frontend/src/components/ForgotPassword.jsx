import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import "./Login.css";

const ForgotPassword = () => {
  const { language } = useLanguage(); 
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      navigate(language == "ua" ? '/ua/login' : '/iv/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className='login'>
      <div className='login-more'>
        <h2>
          {language === "ua" ? 'ЗАБУЛИ ПАРОЛЬ?' : 'ЗАБЫЛИ ПАРОЛЬ?'}
        </h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <input 
            type='email' 
            name='email' 
            id='email' 
            placeholder={ language === "ua" ? 'АДРЕСА ЕЛЕКТРОННОЇ ПОШТИ' : 'ЭЛЕКТРОННАЯ ПОЧТА' } 
            className='login-input'
            onChange={(event) => setEmail(event.target.value)}
            required 
          />
          {message && <p className='text-red-500'>{message}</p>}
          <button type='submit' className='login-button'>
            {language === "ua" ? 'УВІЙТИ' : 'ВОЙТИ'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
