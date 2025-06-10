import React from 'react';
import { useLanguage } from '../../LanguageContext';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import "./DashboardLayout.css";
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardLayout = () => {
  const { language } = useLanguage();
  const { user } = useSelector((state) => state.auth);

  const langDomain = 
    language === "ua" ? '/ua/login' : 
    language === "en" ? '/en/login' : 
    '/iv/login';  

  if (!user) {
    return <Navigate to={langDomain} replace />;
  };

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to={langDomain} replace />;
    }
  };

  return (
    <div className='dashboard-layout'>
      <header>
        {renderDashboard()}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
