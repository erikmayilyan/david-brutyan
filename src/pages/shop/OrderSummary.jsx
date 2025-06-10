import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../LanguageContext';
import { clearCart } from '../../redux/features/cart/cartSlice';
import './CartModal.css';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ isFormValid, formData }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { products, selectedItems, totalPrice } = useSelector((store) => store.cart);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const makePayment = async () => {
    try {
      const body = {
        products: products.map(product => ({
          productId: product._id,
          quantity: product.quantity,
          size: product.size,
          price: product.price
        })),
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        phone: formData.phone,
        province: formData.province,
        deliveryMethod: formData.deliveryMethod,
        warehouseNumber: formData.warehouseNumber,
        totalPrice: totalPrice,
        language: language
      };

      // Only add userId if user is logged in
      if (user?._id) {
        body.userId = user._id;
      }

      console.log("Sending payment request with data:", body);

      const response = await fetch('http://localhost:4000/api/orders/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to create payment session');
      }
      
      if (data.url && data.session_id) {
        // Store session_id in localStorage for later use
        localStorage.setItem('currentSessionId', data.session_id);
        // Redirect to Fondy payment page
        window.location.href = data.url;
      } else {
        throw new Error('No payment URL or session ID received');
      }
    } catch (error) {
      console.error("Payment error details:", {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      alert(language === "ua" ? "Помилка оплати. Спробуйте пізніше." : language === "ru" ? "Ошибка оплаты. Попробуйте позже." : "Ошибка оплаты. Попробуйте позже.");
    }
  };

  return (
    <div className='order-summary'>
      <div className='order-info'>
        <h2 className='order-summary-h2'>
          {language === "ua" ? 'Підсумок замовлення' : language === "ru" ? 'Сводка заказа' : 'Order Summary'}
        </h2>
        <p>{language === "ua" ? 'Вибрані товари:' : language === "ru" ? 'Выбранные товары:' : 'Selected items:'} {selectedItems}</p>
        <p>{language === "ua" ? 'ЗАГАЛЬНА ЦІНА:' : language === "ru" ? 'ОБЩАЯ ЦЕНА:' : 'TOTAL PRICE:'} ₴{totalPrice.toFixed(2)}</p>

        <div className='order-btn-section'>
          <button 
            onClick={(event) => { 
              event.stopPropagation(); 
              handleClearCart(); 
            }} 
            className='order-btn-remove-btn'
          >
            {language === "ua" ? 'ОЧИСТИТИ КОШИК' : language === "ru" ? 'ОЧИСТИТЬ КОРЗИНУ' : 'CLEAR CART'}
          </button>
          <button 
            onClick={(event) => {
              event.stopPropagation();
              if (isFormValid && formData.fullName && formData.email && formData.address && formData.phone && formData.province && formData.deliveryMethod) {
                makePayment();
              } else {
                alert(language === "ua" ? "Будь ласка, заповніть усі обов'язкові поля!" : language === "ru" ? "Пожалуйста, заполните все обязательные поля!" : "Please fill in all required fields!");
              }
            }}
            className='order-btn-checkout-btn'
            disabled={!isFormValid} 
          >
            {language === "ua" ? 'ПЕРЕЙТИ ДО ОПЛАТИ' : language === "ru" ? 'ПЕРЕЙТИ К ОПЛАТЕ' : 'PROCEED TO PAYMENT'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
