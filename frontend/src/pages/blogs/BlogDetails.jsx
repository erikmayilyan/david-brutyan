import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import "./BlogDetails.css";
import { getBaseUrl } from '../../utils/baseURL';

const BlogDetails = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const [blog, setBlog] = useState(null);
  const API_URL = `${getBaseUrl()}/api/blogs/${id}`;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>{language === "ua" ? 'Блог не знайдено' : language === "ru" ? 'Блог не найден' : 'Blog not found'}</p>;
  }

  return (
    <div className='blog-details'>
      <img src={blog.image} alt="blog" className='blog-image' />
      <div>
        <h2>
          {language === "ua" 
            ? blog.title_ua 
            : language === "ru" 
              ? blog.title_ru 
              : blog.title_en}
        </h2>
        <p>
          {language === "ua" 
            ? blog.description_ua 
            : language === "ru" 
              ? blog.description_ru 
              : blog.description_en}
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
