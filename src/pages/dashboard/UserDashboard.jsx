import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice'; 
import "./DashboardLayout.css";

const navItems = [
  { path_ua: '/ua/dashboard', path_ru: '/iv/dashboard', path_en: '/en/dashboard', label_ua: 'ДАШБОРД', label_ru: 'ДАШБОРД', label_en: 'DASHBOARD' },
  { path_ua: '/ua/dashboard/orders', path_ru: '/iv/dashboard/orders', path_en: '/en/dashboard/orders', label_ua: 'ЗАМОВЛЕННЯ', label_ru: 'ЗАКАЗЫ', label_en: 'ORDERS' },
  { path_ua: '/ua/dashboard/payments', path_ru: '/iv/dashboard/payments', path_en: '/en/dashboard/payments', label_ua: 'ПЛАТЕЖІ', label_ru: 'ПЛАТЕЖИ', label_en: 'PAYMENTS' },
  { path_ua: '/ua/dashboard/profile', path_ru: '/iv/dashboard/profile', path_en: '/en/dashboard/profile', label_ua: 'ПРОФІЛЬ', label_ru: 'ПРОФИЛЬ', label_en: 'PROFILE' },
  { path_ua: '/ua/dashboard/reviews', path_ru: '/iv/dashboard/reviews', path_en: '/en/dashboard/reviews', label_ua: 'ВІДГУКИ', label_ru: 'ОТЗЫВЫ', label_en: 'REVIEWS' }
];

const UserDashboard = () => {
  const { language } = useLanguage();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap(); 
      console.log("Logout response:", response);

      dispatch(logout()); 
      navigate('/'); 
    } catch (error) {
      console.error("Failed To Log Out", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className='user-dashboard'>
      <div>
        <div className="nav-logo">
          <Link>MILDO</Link>
          <p className='nav-logo-user'>User Dashboard</p>
        </div>
        <hr className='mt-5' />
        <ul className='user-dashboard-ul'>
          {navItems.map((item) => (
            <li key={language === "ua" ? item.path_ua : language === "en" ? item.path_en : item.path_ru}>
              <NavLink 
                className={({ isActive }) => isActive ? "text-red-600 font-bold" : "text-black"} 
                to={language === "ua" ? item.path_ua : language === "en" ? item.path_en : item.path_ru}
              >
                {language === "ua" ? item.label_ua : language === "en" ? item.label_en : item.label_ru}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='user-dashboard-logout'>
        <hr className='user-dashboard-logout' />
        <button 
          onClick={handleLogout}
          className='user-dashboard-btn-logout'
        >
          {language === "ua" ? "ВИЙТИ" : language === "en" ? "LOG OUT" : "ВЫЙТИ"}
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
