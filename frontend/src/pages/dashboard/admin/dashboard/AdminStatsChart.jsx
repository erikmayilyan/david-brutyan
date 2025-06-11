import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { useLanguage } from '../../../../LanguageContext';
import "chart.js/auto";
import "./AdminDMain.css";

const AdminStatsChart = ({ stats }) => {
  const { language } = useLanguage();
  console.log(stats);

  const pieData = {
    labels: [
      language === "ua" ? 'Загальні Замовлення' : language === "ru" ? 'Общие Заказы' : 'Total Orders', 
      language === "ua" ? 'Загальні Продукти' : language === "ru" ? 'Общие Продукты' : 'Total Products', 
      language === "ua" ? 'Загальні Відгуки' : language === "ru" ? 'Общие Отзывы' : 'Total Reviews', 
      language === "ua" ? 'Загальні Користувачі' : language === "ru" ? 'Общие Пользователи' : 'Total Users'
    ],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          stats?.totalOrders,
          stats?.totalProducts,
          stats?.totalReviews,
          stats?.totalUsers
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9966FF'
        ]
      }
    ]
  };

  const data = new Array(12).fill(0);

  stats?.monthlyEarnings.forEach((entry) => {
    data[entry.month - 1] = entry.earnings;
  });

  const lineData = {
    labels: language === "ua" ? [
      "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", 
      "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
    ] : language === "ru" ? [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ] : [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: language === "ua" ? 'Місячні Заробітки' : language === "ru" ? 'Месячные Заработки' : 'Monthly Earnings',
        data,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className='admin-stats-chart'>
      <h2>
        {language === "ua" ? 'Огляд Статистики Адміністратора' : language === "ru" ? 'Обзор Статистики Администратора' : 'Admin Statistics Overview'}
      </h2>
      <div className='admin-stats-chart-more'>
        <div className='admin-stats-chart-more-more'>
          <Pie data={pieData} options={options} />
        </div>
        <div className='admin-stats-chart-more-more'>
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default AdminStatsChart
