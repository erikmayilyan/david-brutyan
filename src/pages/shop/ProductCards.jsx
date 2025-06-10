import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import './ProductCards.css';

const ProductCards = ({ products }) => {
  const { language } = useLanguage();
  const dispatch = useDispatch();
  console.log(products);

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : language === "ru" ? "/iv" : "/en";
  };  

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className='product-cards'>
      {
        products.map((product, index) => (
          <div key={index} className='product-card'>
            <div className='relative'>
              <Link to={`${getLanguagePrefix()}/shop/${product._id}`}>
                <img src={product.image} alt="product image" className='product-image' />
              </Link>
              <div className='hover-block'>
                <Link
                  to={`${getLanguagePrefix()}/shop/${product._id}`}
                >
                  <i class="ri-shopping-cart-line the-cart-thing"></i>
                </Link>
              </div>
            </div>
            <div className='product-details'>
              <h4>{product.name}</h4>
              <p>₴ {product.price} {product.oldPrice ? <s>{product?.oldPrice}</s> : null}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProductCards
