import React from 'react';
import { useSelector } from 'react-redux';
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';
import { useLanguage } from '../../../LanguageContext';
import "./UserReviews.css";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: reviews, error, isLoading } = useGetReviewsByUserIdQuery(user?._id);
  const { language } = useLanguage();

  if (error) {
    return <div>Failed To Load Reviews!</div>
  };

  console.log(reviews);

  return (
    <div className='user-reviews-section'>
      <h2 className='user-reviews-h2'>
        { language == "ua" ? 'ВАШІ КОМЕНТАРІ' : 'ВАШИ КОММЕНТАРИИ' }
      </h2>
      <div>
        {
          reviews && reviews.map((review, index) => (
            <div key={index} className='each-comment-user'>
              <p className='user-reviews-paragraph'>
                <strong>{ language == "ua" ? 'КОМЕНТАР: ' : 'КОММЕНТАРИЙ: ' }</strong> {review?.comment}
              </p>
              <p>
                <strong>{ language == "ua" ? 'ІДЕНТИФІКАТОР ПРОДУКТУ: ' : 'ИДЕНТИФИКАТОР ПРОДУКТА: ' }</strong> {review?.productId}
              </p>
              <p>
              <strong>{ language == "ua" ? 'ДАТА: ' : 'ДАТА: ' }</strong> {
                review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'
              }
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserReviews
