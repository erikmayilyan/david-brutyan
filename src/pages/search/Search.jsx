import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import './Search.css';

const Search = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({
    searchQuery,
    page: 1,  
    limit: 1000,  
  });

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // No need to reset page as there's no pagination now
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <h1 className="loading-text text-[50px]">
          {language === 'ua' ? 'ЗАВАНТАЖЕННЯ ...' : (language === 'en' ? 'LOADING ...' : 'ЗАГРУЗКА ...')}
        </h1>
      </div>
    );
  }

  if (error) {
    return <div>{language === 'ua' ? 'Помилка при завантаженні товарів' : (language === 'en' ? 'Error loading products.' : 'Ошибка при загрузке товаров')}</div>;
  };

  if (products.length === 0) {
    return (
      <div>
        <h3 className="no-products">
          {language === 'ua' ? 'Немає доступних товарів' : (language === 'en' ? 'No available products' : 'Нет доступных товаров')}
        </h3>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const articule = product.articule ? product.articule.toLowerCase() : '';  
    const name = product.name ? product.name.toLowerCase() : '';            
    const query = searchQuery.toLowerCase();
    return articule.includes(query) || name.includes(query);  
  });

  return (
    <div>
      <div className='search'>
        <h2>
          {language === 'ua' ? 'ЗНАЙДІТЬ СВІЙ ПРЕДМЕТ' : (language === 'en' ? 'FIND YOUR ITEM' : 'НАЙДИТЕ СВОЙ ПРЕДМЕТ')}
        </h2>
        <br />
        <section className='search-form'>
          <div className='search-form-more'>
            <input
              type="text"
              className="form-control"
              placeholder={language === 'ua' ? 'Пошук товарів...' : (language === 'en' ? 'Search for products...' : 'Поиск товаров...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button onClick={() => setSearchQuery(searchQuery)} className='search-button'>
              <i className="ri-search-2-line"></i>
            </button>
          </div>
        </section>
      </div>

      <div className='filter-products-more'>
        <ProductCards products={filteredProducts} />
      </div>
    </div>
  );
};

export default Search;
