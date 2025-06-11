import React, { useState } from 'react';
import { useLanguage } from '../../../LanguageContext';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';
import "./ReviewsCard.css";

const PostReview = ({ isModalOpen, handleClose }) => {
  const { language } = useLanguage();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();
  const [comment, setComment] = useState('');
  const navigate = useNavigate(); 

  const getLanguagePrefix = () => {
    return language === "ua" ? "/ua" : "/iv";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?._id) {
      alert(language === "ua" ? "Ви повинні увійти, щоб залишити відгук." : "Вы должны войти, чтобы оставить отзыв.");
      navigate(`${getLanguagePrefix()}/login`); 
      return;
    };

    console.log('Comment:', comment);
    console.log('User ID:', user?._id);
    console.log('Product ID:', id);

    const newComment = {
      comment: comment,
      userId: user._id,
      productId: id
    };

    try {
      const response = await postReview(newComment).unwrap();
      setComment('');
      refetch();
      handleClose(); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`post-review-more ${isModalOpen ? '' : 'hidden'}`}>
      <div className='post-review-content'>
        <h2>
          { language == "ua" ? 'ОПУБЛІКУВАТИ ВІДГУК' : 'ОСТАВИТЬ ОТЗЫВ' }
        </h2>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows="4"
          className='post-review-textarea'
        />
        <div className='post-review-buttons'>
          <button onClick={handleClose} className='post-review-button-first'>
            { language == "ua" ? 'СКАСУВАТИ' : 'ОТМЕНИТЬ' }
          </button>
          <button onClick={handleSubmit} className='post-review-button-second'>
            { language == "ua" ? 'НАДІСЛАТИ' : 'ОТПРАВИТЬ' }
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostReview;
