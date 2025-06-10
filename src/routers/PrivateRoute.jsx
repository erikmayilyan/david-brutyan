import React from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../LanguageContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const { language } = useLanguage();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const loginPath = language === 'ua' ? '/ua/login' : language === 'ru' ? '/iv/login' : '/en/login';

  if (!user) {
    return <Navigate to={loginPath} state={{ from: location }} replace/>
  };

  if (role && user.role !== role) {
    alert("You Are Not Authorized to Access This Page!");
    return <Navigate to={loginPath} state={{ from: location }} replace/>;
  };

  return children;
};

export default PrivateRoute
