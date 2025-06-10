import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice'; 
import "./DashboardLayout.css";

const navItems = [
  { path_ua: '/ua/dashboard/admin', path_ru: '/iv/dashboard/admin', path_en: '/en/dashboard/admin', label_ua: 'ДАШБОРД', label_ru: 'ДАШБОРД', label_en: 'DASHBOARD' },
  { path_ua: '/ua/dashboard/add-new-product', path_ru: '/iv/dashboard/add-new-product', path_en: '/en/dashboard/add-new-product', label_ua: 'ДОДАТИ НОВИЙ ПОСТ', label_ru: 'ДОБАВИТЬ НОВЫЙ ПОСТ', label_en: 'ADD NEW POST' },
  { path_ua: '/ua/dashboard/add-new-color-ua', path_ru: '/iv/dashboard/add-new-color-ua', path_en: '/en/dashboard/add-new-color-ua', label_ua: 'ДОДАТИ НОВИЙ КОЛІР UA', label_ru: 'ДОБАВИТЬ НОВЫЙ ЦВЕТ UA', label_en: 'ADD NEW COLOR UA' },
  { path_ua: '/ua/dashboard/add-new-color-ru', path_ru: '/iv/dashboard/add-new-color-ru', path_en: '/en/dashboard/add-new-color-ru', label_ua: 'ДОДАТИ НОВИЙ КОЛІР RU', label_ru: 'ДОБАВИТЬ НОВЫЙ ЦВЕТ RU', label_en: 'ADD NEW COLOR RU' },
  { path_ua: '/ua/dashboard/add-new-color-en', path_ru: '/iv/dashboard/add-new-color-en', path_en: '/en/dashboard/add-new-color-en', label_ua: 'ДОДАТИ НОВИЙ КОЛІР EN', label_ru: 'ДОБАВИТЬ НОВЫЙ ЦВЕТ EN', label_en: 'ADD NEW COLOR EN' },
  { path_ua: '/ua/dashboard/add-new-category-ua', path_ru: '/iv/dashboard/add-new-category-ua', path_en: '/en/dashboard/add-new-category-ua', label_ua: 'ДОДАТИ НОВИЙ КАТЕГОРІЮ UA', label_ru: 'ДОБАВИТЬ НОВЫЙ КАТЕГОРИЮ UA', label_en: 'ADD NEW CATEGORY UA' },
  { path_ua: '/ua/dashboard/add-new-category-ru', path_ru: '/iv/dashboard/add-new-category-ru', path_en: '/en/dashboard/add-new-category-ru', label_ua: 'ДОДАТИ НОВИЙ КАТЕГОРІЮ RU', label_ru: 'ДОБАВИТЬ НОВЫЙ КАТЕГОРИЮ RU', label_en: 'ADD NEW CATEGORY RU' },
  { path_ua: '/ua/dashboard/add-new-category-en', path_ru: '/iv/dashboard/add-new-category-en', path_en: '/en/dashboard/add-new-category-en', label_ua: 'ДОДАТИ НОВИЙ КАТЕГОРІЮ EN', label_ru: 'ДОБАВИТЬ НОВЫЙ КАТЕГОРИЮ EN', label_en: 'ADD NEW CATEGORY EN' },
  { path_ua: '/ua/dashboard/manage-products', path_ru: '/iv/dashboard/manage-products', path_en: '/en/dashboard/manage-products', label_ua: 'КЕРУВАТИ ПРОДУКТАМИ', label_ru: 'УПРАВЛЯТЬ ПРОДУКТАМИ', label_en: 'MANAGE PRODUCTS' },
  { path_ua: '/ua/dashboard/users', path_ru: '/iv/dashboard/users', path_en: '/en/dashboard/users', label_ua: 'КОРИСТУВАЧІ', label_ru: 'ПОЛЬЗОВАТЕЛИ', label_en: 'USERS' },
  { path_ua: '/ua/dashboard/manage-orders', path_ru: '/iv/dashboard/manage-orders', path_en: '/en/dashboard/manage-orders', label_ua: 'КЕРУВАТИ ЗАМОВЛЕННЯМИ', label_ru: 'УПРАВЛЯТЬ ЗАКАЗАМИ', label_en: 'MANAGE ORDERS' },
  { path_ua: '/ua/dashboard/add-blog', path_ru: '/iv/dashboard/add-blog', path_en: '/en/dashboard/add-blog', label_ua: 'ДОДАТИ БЛОГ', label_ru: 'ДОБАВИТЬ БЛОГ', label_en: 'ADD BLOG' },
  { path_ua: '/ua/dashboard/manage-opinions', path_ru: '/iv/dashboard/manage-opinions', path_en: '/en/dashboard/manage-opinions', label_ua: 'КЕРУВАТИ ДУМКА', label_ru: 'УПРАВЛЯТЬ МНЕНИЕ', label_en: 'MANAGE OPINIONS' },
  { path_ua: '/ua/dashboard/archived-opinions', path_ru: '/iv/dashboard/archived-opinions', path_en: '/en/dashboard/archived-opinions', label_ua: 'ДОДАНО ДУМКИ', label_ru: 'ДОБАВЛЕНЫ МНЕНИЯ', label_en: 'ARCHIVED OPINIONS' },
  { path_ua: '/ua/dashboard/add-new-season-ua', path_ru: '/iv/dashboard/add-new-season-ua', path_en: '/en/dashboard/add-new-season-ua', label_ua: 'ДОДАТИ НОВИЙ СЕЗОН UA', label_ru: 'ДОБАВИТЬ НОВЫЙ СЕЗОН UA', label_en: 'ADD NEW SEASON UA' },
  { path_ua: '/ua/dashboard/add-new-season-ru', path_ru: '/iv/dashboard/add-new-season-ru', path_en: '/en/dashboard/add-new-season-ru', label_ua: 'ДОДАТИ НОВИЙ СЕЗОН RU', label_ru: 'ДОБАВИТЬ НОВЫЙ СЕЗОН RU', label_en: 'ADD NEW SEASON RU' },
  { path_ua: '/ua/dashboard/add-new-season-en', path_ru: '/iv/dashboard/add-new-season-en', path_en: '/en/dashboard/add-new-season-en', label_ua: 'ДОДАТИ НОВИЙ СЕЗОН EN', label_ru: 'ДОБАВИТЬ НОВЫЙ СЕЗОН EN', label_en: 'ADD NEW SEASON EN' },
  { path_ua: '/ua/dashboard/add-faq', path_ru: '/iv/dashboard/add-faq', path_en: '/en/dashboard/add-faq', label_ua: 'ДОДАТИ FAQ', label_ru: 'ДОБАВИТЬ FAQ', label_en: 'ADD FAQ' },
  { path_ua: '/ua/dashboard/banner', path_ru: '/iv/dashboard/banner', path_en: '/en/dashboard/banner', label_ua: 'Банер', label_ru: 'Баннер', label_en: 'Banner' }
];

const AdminDashboard = () => {
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

  const getPath = (item) => {
    switch (language) {
      case 'ua':
        return item.path_ua;
      case 'ru':
        return item.path_ru;
      case 'en':
        return item.path_en;
      default:
        return item.path_ua;
    }
  };

  const getLabel = (item) => {
    switch (language) {
      case 'ua':
        return item.label_ua;
      case 'ru':
        return item.label_ru;
      case 'en':
        return item.label_en;
      default:
        return item.label_ua;
    }
  };

  return (
    <div className='user-dashboard'>
      <div>
        <div className="nav-logo">
          <Link>MILDO</Link>
          <p className='nav-logo-user'>Admin Dashboard</p>
        </div>
        <hr className='mt-5' />
        <ul className='user-dashboard-ul'>
          {navItems.map((item) => (
            <li key={getPath(item)}>
              <NavLink className={({ isActive }) => isActive ? "text-red-600 font-bold" : "text-black"} 
                to={getPath(item)}>
                {getLabel(item)}
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
          {language === "ua" ? "ВИЙТИ" : language === "ru" ? "ВЫЙТИ" : "LOGOUT"}
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard
