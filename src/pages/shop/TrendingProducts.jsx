import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import ProductCards from './ProductCards';
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import "./TrendingProducts.css";

const TrendingProducts = () => {
  const { language } = useLanguage();
  const [visibleProducts, setVisibleProducts] = useState(4);

  // Fetch products from the database
  const { data: { products = [] } = {}, error, isLoading } = useFetchAllProductsQuery({ limit: 20 });

  const loadMoreProducts = () => {
    setVisibleProducts(prevCount => prevCount + 4);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error Loading Products</div>;
  }

  return (
    <div className="trending-products">
      <h2>
        { language === "ua" 
          ? 'ПОПУЛЯРНІ ТОВАРИ' 
          : language === "ru"
            ? 'ПОПУЛЯРНЫЕ ТОВАРЫ'
            : 'POPULAR PRODUCTS' }
      </h2>
      <ProductCards products={products.slice(0, visibleProducts)} />
      <div className='load-more-btn'>
        {
          visibleProducts < products.length && (
            <button className='the-button-itself' onClick={loadMoreProducts}>
              { language === "ua" 
                ? 'ЗАВАНТАЖИТИ БІЛЬШЕ' 
                : language === "ru"
                  ? 'ЗАГРУЗИТЬ ЕЩЁ'
                  : 'LOAD MORE' }
            </button>
          )
        }
      </div>
    </div>
  );
};

export default TrendingProducts;