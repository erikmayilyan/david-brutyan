import React from 'react';
import { useLanguage } from '../../../../LanguageContext';
import "./UserDMain.css";

const UserStats = ({ stats }) => {
  const { language } = useLanguage();

  return (
    <div className='user-stats'>
      <div className='user-stats-more'>
        <div className="payment-stats">
          <h2>
            { language === "ua" ? 'ЗАГАЛЬНІ ПЛАТЕЖІ' : 
              language === "en" ? 'TOTAL PAYMENTS' : 
              'ОБЩИЕ ПЛАТЕЖИ' }
          </h2>
          <p>${stats?.totalPayments}</p>
        </div>    
        <div className="payment-stats">
          <h2>
            { language === "ua" ? 'ЗАГАЛЬНІ ВІДГУКИ' : 
              language === "en" ? 'TOTAL REVIEWS' : 
              'ОБЩИЕ ОТЗЫВЫ' }
          </h2>
          <p>{stats?.totalReviews}</p>
        </div>  
        <div className="payment-stats">
          <h2>
            { language === "ua" ? 'ЗАГАЛЬНІ КУПЛЕНІ ПРОДУКТИ' : 
              language === "en" ? 'TOTAL PURCHASED PRODUCTS' : 
              'ОБЩИЕ КУПЛЕННЫЕ ПРОДУКТЫ' }
          </h2>
          <p>{stats?.totalPurchasedProducts}</p>
        </div>  
      </div>
    </div>
  );
};

export default UserStats;
