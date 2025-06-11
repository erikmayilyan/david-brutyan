import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/auth/authSlice';
import "./Login.css";

const Login = () => {
  const { language } = useLanguage(); 
  const dispatch = useDispatch(); 
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = { email, password }; 
  
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login Failed');
      }
  
      setMessage('');
      const responseData = await response.json();
      console.log('Login Successful:', responseData);
      const { token, user } = responseData;
      dispatch(setUser(user));
      localStorage.setItem('token', token);
      
      // Redirecting to the language-specific home page
      navigate(getLanguagePrefix()); // This ensures redirection to /ua, /ru, or /en
    } catch (error) {
      if (language === 'ua') {
        setMessage('НЕВІРНА ЕЛЕКТРОННА ПОШТА АБО ПАРОЛЬ');
      } else {
        setMessage('НЕВЕРНЫЙ EMAIL ИЛИ ПАРОЛЬ');
      }
    }
  };
  

  return (
    <section className='login'>
      <div className='login-more'>
        <h2>
          { language === "ua" ? 'БУДЬ ЛАСКА, УВІЙДІТЬ' : language === "ru" ? 'ПОЖАЛУЙСТА, ВОЙДИТЕ' : 'PLEASE, LOG IN' }
        </h2>
        <form className='login-form' onSubmit={handleLogin}>
          <input 
            type='email' 
            name='email' 
            id='email' 
            placeholder={ language === "ua" ? 'АДРЕСА ЕЛЕКТРОННОЇ ПОШТИ' : language === "ru" ? 'ЭЛЕКТРОННАЯ ПОЧТА' : 'EMAIL ADDRESS' } 
            className='login-input'
            onChange={(event) => setEmail(event.target.value)}
            required 
          />
          <input 
            type='password' 
            name='password' 
            id='password' 
            placeholder={ language === "ua" ? 'ПАРОЛЬ' : language === "ru" ? 'ПАРОЛЬ' : 'PASSWORD' } 
            className='login-input'
            onChange={(event) => setPassword(event.target.value)}
            required 
          />
          {message && <p className='text-red-500'>{message}</p>}
          <button type='submit' className='login-button'>
            { language === "ua" ? 'УВІЙТИ' : language === "ru" ? 'ВОЙТИ' : 'LOG IN' }
          </button>
        </form>
        <p>
          { language === "ua" ? 'Забули пароль?' : language === "ru" ? 'Забыли пароль?' : 'Forgot password?' }
          <Link to={`${getLanguagePrefix()}/forgot-password`}>
            { language === "ua" ? ' Скинути пароль' : language === "ru" ? ' Сбросить пароль' : ' Reset password' }
          </Link>
        </p>
        <p>
          { language === "ua" ? 'Немає облікового запису?' : language === "ru" ? 'Нет учетной записи?' : 'Don\'t have an account?' }
          <Link to={`${getLanguagePrefix()}/register`}>
            { language === "ua" ? ' Зареєструватися' : language === "ru" ? ' Зарегистрироваться' : ' Register' }
          </Link>
        </p>
        <p>
          {
            language === "ua" ? (
              <p><Link to="/ua" className=''>ПОВЕРНУТИСЯ НА ГОЛОВНУ СТОРІНКУ</Link></p>
            ) : language === "ru" ? (
              <p><Link to="/iv" className=''>ВЕРНУТЬСЯ НА ГЛАВНУЮ СТРАНИЦУ</Link></p>
            ) : (
              <p><Link to="/en" className=''>RETURN TO HOME PAGE</Link></p>
            )
          }
        </p>
      </div>
    </section>
  );
};

export default Login;
