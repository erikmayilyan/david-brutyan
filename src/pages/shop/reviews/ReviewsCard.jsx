import React, { useState } from 'react';
import { useLanguage } from '../../../LanguageContext';
import avatarImg from '../../../assets/avatarImg.jpg';
import { formatDate } from '../../../utils/formatDate';
import PostReview from './PostReview';
import './ReviewsCard.css';

const ReviewsCard = ({ productReviews }) => {
  const reviews = productReviews || [];
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(reviews);

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='reviews-card'>
      <div>
        {
          reviews.length > 0 ? (
            <div>
              <h3 className='all-comments'>
                { language == "ua" ? 'УСІ КОМЕНТАРІ' : 'ВСЕ КОММЕНТАРИИ' } 
              </h3>
              <div>
                {
                  reviews.map((review, index) => (
                    <div key={index} className='reviews-section'>
                      <div className='reviews-united'>
                        <img src={avatarImg} alt="" className='size-14' />
                        <div className='reviews-single'>
                          <p className='reviews-username'>
                            {review?.userId?.username}
                          </p>
                          <p className='reviews-format-date'>
                            {formatDate(review?.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className='reviews-new-comment'>
                        <p>{review?.comment}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ) : <p>{ language == "ua" ? 'ЩЕ НЕМАЄ ВІДГУКІВ' : 'НЕТ ОТЗЫВОВ' }</p>
        }
      </div>
      <div className='mt-12'>
        <button onClick={handleOpenReviewModal} className='reviews-nice-button'>
          { language == "ua" ? 'ДОДАТИ ВІДГУК' : 'ДОБАВИТЬ ОТЗЫВ' }
        </button>
      </div>
      <PostReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal} />
    </div>
  )
};

export default ReviewsCard
