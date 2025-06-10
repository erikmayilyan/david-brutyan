import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../../LanguageContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/features/cart/cartSlice';
import SingleModal from './singleModal';  
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import ReviewsCard from '../reviews/ReviewsCard';
import './singleProduct.css';

const SingleProduct = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [product, setProduct] = useState(null); 
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];
  const availableSizes = singleProduct.sizes || [];
  
  useEffect(() => {
    if (data) {
      setProduct(data.product); 
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error Loading Product Details.</p>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const increment = () => setQuantity((prevQuantity) => prevQuantity + 1);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSelect = (size) => {
    setSelectedSize(size);
    setIsOpen(false);
  };

  const openModal = () => setPopUp(true);
  const closeModal = () => setPopUp(false);

  const handleImageClick = (image) => {
    setActiveImage(image);
    setIsModalOpen(true);
  };

  const closeTheModal = () => setIsModalOpen(false);

  const handleAddToCart = (product, quantity) => {
    if (!selectedSize) {
      alert(language === "ua" ? 'Будь ласка, виберіть розмір!' : language === "ru" ? 'Пожалуйста, выберите размер!' : 'Please select a size!');
      return;
    }
    const productWithQuantity = { product, quantity, size: selectedSize };
    dispatch(addToCart(productWithQuantity));
  };

  return (
    <section>
      <div className="single-product">
        <div className="single-image-section">
          <img src={activeImage || singleProduct?.image} alt={singleProduct?.name} className="main-product-img" onClick={() => handleImageClick(activeImage || singleProduct?.image)} />
          <div className="single-product-details">
            {singleProduct.otherImages?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${singleProduct.name} - ${index + 1}`}
                className="single-product-img"
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{singleProduct.name}</h1>
          <p>₴ {singleProduct.price} {singleProduct.oldPrice ? <s>₴ {singleProduct.oldPrice}</s> : null}</p>
          <p className="product-description">
            {language === "ua" ? singleProduct.description_ua : language === "ru" ? singleProduct.description_ru : singleProduct.description_en}
          </p>
          <div className="size-options">
            <h3>{language === "ua" ? 'РОЗМІР' : language === "ru" ? 'РАЗМЕР' : 'SIZE'}</h3>
            <div className="size-buttons">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="size-description" onClick={openModal}>
              <i className="ri-ruler-line"></i>
              <span className="razmer-tob">
                {language === "ua" ? 'ГІД РОЗМІРІВ' : language === "ru" ? 'РАЗМЕРНАЯ ТАБЛИЦА' : 'SIZE GUIDE'}
              </span>
            </div>
          </div>
          <div className="shop-product-actions">
            <button className="shop-product-btn" onClick={decrement}>-</button>
            <span className="shop-product-btn-num">{quantity}</span>
            <button className="shop-product-btn" onClick={increment}>+</button>
          </div>
          <button 
            className="shop-product-actions-add" 
            disabled={!selectedSize} 
            onClick={() => handleAddToCart(product, quantity)}
          >
            {language === "ua" ? "ДОДАТИ В КОШИК" : language === "ru" ? "ДОБАВИТЬ В КОРЗИНУ" : "ADD TO CART"}
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className='image-nice-modal-overlay' onClick={closeTheModal}>
          <div className='image-nice-modal'>
            <button className="close-icon" onClick={closeTheModal}>
              <i className="ri-close-line"></i>
            </button>
            <img src={activeImage || singleProduct?.image} alt="Enlarged" className='enlarged-nice-image' />
          </div>
        </div>
      )}
      <SingleModal isOpen={popUp} onClose={closeModal}>
        <h2>{language === "ua" ? "ГІД РОЗМІРІВ" : language === "ru" ? "РАЗМЕРНАЯ ТАБЛИЦА" : "SIZE GUIDE"}</h2>
        <div className="size-chart">
          <table>
            <thead>
              <tr>
                <th>Sizes</th>
                <th>35</th>
                <th>36</th>
                <th>37</th>
                <th>38</th>
                <th>39</th>
                <th>40</th>
                <th>41</th>
                <th>42</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Foot length (cm)</td>
                <td>22</td>
                <td>22.7</td>
                <td>23.3</td>
                <td>24</td>
                <td>24.6</td>
                <td>25.3</td>
                <td>25.9</td>
                <td>26.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SingleModal>
      <ReviewsCard productReviews={productReviews} />
    </section>
  );
};

export default SingleProduct;
