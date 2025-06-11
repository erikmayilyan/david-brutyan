import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../redux/features/stats/statsApi';
import { useLanguage } from '../../../../LanguageContext';
import AdminStats from './AdminStats';
import AdminStatsChart from './AdminStatsChart';
import "./AdminDMain.css";

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();
  const { language } = useLanguage();

  if (isLoading) {
    return <div>Loading...</div>
  };

  if (!stats) {
    return <div>No Stats Found!</div>
  };

  if (error) {
    return <div>Failed To Load Stats!</div>
  };

  return (
    <div className='admin-d-main'>
      <div>
        <h1 className='admin-d-main-h1'>
          {language === "ua" ? 'ПАНЕЛЬ АДМІНІСТРАТОРА' : language === "ru" ? 'ПАНЕЛЬ АДМИНИСТРАТОРА' : 'ADMIN DASHBOARD'}
        </h1>
        <AdminStats stats={stats} />
        <AdminStatsChart stats={stats} />
      </div>
    </div>
  )
};

export default AdminDMain
