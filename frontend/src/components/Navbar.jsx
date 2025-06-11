import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useDispatch, useSelector } from 'react-redux';
import CartModal from "../pages/shop/CartModal";
import avatarImg from "../assets/avatarImg.jpg";
import mildoLogo from "../assets/mildo.png";
import { logout } from '../redux/features/auth/authSlice';
import "./Navbar.css";
import { getBaseUrl } from '../utils/baseURL';

const Navbar = () => {
  const { language, changeLanguage } = useLanguage();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileDropOpen, setIsProfileDropOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleDropDownToggle = () => {
    setIsProfileDropOpen(!isProfileDropOpen);
  };

  const adminDropDownMenus = [
    { label: language === "ua" ? 'ПАНЕЛЬ' : language === "ru" ? 'ПАНЕЛЬ' : 'DASHBOARD', path: `${getLanguagePrefix()}/dashboard/admin` },
    { label: language === "ua" ? 'УПРАВЛЯТИ ТОВАРАМИ' : language === "ru" ? 'УПРАВЛЯТЬ ТОВАРАМИ' : 'MANAGE PRODUCTS', path: `${getLanguagePrefix()}/dashboard/manage-products` },
    { label: language === "ua" ? 'УСІ ЗАМОВЛЕННЯ' : language === "ru" ? 'ВСЕ ЗАКАЗЫ' : 'ALL ORDERS', path: `${getLanguagePrefix()}/dashboard/manage-orders` },
    { label: language === "ua" ? 'ДОДАТИ НОВИЙ ДОПИС' : language === "ru" ? 'ДОБАВИТЬ НОВЫЙ ПОСТ' : 'ADD NEW POST', path: `${getLanguagePrefix()}/dashboard/add-new-post` }
  ];

  const userDropDownMenus = [
    { label: language === "ua" ? 'ПАНЕЛЬ' : language === "ru" ? 'ПАНЕЛЬ' : 'DASHBOARD', path: `${getLanguagePrefix()}/dashboard` },
    { label: language === "ua" ? 'ПРОФІЛЬ' : language === "ru" ? 'ПРОФИЛЬ' : 'PROFILE', path: `${getLanguagePrefix()}/dashboard/profile` },
    { label: language === "ua" ? 'ПЛАТЕЖІ' : language === "ru" ? 'ПЛАТЕЖИ' : 'PAYMENTS', path: `${getLanguagePrefix()}/dashboard/payments` },
    { label: language === "ua" ? 'ЗАМОВЛЕННЯ' : language === "ru" ? 'ЗАКАЗЫ' : 'ORDERS', path: `${getLanguagePrefix()}/dashboard/orders` }
  ];

  const dropdownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

  const products = useSelector((state) => state.cart.products);
  console.log(products);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok) {
        dispatch(logout());
        localStorage.removeItem('token');
        if (language === 'ua') {
          navigate('/ua');
        } else {
          navigate('/iv');
        }
      }
    } catch (error) {
      console.error('Failed to log out', error);
    };
  };

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    if (newLanguage === "ru") {
      navigate('/iv');
    } else if (newLanguage === "en") {
      navigate('/en');
    }
  };

  return (
    <header className="navbar">
      <nav className="nav-options">
        <ul className={`nav__links ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-link">
            <Link to={`${getLanguagePrefix()}/`}>{language === "ua" ? "ГОЛОВНА" : language === "ru" ? "ГЛАВНАЯ" : "HOME"}</Link>
          </li>
          <li className="nav-link">
            <Link to={`${getLanguagePrefix()}/shop`}>{language === "ua" ? "МАГАЗИН" : language === "ru" ? "МАГАЗИН" : "SHOP"}</Link>
          </li>
          <li className="nav-link">
            <Link to={`${getLanguagePrefix()}/about`}>{language === "ua" ? "ПРО НАС" : language === "ru" ? "О НАС" : "ABOUT"}</Link>
          </li>
        </ul>

        <div className="nav-logo">
          <Link to={`${getLanguagePrefix()}/`}>
            <img src={mildoLogo} style={{ width: "80px", height: "60px" }} />
          </Link>
        </div>

        <div className={`the-icons ${isMenuOpen ? 'active' : ''}`}>
          <span className="the-icon" onClick={toggleMenu}>
            <Link to={`${getLanguagePrefix()}/reviews`}>
              <i className="ri-user-star-line"></i>
            </Link>
          </span>
          <span className="the-icon">
            <Link to={`${getLanguagePrefix()}/search`}>
              <i className="ri-search-2-line"></i>
            </Link>
          </span>
          <span className="the-icon">
            <button onClick={handleCartToggle} className="shopping-cart">
              <i className="ri-shopping-bag-line"></i>
              <sup className="shopping-cart-iteration">{products.length}</sup>
            </button>
          </span>
          <span className="the-icon">
            {
              user && user ? (
                <div>
                  <img 
                    onClick={handleDropDownToggle}
                    src={user?.profileImage || avatarImg} 
                    alt="" 
                    className="avatar-img" />
                  {
                    isProfileDropOpen && (
                      <div className='is-profile-drop-open'>
                        <ul className='is-profile-drop-open-ul'>
                          {dropdownMenus.map((menu, index) => (
                            <li className='is-profile-drop-open-ul-li' key={index}>
                              <Link 
                                onClick={() => setIsProfileDropOpen(false)}
                                className='dropdown-items' 
                                to={menu.path}
                              >
                                {menu.label}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link onClick={handleLogout}>
                              { language === "ua" ? 'ВИХІД' : language === "ru" ? 'ВЫХОД' : 'LOGOUT' }
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )
                  }
                </div>
              ) : (
                <Link to={`${getLanguagePrefix()}/login`}>
                  <i className="ri-user-3-line"></i>
                </Link>
              )
            }
          </span>
          <span className="the-icon language-dropdown">
            <button onClick={toggleDropdown} className="language-button">
              {language === "ua" ? "УКР" : language === "ru" ? "РУС" : "ENG"}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleLanguageChange("ua")} className="dropdown-item">УКР</button>
                <button onClick={() => handleLanguageChange("ru")} className="dropdown-item">РУС</button>
                <button onClick={() => handleLanguageChange("en")} className="dropdown-item">ENG</button>
              </div>
            )}
          </span>
        </div>
      </nav>

      {
        isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />
      }

      <button className="hamburger" onClick={toggleMenu}>
        <i className={`ri-menu-3-line ${isMenuOpen ? 'open' : ''}`}></i>
      </button>

      {isMenuOpen && (
        <>
          <div className="overlay" onClick={toggleMenu}></div>
          <div className="menu-content">
            <button className="close-menu" onClick={toggleMenu}>X</button>
            <ul className="menu-links">
              <li className="menu-link" onClick={toggleMenu}>
                <Link to={`${getLanguagePrefix()}/`}>{language === "ua" ? "ГОЛОВНА" : language === "ru" ? "ГЛАВНАЯ" : "HOME"}</Link>
              </li>
              <li className="menu-link" onClick={toggleMenu}>
                <Link to={`${getLanguagePrefix()}/shop`}>{language === "ua" ? "МАГАЗИН" : language === "ru" ? "МАГАЗИН" : "SHOP"}</Link>
              </li>
              <li className="menu-link" onClick={toggleMenu}>
                <Link to={`${getLanguagePrefix()}/about`}>{language === "ua" ? "ПРО НАС" : language === "ru" ? "О НАС" : "ABOUT"}</Link>
              </li>
            </ul>
            <div className="menu-icons">
              <span className="the-icon" onClick={toggleMenu}>
                <Link to={`${getLanguagePrefix()}/reviews`}>
                  <i className="ri-user-star-line"></i>
                </Link>
              </span>
              <span className="the-icon" onClick={toggleMenu}>
                <Link to={`${getLanguagePrefix()}/search`}>
                  <i className="ri-search-2-line"></i>
                </Link>
              </span>
              <span className="the-icon" onClick={toggleMenu}>
                <button onClick={handleCartToggle} className="shopping-cart">
                  <i className="ri-shopping-bag-line"></i>
                  <sup className="shopping-cart-iteration">{products.length}</sup>
                </button>
              </span>
              <span className="the-icon" onClick={toggleMenu}>
              {
                user && user ? (
                  <div>
                    <img 
                      onClick={handleDropDownToggle}
                      src={user?.profileImage || avatarImg} 
                      alt="" 
                      className="avatar-img" />
                    {
                      isProfileDropOpen && (
                        <div className='is-profile-drop-open'>
                          <ul className='is-profile-drop-open-ul'>
                            {dropdownMenus.map((menu, index) => (
                              <li className='is-profile-drop-open-ul-li' key={index}>
                                <Link 
                                  onClick={() => setIsProfileDropOpen(false)}
                                  className='dropdown-items' 
                                  to={menu.path}
                                >
                                  {menu.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link onClick={handleLogout}>
                                { language === "ua" ? 'ВИХІД' : language === "ru" ? 'ВЫХОД' : 'LOGOUT' }
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )
                    }
                    </div>
                    ) : (
                      <Link to={`${getLanguagePrefix()}/login`}>
                        <i className="ri-user-3-line"></i>
                      </Link>
                    )
                  }
              </span>
              <span className="the-icon language-dropdown">
                <button onClick={toggleDropdown} className="language-button">
                  {language === "ua" ? "УКР" : language === "ru" ? "РУС" : "ENG"}
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleLanguageChange("ua")} className="dropdown-item">УКР</button>
                    <button onClick={() => handleLanguageChange("ru")} className="dropdown-item">РУС</button>
                    <button onClick={() => handleLanguageChange("en")} className="dropdown-item">ENG</button>
                  </div>
                )}
              </span>
            </div>
          </div>
        </>
      )}

    </header>
  );
};

export default Navbar;
