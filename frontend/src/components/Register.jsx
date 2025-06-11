import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLanguage } from '../LanguageContext';
import './Login.css';

const Register = () => {
  const { language } = useLanguage();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
      address,
      username,
      phone
    };
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration Failed');
      };
      setMessage('');
      const responseData = await response.json();
      console.log('Registration Successful:', responseData);
      navigate(`${getLanguagePrefix()}/login`);
    } catch (error) {
      console.error('Error During Login: ', error);
      if (language === 'ua') {
        setMessage('ЩОСЬ ПІШЛО НЕ ТАК. Спробуйте ще раз!');
      } else if (language === 'ru') {
        setMessage('ЧТО-ТО ПОШЛО НЕ ТАК. Попробуйте еще раз!');
      } else {
        setMessage('Something went wrong. Please try again later.');
      };
    };
  };

  return (
    <section className='login'>
      <div className='login-more'>
        <h2>
          { language === "ua" ? 'БУДЬ ЛАСКА, ЗАРЕЄСТРУЙТЕСЬ' : language === "ru" ? 'ПОЖАЛУЙСТА, ЗАРЕГИСТРИРУЙТЕСЬ' : 'PLEASE, REGISTER' }
        </h2>
        <form className='login-form' onSubmit={handleRegister}>
          <input 
            type='username' 
            name='username' 
            id='username' 
            placeholder={ language === "ua" ? 'ІМ\'Я КОРИСТУВАЧА' : language === "ru" ? 'ИМЯ ПОЛЬЗОВАТЕЛЯ' : 'USERNAME' } 
            className='login-input'
            onChange={(event) => setUsername(event.target.value)}
            required 
          />
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
            type='address' 
            name='address' 
            id='address' 
            placeholder={ language === "ua" ? 'АДРЕСА (ВКЛЮЧАЮЧИ МІСТО)' : language === "ru" ? 'АДРЕС (ВКЛЮЧАЯ ГОРОД)' : 'ADDRESS (INCLUDING CITY)' } 
            className='login-input'
            onChange={(event) => setAddress(event.target.value)}
            required 
          />
          <input 
            type='phone'
            name='phone'
            id='phone'
            placeholder={ language === "ua" ? 'ТЕЛЕФОН' : language === "ru" ? 'ТЕЛЕФОН' : 'PHONE' }
            className='login-input'
            onChange={(event) => setPhone(event.target.value)}
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
          <input 
            type='password' 
            name='confirmPassword' 
            id='confirmPassword' 
            placeholder={ language === "ua" ? 'ПІДТВЕРДІТЬ ПАРОЛЬ' : language === "ru" ? 'ПОДТВЕРДИТЕ ПАРОЛЬ' : 'CONFIRM PASSWORD' } 
            className='login-input'
            onChange={(event) => setConfirmPassword(event.target.value)}
            required 
          />
          {
            message && <p className='text-red-500'>{message}</p>
          }
          <button type='submit' className='login-button'>
            { language === "ua" ? 'ЗАРЕЄСТРУВАТИСЯ' : language === "ru" ? 'ЗАРЕГИСТРИРОВАТЬСЯ' : 'REGISTER' }
          </button>
        </form>
        <p>
          { language === "ua" ? 'Вже маєте обліковий запис?' : language === "ru" ? 'Уже есть учетная запись?' : 'Already have an account?' }
          <Link to={`${getLanguagePrefix()}/login`}>
            { language === "ua" ? ' Увійти' : language === "ru" ? ' Войти' : ' Log in' }
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
  )
}

export default Register
