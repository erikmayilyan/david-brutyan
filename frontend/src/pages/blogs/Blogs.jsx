import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';
import "./Blogs.css";
import { getBaseUrl } from '../../utils/baseURL';

const Blogs = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const API_URL = `${getBaseUrl()}/api/blogs`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Function to truncate description
  const truncateText = (text, maxLength = 100) => {
    if (!text) return ''; // Return empty string if text is undefined or null
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className='blogs'>
      <h2 className='blogs-title'>
        { language === "ua" 
          ? 'ОСТАННІ БЛОГИ' 
          : language === "ru"
            ? 'ПОСЛЕДНИЕ БЛОГИ'
            : 'LATEST BLOGS' }
      </h2>
      <p>
        { language === "ua" 
          ? 'ДІЗНАЙТЕСЯ ВСІ НОВИНИ У НАШОМУ РОЗДІЛІ БЛОГІВ' 
          : language === "ru"
            ? 'УЗНАЙТЕ ВСЕ НОВОСТИ В НАШЕМ РАЗДЕЛЕ БЛОГОВ'
            : 'DISCOVER ALL THE NEWS IN OUR BLOG SECTION' }
      </p>
      <div className='blog-post'>
        {
          blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link 
                key={blog._id} 
                to={language === "ua" 
                  ? `/ua/blogs/${blog._id}` 
                  : language === "ru"
                    ? `/iv/blogs/${blog._id}`
                    : `/en/blogs/${blog._id}`} 
                className="blog-card"
              >
                <img src={blog.image} alt="blog image" className='blog-image' />
                <div className='blog-card-content'>
                  <h4>
                    {language === "ua" 
                      ? blog.title_ua 
                      : language === "ru" 
                        ? blog.title_ru 
                        : blog.title_en || blog.title_ru} {/* Fallback to Russian if English is not available */}
                  </h4>
                  <p>
                    {language === "ua" 
                      ? truncateText(blog.description_ua) 
                      : language === "ru" 
                        ? truncateText(blog.description_ru) 
                        : truncateText(blog.description_en) || truncateText(blog.description_ru)} {/* Fallback to Russian if English is not available */}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>{language === "ua" ? 'Немає доступних блогів' : language === "ru" ? 'Нет доступных блогов' : 'No blogs available'}</p>
          )
        }
      </div>
    </div>
  );
};

export default Blogs;
