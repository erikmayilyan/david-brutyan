import React from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./AdminDMain.css";

const AdminStats = ({ stats }) => {
  const { language } = useLanguage();

  return (
    <div className='admin-stats'>
      <div className='admin-stats-grid'>
        <div className='admin-stats-more'>
          <h2 className='admin-stats-h2'>
            {language === "ua" ? 'Загальний Доход' : language === "ru" ? 'Общий Доход' : 'Total Earnings'}
          </h2>
          <p className='admin-stats-p'>{stats?.totalEarnings.toFixed(2)} UAH</p>
        </div>
        <div className='admin-stats-more'>
          <h2 className='admin-stats-h2'>
            {language === "ua" ? 'Всі Замовлення' : language === "ru" ? 'Все Заказы' : 'Total Orders'}
          </h2>
          <p className='admin-stats-p'>{stats?.totalOrders}</p>
        </div>
        <div className='admin-stats-more'>
          <h2 className='admin-stats-h2'>
            {language === "ua" ? 'Всі Користувачі' : language === "ru" ? 'Все Пользователи' : 'Total Users'}
          </h2>
          <p className='admin-stats-p'>{stats?.totalUsers}</p>
        </div>
        <div className='admin-stats-more'>
          <h2 className='admin-stats-h2'>
            {language === "ua" ? 'Загальні Продукти' : language === "ru" ? 'Общие Продукты' : 'Total Products'}
          </h2>
          <p className='admin-stats-p'>{stats?.totalProducts}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminStats
