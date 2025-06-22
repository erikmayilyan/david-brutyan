import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import './ShopPage.css';

const ShopFiltering = ({ filtersUa, filtersRu, filtersEn, filtersState, setFiltersState }) => {
  const { language } = useLanguage();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);  
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);

  const filters = language === 'ua' ? filtersUa : language === 'ru' ? filtersRu : filtersEn;

  const categories = filters.categories;
  const colors = filters.colors;  
  const priceRanges = filters.priceRanges;
  const seasons = filters.seasons;
  
  const placeholder = language === 'ua' ? 'КАТЕГОРІЇ' : language === 'ru' ? 'КАТЕГОРИИ' : (language === 'en' || language === 'english') ? 'CATEGORIES' : 'CATEGORIES';
  const placeholder2 = language === 'ua' ? 'КОЛЬОРИ' : language === 'ru' ? 'ЦВЕТА' : (language === 'en' || language === 'english') ? 'COLORS' : 'COLORS';
  const placeholder3 = language === 'ua' ? 'ЦІНА' : language === 'ru' ? 'ЦЕНА' : (language === 'en' || language === 'english') ? 'PRICE' : 'PRICE';
  const placeholder4 = language === 'ua' ? 'СЕЗОН' : language === 'ru' ? 'СЕЗОНЫ' : (language === 'en' || language === 'english') ? 'SEASONS' : 'SEASONS';

  const handleCategoryChange = (category) => {
    console.log('Selected category:', category);
    setFiltersState({ ...filtersState, category });
    setIsCategoryOpen(false); 
  };

  const handleColorChange = (color) => {
    console.log('Selected color:', color);
    setFiltersState({ ...filtersState, color });
    setIsColorOpen(false);  
  };

  const handlePriceChange = (priceRange) => {
    console.log('Selected price range:', priceRange);
    setFiltersState((prevState) => ({
      ...prevState,
      priceRange, 
    }));
    setIsPriceOpen(false);
  };

  const handleSeasonChange = (season) => {
    console.log('Selected season:', season);
    setFiltersState({ ...filtersState, season });
    setIsSeasonOpen(false); 
  };   

  const clearFilters = () => {
    setFiltersState({
      category: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
      color: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
      season: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
      priceRange: ''
    });
  };  

  useEffect(() => {
    setFiltersState({
      category: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
      color: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
      season: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
      priceRange: ''
    });
  }, [language]);

  useEffect(() => {
    console.log("Updated Filters:", filtersState);
  }, [filtersState]);  
  
  return (
    <div className='shop-filtering' key={language}>
      <div className="shop-category">
        <div className="shop-category-more">
          <button 
            className="shop-button-category"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <span className='shop-button-text'>{placeholder}</span> 
            <span className='shop-arrow-icon'>{isCategoryOpen ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}</span>
          </button>

          {isCategoryOpen && (
            <div className="shop-button-options">
              {categories.map((category) => (
                <div 
                  key={category} 
                  className="shop-button-option"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="shop-category">
        <div className="shop-category-more">
          <button 
            className="shop-button-category"
            onClick={() => setIsColorOpen(!isColorOpen)}  
          >
            <span className='shop-button-text'>{placeholder2}</span> 
            <span className='shop-arrow-icon'>{isColorOpen ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}</span>
          </button>

          {isColorOpen && (
            <div className="shop-button-options">
              {colors.map((color) => (
                <div 
                  key={color} 
                  className="shop-button-option"
                  onClick={() => handleColorChange(color)}
                >
                  {color}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="shop-category">
        <div className="shop-category-more">
          <button 
            className="shop-button-category"
            onClick={() => setIsPriceOpen(!isPriceOpen)}  
          >
            <span className='shop-button-text'>{placeholder3}</span> 
            <span className='shop-arrow-icon'>{isPriceOpen ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}</span>
          </button>

          {isPriceOpen && (
            <div className="shop-button-options">
              {priceRanges.map((priceRange) => (
                <div 
                  key={priceRange.label} 
                  className="shop-button-option"
                  onClick={() => handlePriceChange(priceRange.label)}
                >
                  {priceRange.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="shop-category">
        <div className="shop-category-more">
          <button 
            className="shop-button-category"
            onClick={() => setIsSeasonOpen(!isSeasonOpen)}  
          >
            <span className='shop-button-text'>{placeholder4}</span> 
            <span className='shop-arrow-icon'>{isSeasonOpen ? <i className="ri-arrow-up-s-line"></i> : <i className="ri-arrow-down-s-line"></i>}</span>
          </button>

          {isSeasonOpen && (
            <div className="shop-button-options">
              {seasons.map((season) => (
                <div 
                  key={season} 
                  className="shop-button-option"
                  onClick={() => handleSeasonChange(season)}
                >
                  {season}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="shop-category">
        <button onClick={clearFilters} className='shop-category-btn'>
          {
            language === "ua" ? 'ОЧИСТИТИ ВСІ ФІЛЬТРИ' :
            language === 'ru' ? 'ОЧИСТИТЬ ВСЕ ФИЛЬТРЫ' :
            language === 'en' ? 'CLEAR ALL FILTERS' : 
            'CLEAR ALL FILTERS' 
          }
        </button>
      </div>
    </div>
  );
};

export default ShopFiltering;
