import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import UploadImage from '../addProduct/UploadImage'; 
import "./addBlogs.css";

const AddBlogs = () => {
  const { language } = useLanguage('');
  
  const [formData, setFormData] = useState({
    title_ua: '',
    title_ru: '',
    title_en: '',
    description_ua: '',
    description_ru: '',
    description_en: '',
    image: '' 
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/blogs/');
        const data = await response.json();
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error('Error Fetching Blogs:', error);
      };
    };

    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/blogs/post-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Blog Add Successfully");
        setBlogs((prevBlogs) => [...prevBlogs, data]);
      } else {
        alert(`Error: ${data.message}`);
      };
    } catch (error) {
      console.error("Error Submitting Blog:", error);
      alert("There Was An Error Submitting Your Blog");
    }
  };

  const setImage = (url) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== blogId));
        alert("Blog Deleted Successfully");
      } else {
        const data = await response.json();
        alert(`Error ${data.message}`);
      };
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting the blog');
    }
  };

  return (
    <div className="add-blogs">
      <h1>
        { language === "ua" ? 'ДОДАТИ БЛОГ' : 'ДОБАВИТЬ БЛОГ' }
      </h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title_ua" 
          className="add-blog-input"
          placeholder="Title Ua" 
          value={formData.title_ua} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="title_ru" 
          className="add-blog-input"
          placeholder="Title Ru" 
          value={formData.title_ru} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="text" 
          name="title_en" 
          className="add-blog-input"
          placeholder="Title En" 
          value={formData.title_en} 
          onChange={handleChange} 
          required 
        />
        <br />
        <textarea 
          name="description_ua" 
          className="add-blog-input"
          placeholder="Description Ua" 
          value={formData.description_ua} 
          onChange={handleChange} 
          required 
        />
        <br />
        <textarea 
          name="description_ru" 
          className="add-blog-input"
          placeholder="Description Ru" 
          value={formData.description_ru} 
          onChange={handleChange} 
          required 
        />
        <br />
        <textarea 
          name="description_en" 
          className="add-blog-input"
          placeholder="Description En" 
          value={formData.description_en} 
          onChange={handleChange} 
          required 
        />
        <br />
        <UploadImage 
          name="image" 
          setImage={setImage} 
          isMainImage={true} 
        />

        <button type="submit" className='add-blog-button'>
          { language === "ua" ? 'ДОДАТИ' : 'ДОБАВИТЬ' }
        </button>

        <table className="blogs-table">
          <thead>
            <tr>
              <th>{ language === "ua" ? 'Назва (UA)' : language === "ru" ? 'Название (RU)' : 'Title (UA)' }</th>
              <th>{ language === "ua" ? 'Назва (RU)' : language === "ru" ? 'Название (RU)' : 'Title (RU)' }</th>
              <th>{ language === "ua" ? 'Назва (EN)' : language === "ru" ? 'Название (EN)' : 'Title (EN)' }</th>
              <th>{ language === "ua" ? 'Опис (UA)' : language === "ru" ? 'Описание (UA)' : 'Description (UA)' }</th>
              <th>{ language === "ua" ? 'Опис (RU)' : language === "ru" ? 'Описание (RU)' : 'Description (RU)' }</th>
              <th>{ language === "ua" ? 'Опис (EN)' : language === "ru" ? 'Описание (EN)' : 'Description (EN)' }</th>
              <th>{ language === "ua" ? 'Зображення' : language === "ru" ? 'Изображение' : 'Image' }</th>
              <th>{ language === "ua" ? 'Дії' : language === "ru" ? 'Действия' : 'Actions' }</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.blogId}>
                <td>{blog.title_ua}</td>
                <td>{blog.title_ru}</td>
                <td>{blog.title_en}</td>
                <td>{blog.description_ua}</td>
                <td>{blog.description_ru}</td>
                <td>{blog.description_en}</td>
                <td>{blog.image && <img src={blog.image} alt="blog" className="blog-image" />}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(blog._id)} 
                    className="delete-blog-button"
                  >
                    { language === "ua" ? 'ВИДАЛИТИ' : language === "ru" ? 'УДАЛИТЬ' : 'DELETE' }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddBlogs;
