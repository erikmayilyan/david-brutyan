import React from 'react';
import { useSelector } from 'react-redux';
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import { useLanguage } from '../../../LanguageContext';
import "./UserPayments.css";

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: ordersData, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
  const { language } = useLanguage();

  if (isLoading) {
    return <div>Loading...</div>
  };

  if (error) {
    return <div>{ language === "ua" ? 'Замовлення не знайдено' : language === "en" ? 'No Orders Found' : 'Заказ не найден' }</div>
  };

  const orders = ordersData.orders || {};
  const totalPayment = orders?.reduce((acc, order) => acc + order.amount, 0).toFixed(2);

  return (
    <div className='user-payments'>
      <h3 className='user-payments-h3'>
        { language === "ua" ? 'Загальні платежі' : language === "en" ? 'Total Payments' : 'Общие платежи' }
      </h3>
      <div>
        <p>{ language === "ua" ? 'Загальна витрата:' : language === "en" ? 'Total Expenditure:' : 'Общие расходы:' } {totalPayment ? totalPayment : 0} UAH</p>
        <ul>
          {
            orders && orders.map((item, index) => (
              <li key={index} className='user-order-info'>
                <h5 className='user-order-num'>
                  { language === "ua" ? 'Замовлення' : language === "en" ? 'Order' : 'Заказ' } #{index + 1}
                </h5>
                <div>
                  <span>
                    { language === "ua" ? 'Замовлення' : language === "en" ? 'Order' : 'Заказ' } {item?.amount.toFixed(2)} UAH
                  </span>
                </div>
                <div className='user-order-data'>
                  <span>
                    { language === "ua" ? 'ДАТА:' : language === "en" ? 'DATE:' : 'ДАТА:' } {new Date(item?.createdAt).toLocaleString()}
                  </span>
                  <p>
                    { language === "ua" ? 'СТАТУС:' : language === "en" ? 'STATUS:' : 'СТАТУС:' } <span>{item?.status_ua}</span>
                  </p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default UserPayments;
