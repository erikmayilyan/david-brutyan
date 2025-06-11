import React from 'react';
import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../LanguageContext';
import TimelineSteps from '../../success/TimelineSteps';
import "./UserOrders.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);
  const { language } = useLanguage();
  console.log(order);

  if (isLoading) {
    return <div>Loading...</div>
  };

  if (error) {
    return <div>{language === "ua" ? "Немає замовлень" : "Нет заказов"}</div>
  }; 
  
  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: 'pending',
      status_ua: 'ОЧІКУВАННЯ',
      description: 'Ваше замовлення створено і очікує на обробку.',
      icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
    },
    {
      status: 'processing',
      status_ua: 'ОБРОБКА',
      description: 'Ваше замовлення наразі обробляється.',
      icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
    },
    {
      status: 'shipped',
      status_ua: 'ВІДПРАВЛЕНО',
      description: 'Ваше замовлення відправлено.',
      icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
    },
    {
      status: 'completed',
      status_ua: 'ЗАВЕРШЕНО',
      description: 'Ваше замовлення було успішно завершено.',
      icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
    }
  ];

  return (
    <div className="success-page second-success-page">
      <h1>
        ОПЛАТА : {order?.status_ua}
      </h1>
      <h3>
        СТАТУС : {order?.status_ua}
      </h3>
      <p>
        ІДЕНТИФІКАТОР ЗАМОВЛЕННЯ : {order?.orderId}
      </p>
      <ol className='success-instructions'>
        {
          steps.map((step, index) => (
            <TimelineSteps 
              key={index}
              step={step}
              isCompleted={isCompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isUkrainian={step.status_ua}
              isLastStep={index === steps.length - 1}
              icon={step.icon}
              order={order}
              description={step.description}
            />
          ))
        }
      </ol>
    </div>
  )
}

export default OrderDetails
