import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import { useLanguage } from '../../../../LanguageContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserStats from './UserStats';
import "./UserDMain.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useLanguage();
  
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  console.log("Stats data:", stats);

  if (isLoading) {
    return <div className='loading-user-d-main'>Loading...</div>;
  };

  if (!stats) {
    return <div className='loading-user-d-main'>{ language === "ua" ? 'Дані недоступні' : language === "en" ? 'Data unavailable' : 'Данные недоступны' }</div>;
  };

  const chartData = {
    labels: [
      language === "ua" ? "Загальні платежі" : language === "en" ? "Total Payments" : "Total Payments",
      language === "ua" ? "Загальні відгуки" : language === "en" ? "Total Reviews" : "Total Reviews",
      language === "ua" ? "Загальні покупки" : language === "en" ? "Total Purchased Products" : "Total Purchased Products"
    ],
    datasets: [
      {
        label: language === "ua" ? "Статистика користувача" : language === "en" ? "User Stats" : "User Stats",
        data: [
          stats?.totalPayments || 0, 
          stats?.totalReviews * 100 || 0, 
          stats?.totalPurchasedProducts * 100 || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };  

  console.log('Total Payments:', stats?.totalPayments);
  console.log('Total Reviews:', stats?.totalReviews);
  console.log('Total Purchased Products:', stats?.totalPurchasedProducts);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip : {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.label === 'Total Payments') {
              return `Total Payments: $${tooltipItem.raw.toFixed(2)}`
            };
            return `${tooltipItem.label} ${tooltipItem.raw}`;
          }
        }
      }
    }
  };

  return (
    <div className='user-d-main'>
      <div>
        <h1 className='user-d-main-h1'>
          { language === "ua" ? 'ПАНЕЛЬ КОРИСТУВАЧА' : language === "en" ? 'USER PANEL' : 'ПАНЕЛЬ ПОЛЬЗОВАТЕЛЯ' }
        </h1>
        <p className='user-d-main-p'>
          { language === "ua" ? `Привіт, ${user?.username}! Ласкаво просимо до вашої панелі користувача` : language === "en" ? `Hello, ${user?.username}! Welcome to your user panel` : `Привет, ${user?.username}! Добро пожаловать в вашу панель пользователя!` }
        </p>
        <UserStats stats={stats} />
        <div>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserDMain;
