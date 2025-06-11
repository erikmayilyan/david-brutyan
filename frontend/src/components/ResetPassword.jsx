import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../LanguageContext';
import { useParams } from 'react-router-dom';
import "./Login.css";

const ResetPassword = () => {
  const { language } = useLanguage(); 
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); // State for retype password
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      navigate(language == "ua" ? '/ua/login' : '/iv/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className='login'>
      <div className='login-more'>
        <h2>
          {language === "ua" ? 'СКИДАННЯ ПАРОЛЯ' : 'СБРОС ПАРОЛЯ'}
        </h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <input 
            type='password' 
            name='password' 
            id='password' 
            placeholder={ language === "ua" ? 'ВВЕДІТЬ ПАРОЛЬ' : 'ВВЕДИТЕ ПАРОЛЬ' } 
            className='login-input'
            onChange={(event) => setPassword(event.target.value)}
            required 
          />
          <input 
            type='password' 
            name='retypePassword' 
            id='retypePassword' 
            placeholder={ language === "ua" ? 'ПІДТВЕРДІТЬ ПАРОЛЬ' : 'ПОДТВЕРДИТЕ ПАРОЛЬ' } 
            className='login-input'
            onChange={(event) => setRetypePassword(event.target.value)}
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

export default ResetPassword;
