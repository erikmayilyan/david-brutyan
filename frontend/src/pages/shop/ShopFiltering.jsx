import React from 'react';
import { useLanguage } from '../../LanguageContext';
import './ShopPage.css';

const ShopFiltering = ({ filtersUa, filtersRu, filtersEn, filtersState, setFiltersState }) => {
  const { language } = useLanguage();
  const filters = language === 'ua' ? filtersUa : language === 'ru' ? filtersRu : filtersEn;

  const handleFilterChange = (filterType, value) => {
    setFiltersState(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="shop-filtering">
      <div className="filter-section">
        <h5>{language === 'ua' ? 'Категорії' : language === 'ru' ? 'Категории' : 'Categories'}</h5>
        <select
          value={filtersState.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="filter-select"
        >
          {filters.categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h5>{language === 'ua' ? 'Кольори' : language === 'ru' ? 'Цвета' : 'Colors'}</h5>
        <select
          value={filtersState.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
          className="filter-select"
        >
          {filters.colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h5>{language === 'ua' ? 'Сезони' : language === 'ru' ? 'Сезоны' : 'Seasons'}</h5>
        <select
          value={filtersState.season}
          onChange={(e) => handleFilterChange('season', e.target.value)}
          className="filter-select"
        >
          {filters.seasons.map((season, index) => (
            <option key={index} value={season}>
              {season}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <h5>{language === 'ua' ? 'Ціна' : language === 'ru' ? 'Цена' : 'Price'}</h5>
        <select
          value={filtersState.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          className="filter-select"
        >
          <option value="">{language === 'ua' ? 'Усі ціни' : language === 'ru' ? 'Все цены' : 'All prices'}</option>
          {filters.priceRanges.map((range, index) => (
            <option key={index} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShopFiltering;
