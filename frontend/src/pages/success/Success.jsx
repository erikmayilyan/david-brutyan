import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import "./Success.css";
import TimelineSteps from './TimelineSteps';

const Success = () => {
  const [order, setOrder] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      console.log("Session ID:", sessionId);
      fetch(`http://localhost:4000/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((res) => {
          console.log("Response status:", res.status); 
          return res.json();
        })
        .then((data) => {
          console.log("Order data:", data);
          if (data && data.order) {
            setOrder(data.order);
            console.log("Order Data:", data.order); 
          } else {
            console.error("No order data in response", data);
          }
        })
        .catch((err) => {
          console.error("Error confirming payment:", err);
        });
    }
  }, [sessionId]);  

  if (!order) {
    return (
      <div className="flex justify-center items-center mt-40">
        <h1 className="loading-text">ЗАВАНТАЖЕННЯ ...</h1> 
      </div>
    );
  }

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
    <div className="success-page">
      <h1>
        ОПЛАТА : {order?.status_ua}
      </h1>
      <h3>
        СТАТУС : {order?.status_ua}
      </h3>
      <p>
        ІДЕНТИФІКАТОР ЗАМОВЛЕННЯ : {order?._id}
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
  );
};

export default Success;
