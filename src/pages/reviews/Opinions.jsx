import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext';
import "./Opinions.css";

const Opinions = () => {
  const { language } = useLanguage('');
  const [archivedOpinions, setArchivedOpinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const fetchArchivedOpinions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/archived/archived-opinions');
        if (!response.ok) {
          throw new Error('Failed To Fetch Archived Opinions');
        }
        const data = await response.json();
        setArchivedOpinions(data.archived);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArchivedOpinions();
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth > 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth > 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  if (loading) {
    return <p>{ language === "ua" ? 'ЗАВАНТАЖЕННЯ АРХІВНИХ ДУМОК...' : 'ЗАГРУЗКА АРХИВНЫХ МНЕНИЙ...' }</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + cardsPerView) % archivedOpinions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - cardsPerView + archivedOpinions.length) % archivedOpinions.length
    );
  };

  return (
    <div className="opinions-container">
      {archivedOpinions.length === 0 ? (
        <p className="no-opinions">
          { language === "ua" ? 'АРХІВНИХ ДУМОК НЕ ЗНАЙДЕНО' : 'АРХИВНЫЕ МНЕНИЯ НЕ НАЙДЕНЫ' }
        </p>
      ) : (
        <div className="carousel">
          <button className="carousel-btn left" onClick={prevSlide}>&#10094;</button>

          <div className="carousel-track">
            {archivedOpinions.slice(currentIndex, currentIndex + cardsPerView).map((opinion) => (
              <div key={opinion._id} className="opinions-card-item">
                <h2>{opinion.name}</h2>
                <p>{opinion.comment}</p>
              </div>
            ))}
          </div>

          <button className="carousel-btn right" onClick={nextSlide}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default Opinions;
