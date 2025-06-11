import React from 'react';
import "./Success.css";

const TimelineSteps = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
  let iconBgColor = 'bg-gray-100'; 
  let iconTextColor = 'text-gray-500';

  if (step.status_ua === 'ЗАВЕРШЕНО' && order.status_ua === 'ЗАВЕРШЕНО') {
    iconBgColor = 'bg-green-100';
    iconTextColor = 'text-green-700';
  } else if (step.status_ua === 'ОЧІКУВАННЯ' && order.status_ua === 'ОЧІКУВАННЯ') {
    iconBgColor = 'bg-red-100';
    iconTextColor = 'text-red-700';
  } else if (step.status_ua === 'ОБРОБКА' && order.status_ua === 'ОБРОБКА') {
    iconBgColor = 'bg-blue-100'; 
    iconTextColor = 'text-blue-600';
  } else if (step.status_ua === 'ВІДПРАВЛЕНО' && order.status_ua === 'ВІДПРАВЛЕНО') {
    iconBgColor = 'bg-yellow-100'; 
    iconTextColor = 'text-yellow-500';
  }

  const connectorColor = order.status_ua === 'ЗАВЕРШЕНО' || order.status_ua === 'ОЧІКУВАННЯ' || order.status_ua === 'ОБРОБКА' || order.status_ua === 'ВІДПРАВЛЕНО' ? 'bg-blue-500' : 'bg-gray-200';

  const labelTextColor = order.status_ua === step.status_ua ? 'text-gray-900' : 'text-gray-500';
  const descriptionTextColor = order.status_ua === step.status_ua ? 'text-gray-900' : 'text-gray-500';

  return (
    <li className='time-line-steps'>
      <div className='time-line-steps-more'>
        <div className={`time-line-step-even-more ${iconTextColor}`}>
          <i className={`ri-${icon.iconName} ${iconBgColor} ${iconTextColor}`}></i>
        </div>
        {!isLastStep && (
          <div className={`time-is-last-step ${connectorColor}`}></div>
        )}
      </div>
      <div className='time-line-steps-details'>
        <h3 className={labelTextColor}>
          {step.status_ua}
        </h3>
        <time>
          {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
        </time>
        <p className={`the-best-desc-color ${descriptionTextColor}`}>{description}</p>
      </div>
    </li>
  );
}

export default TimelineSteps;
