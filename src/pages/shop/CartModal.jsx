import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import OrderSummary from './OrderSummary';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/features/cart/cartSlice';
import "./CartModal.css";

const CartModal = ({ products, isOpen, onClose }) => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user data from Redux
  const [isFormValid, setIsFormValid] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    province: '',
    phone: '',
    deliveryMethod: '',
    warehouseNumber: ''
  });

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        fullName: user.username || '',  
        email: user.email || '',
        address: user.address || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (event) => {
    const updatedFormData = { ...formData, [event.target.name] : event.target.value };
    setFormData(updatedFormData);
    const { fullName, email, address, phone, province, deliveryMethod, warehouseNumber } = updatedFormData;
    
    // Check if warehouseNumber is required based on delivery method
    const isWarehouseRequired = deliveryMethod === 'NovaPoshta';
    const isWarehouseValid = !isWarehouseRequired || (isWarehouseRequired && warehouseNumber);
    
    setIsFormValid(fullName && email && address && phone && province && deliveryMethod && isWarehouseValid);
  };

  const handleQuantity = (type, id) => {
    const payload = { type, id };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (event, id) => {
    event.preventDefault();
    dispatch(removeFromCart({ id }));
  };

  const provincesUA = [
    "Вінницька область", "Волинська область", "Дніпропетровська область", 
    "Донецька область", "Житомирська область", "Закарпатська область", 
    "Запорізька область", "Івано-Франківська область", "Київська область", 
    "Кіровоградська область", "Львівська область", "Миколаївська область", 
    "Одеська область", "Полтавська область", "Рівненська область", 
    "Сумська область", "Тернопільська область", "Харківська область", 
    "Херсонська область", "Хмельницька область", "Черкаська область", 
    "Чернівецька область", "Чернігівська область", "м. Київ"
  ];

  const provincesRU = [
    "Винницкая область", "Волынская область", "Днепропетровская область", 
    "Донецкая область", "Житомирская область", "Закарпатская область", 
    "Запорожская область", "Ивано-Франковская область", "Киевская область", 
    "Кировоградская область", "Львовская область", "Николаевская область", 
    "Одесская область", "Полтавская область", "Ровенская область", 
    "Сумская область", "Тернопольская область", "Харьковская область", 
    "Херсонская область", "Хмельницкая область", "Черкасская область", 
    "Черновицкая область", "Черниговская область", "г. Киев"
  ]; 

  return (
    <div
      className={`cart-modal-css ${isOpen ? 'open' : ''}`}
      style={{ transition: 'opacity 300ms' }}
      onClick={onClose}
    >
      <div
        className={`cart-modal-content-more ${isOpen ? 'open' : ''}`}
        style={{
          transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onClick={(e) => e.stopPropagation()} 
      >
        <div className='cart-modal-wow'>
          <div className='cart-modal-wow-nice'>
            <h4 className='cart-modal-wow-h4'>
              {language === "ua" ? 'ВАШ КОШИК' : language === "ru" ? 'ВАША КОРЗИНА' : 'YOUR CART'}
            </h4>
            <button 
              className='cart-modal-the-icon'
              onClick={onClose}
            >
              <i className="ri-close-large-line"></i>
            </button>
          </div>
          <div>
            {
              products.map((item, index) => (
                <div key={index} className='cart-item-added-product'>
                  <div className='cart-item-added-product-more'>
                    <span className='cart-total-items-number'>0{index + 1}</span>
                    <img src={item.image} alt="" className='cart-total-items-image' />
                    <div>
                      <h5 className='cart-item-added-product-h5'>{item.name}</h5>
                      <p className='cart-item-size'>
                        {language === "ua" ? "РОЗМІР" : language === "ru" ? "РАЗМЕР" : "SIZE"}: {item.size}
                      </p>
                      <div className='cart-item-minus-plus'>
                        <button
                          className='shop-product-btn-second'
                          onClick={() => handleQuantity('decrement', item.id)}
                        >
                          -
                        </button>
                        <span className='shop-product-btn-quantity'>{item.quantity}</span>
                        <button
                          className='shop-product-btn-second'
                          onClick={() => handleQuantity('increment', item.id)}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-price">
                        {language === "ua" ? 'Ціна:' : language === "ru" ? 'Цена:' : 'Price:'} ₴
                        {Number(item.price).toFixed(2)}
                      </div>
                    </div>
                    <div className='cart-item-remove'>
                      <button onClick={(event) => handleRemove(event, item.id)} className='cart-item-remove-btn'>
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }          
          </div>
          {
            products.length > 0 && (
              <form className='cart-modal-form'>
                <input type='text' name='fullName' placeholder={language === "ua" ? 'ПІБ' : language === "ru" ? 'ФИО' : 'FULL NAME'} value={formData.fullName} onChange={handleChange} required />
                <br />
                <input type='email' name='email' placeholder={language === "ua" ? 'ЕЛЕКТРОННА ПОШТА' : language === "ru" ? 'ЭЛЕКТРОННАЯ ПОЧТА' : 'EMAIL'} value={formData.email} onChange={handleChange} required />
                <br />
                <input 
                  type='tel' 
                  name='phone' 
                  placeholder={language === "ua" ? 'ТЕЛЕФОН' : language === "ru" ? 'ТЕЛЕФОН' : 'PHONE'} 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  pattern="^\+?[0-9\s\-\(\)]{7,15}$" 
                  title={language === "ua" ? "Введіть правильний номер телефону" : language === "ru" ? "Введите корректный номер телефона" : "Enter a valid phone number"} 
                />
                <br />
                <input type='text' name='address' placeholder={language === "ua" ? 'АДРЕСА' : language === "ru" ? 'АДРЕС' : 'ADDRESS'} value={formData.address} onChange={handleChange} required />
                <br />
                <select name='province' value={formData.province} onChange={handleChange} required>
                  <option value=''>{language === "ua" ? 'ОБЕРІТЬ ОБЛАСТЬ' : language === "ru" ? 'ВЫБЕРИТЕ ОБЛАСТЬ' : 'SELECT REGION'}</option>
                  {(language === "ua" ? provincesUA : language === "ru" ? provincesRU : provincesUA).map((province, index) => (
                    <option key={index} value={province}>{province}</option>
                  ))}
                </select>
                <br />
                <select name='deliveryMethod' value={formData.deliveryMethod} onChange={handleChange} required>
                  <option value=''>{language === "ua" ? 'СПОСІБ ДОСТАВКИ' : language === "ru" ? 'СПОСОБ ДОСТАВКИ' : 'DELIVERY METHOD'}</option>
                  <option value='NovaPoshta'>{language === "ua" ? 'Нова Пошта' : language === "ru" ? 'Новая Почта' : 'Nova Poshta'}</option>
                  <option value='UkrPoshta'>{language === "ua" ? 'Укрпошта' : language === "ru" ? 'Укрпочта' : 'Ukrposhta'}</option>
                </select>
                {formData.deliveryMethod && (
                  <>
                    <br />
                    <input
                      type="text"
                      name="warehouseNumber"
                      placeholder={language === "ua" ? 'НОМЕР ВІДДІЛЕННЯ' : language === "ru" ? 'НОМЕР ОТДЕЛЕНИЯ' : 'WAREHOUSE NUMBER'}
                      value={formData.warehouseNumber}
                      onChange={handleChange}
                      required
                    />
                  </>
                )}                
                {!isFormValid && <p className="error">{language === "ua" ? 'Будь ласка, заповніть всі поля.' : language === "ru" ? 'Пожалуйста, заполните все поля.' : 'Please fill in all fields.'}</p>}
              </form>
            )
          }
          <OrderSummary isFormValid={isFormValid} formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
