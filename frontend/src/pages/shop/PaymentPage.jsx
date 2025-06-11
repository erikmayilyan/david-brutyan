import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { getBaseUrl } from '../../utils/baseURL';
import './PaymentPage.css';

const PaymentPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const orderId = localStorage.getItem('currentOrderId');
        if (!orderId) {
          throw new Error('No order ID found');
        }

        const response = await fetch(`${getBaseUrl()}/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }

        const data = await response.json();
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const handlePayment = () => {
    if (orderData?.url) {
      window.location.href = orderData.url;
    }
  };

  if (loading) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <h2>{language === "ua" ? 'Завантаження...' : 'Загрузка...'}</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <h2>{language === "ua" ? 'Помилка' : 'Ошибка'}</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>
            {language === "ua" ? 'Повернутися на головну' : 'Вернуться на главную'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>{language === "ua" ? 'Оплата замовлення' : 'Оплата заказа'}</h2>
        <div className="payment-details">
          <div className="payment-amount">
            {language === "ua" ? 'Сума до оплати:' : 'Сумма к оплате:'} ₴{orderData?.amount}
          </div>
          <button 
            onClick={handlePayment}
            disabled={!orderData?.url}
            className="payment-button"
          >
            {language === "ua" ? 'Оплатити через Fondy' : 'Оплатить через Fondy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 