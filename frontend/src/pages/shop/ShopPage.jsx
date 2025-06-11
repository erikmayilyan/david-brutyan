import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import ProductCards from '../shop/ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL';
import './ShopPage.css';

const ShopPage = () => {
  const { language } = useLanguage();
  const [categories, setCategories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [colors, setColors] = useState([]);
  const [filtersState, setFiltersState] = useState({
    category: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
    color: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
    season: language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
    priceRange: ''
  });
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/api/categories${language === 'ua' ? 'Ua' : language === 'ru' ? 'Ru' : 'En'}/get-categories-${language}`
        );
        const categoryNames = response.data.map(cat => cat.label);
        setCategories([
          language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
          ...categoryNames
        ]);
      } catch (error) {
        console.error("Error Fetching Categories:", error);
      }
    };
    fetchCategories();
  }, [language]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/api/seasons${language === 'ua' ? 'Ua' : language === 'ru' ? 'Ru' : 'En'}/get-seasons-${language}`
        );
        console.log(response); 
   
        const seasonNames = response.data.map(cat => cat.label);
        
        setSeasons([
          language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
          ...seasonNames
        ]);
      } catch (error) {
        console.error("Error Fetching Seasons:", error);
      }
    };
    fetchSeasons();
  }, [language]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(
          `${getBaseUrl()}/api/colors${language === 'ua' ? 'Ua' : language === 'ru' ? 'Ru' : 'En'}/get-colors-${language}`
        );
        const colorNames = response.data.map(cat => cat.label);
        setColors([
          language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL',
          ...colorNames
        ]);
      } catch (error) {
        console.error("Error Fetching Colors:", error);
      }
    };
    fetchColors();
  }, [language]);
  
  const filters = {
    ua: {
      categories: categories || [],
      colors: colors || [],
      seasons: seasons || [],
      priceRanges: [
        { label: '₴0 - ₴500', min: 0, max: 500 },
        { label: '₴500 - ₴1000', min: 500, max: 1000 },
        { label: '₴1000 - ₴5000', min: 1000, max: 5000 },
        { label: '₴5000+', min: 5000, max: null },
      ]
    },
    ru: {
      categories: categories || [],
      colors: colors || [],
      seasons: seasons || [],
      priceRanges: [
        { label: '₴0 - ₴500', min: 0, max: 500 },
        { label: '₴500 - ₴1000', min: 500, max: 1000 },
        { label: '₴1000 - ₴5000', min: 1000, max: 5000 },
        { label: '₴5000+', min: 5000, max: null },
      ]
    },
    en: {
      categories: categories || [],
      colors: colors || [],
      seasons: seasons || [],
      priceRanges: [
        { label: '₴0 - ₴500', min: 0, max: 500 },
        { label: '₴500 - ₴1000', min: 500, max: 1000 },
        { label: '₴1000 - ₴5000', min: 1000, max: 5000 },
        { label: '₴5000+', min: 5000, max: null },
      ]
    }
  };

  const langFilters = filters[language] || filters.ua;
  const { category, color, priceRange, season } = filtersState;
  
  const selectedPriceRange = langFilters.priceRanges.find((range) => range.label === priceRange);
  const minPrice = selectedPriceRange ? selectedPriceRange.min : null;
  const maxPrice = selectedPriceRange ? selectedPriceRange.max : null;

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { data: { products = [], totalPages = 1 } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: filtersState.category !== (language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL') ? filtersState.category : undefined,
    color: filtersState.color !== (language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL') ? filtersState.color : undefined,
    season: filtersState.season !== (language === 'ua' ? 'УСІ' : language === 'ru' ? 'ВСЕ' : 'ALL') ? filtersState.season : undefined,
    minprice: selectedPriceRange ? selectedPriceRange.min : undefined,
    maxprice: selectedPriceRange ? selectedPriceRange.max : undefined,
    page: currentPage,
    limit: ProductsPerPage,
    language
  });

  console.log("Current Filters:", filtersState);
  console.log("Products:", products);
  
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <h1 className="loading-text text-[50px]">{language === 'ua' ? 'ЗАВАНТАЖЕННЯ ...' : 'ЗАГРУЗКА ...'}</h1> 
      </div>
    );
  }

  if (error) return <div>Error Loading Products</div>;

  return (
    <div>
      <div className='shop-page'>
        <h2>
          {language === 'ua' 
            ? 'РІЗНОМАНІТНІСТЬ ВЗУТТЯ ДОСТУПНА' 
            : language === 'ru'
              ? 'РАЗНООБРАЗИЕ ОБУВИ ДОСТУПНО'
              : 'SHOE VARIETY AVAILABLE'}
        </h2>
      </div>
      <div className='shop-page-main'>
        <div className='shop-page-filter'>
          <h4>
            {language === 'ua' 
              ? 'ФІЛЬТРАЦІЯ ТОВАРІВ' 
              : language === 'ru'
                ? 'ФИЛЬТРАЦИЯ ТОВАРОВ'
                : 'PRODUCT FILTERING'}
          </h4>
          <ShopFiltering
            filtersUa={filters.ua}
            filtersRu={filters.ru}
            filtersEn={filters.en}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
          />
          <div>
            <h3 className='products-available'>
              {language === 'ua' 
                  ? 'Доступні продукти' 
                  : language === 'ru'
                      ? 'Доступные товары'
                      : 'Available Products'}
            </h3>
            {products.length === 0 ? (
              <h3 className="no-products">
                {language === 'ua' 
                  ? 'Немає доступних товарів' 
                  : language === 'ru'
                    ? 'Нет доступных товаров'
                    : 'No Products Available'}
              </h3>
            ) : (
              <ProductCards products={products} />
            )}            
            {totalPages > 1 && (
              <div className='shop-page-pagination'>
                <button className="shop-page-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  {'<<'}
                </button>
                <button
                  className={`px-4 py-2 ${currentPage === 1 ? 'the-first-pagination' : 'the-second-pagination'}`}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>
                {totalPages > 2 && currentPage > 2 && <span className="ellipsis px-4 py-2 the-first-pagination">...</span>}
                {totalPages > 1 && (
                  <button
                    className={`px-4 py-2 ${currentPage === totalPages ? 'the-first-pagination' : 'the-second-pagination'}`}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                )}
                <button className="shop-page-button" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  {'>>'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
