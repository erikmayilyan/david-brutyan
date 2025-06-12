import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import './ShopPage.css';

const ShopFiltering = ({ filtersUa, filtersRu, filtersState, setFiltersState }) => {
  const { language } = useLanguage();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);  
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);

  const categories = language === 'ua' ? filtersUa.categories : filtersRu.categories;
  const colors = language === 'ua' ? filtersUa.colors : filtersRu.colors;  
  const priceRanges = language === 'ua' ? filtersUa.priceRanges : filtersRu.priceRanges;
  const seasons = language === 'ua' ? filtersUa.seasons : filtersRu.seasons;
  
  const placeholder = language === 'ua' ? 'КАТЕГОРІЇ' : 'КАТЕГОРИИ';
  const placeholder2 = language === 'ua' ? 'КОЛЬОРИ' : 'ЦВЕТА';
  const placeholder3 = language === 'ua' ? 'ЦІНА' : 'ЦЕНА';
  const placeholder4 = language === 'ua' ? 'СЕЗОН' : 'СЕЗОН';

  const handleCategoryChange = (category) => {
    setFiltersState({ ...filtersState, category });
    setIsCategoryOpen(false); 
  };

  const handleColorChange = (color) => {
    setFiltersState({ ...filtersState, color });
    setIsColorOpen(false);  
  };

  const handlePriceChange = (priceRange) => {
    setFiltersState((prevState) => ({
      ...prevState,
      priceRange, 
    }));
    setIsPriceOpen(false);
  };

  const handleSeasonChange = (season) => {
    setFiltersState({ ...filtersState, season });
    setIsSeasonOpen(false); 
  };   

  const clearFilters = () => {
    setFiltersState({
      category: language === 'ua' ? 'УСІ' : 'ВСЕ',
      color: language === 'ua' ? 'УСІ' : 'ВСЕ',
      season: language === 'ua' ? 'УСІ' : 'ВСЕ',
      priceRange: ''
    });
  };  

  useEffect(() => {
    console.log("Updated Filters:", filtersState);
  }, [filtersState]);  
  
  return (
    <div className='shop-filtering'>
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
            language === "ua" ? 'ОЧИСТИТИ ВСІ ФІЛЬТРИ' : 'ОЧИСТИТЬ ВСЕ ФИЛЬТРЫ'
          }
        </button>
      </div>
    </div>
  );
};

export default ShopFiltering;
