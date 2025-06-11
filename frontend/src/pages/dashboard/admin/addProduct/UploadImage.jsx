import React, { useState } from 'react';
import { useLanguage } from '../../../../LanguageContext';
import axios from 'axios';
import "./AddProduct.css";

const UploadImage = ({ name, setImage, setOtherImages, index, isMainImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const { language } = useLanguage();

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const uploadSingleImage = async (base64) => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:4000/api/uploadImage`, { images: [base64] });
      console.log(base64);
      const imageUrl = res.data[0];
      setUrl(imageUrl);
  
      if (isMainImage) {
        setImage(imageUrl); 
      } else {
        setOtherImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = imageUrl; 
          return updatedImages;
        });
      }
  
      alert("Image Uploaded Successfully");
    } catch (error) {
      console.error("Error Uploading Image", error);
    }
    setLoading(false);
  };  

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const base64 = await convertBase64(files[0]);
    await uploadSingleImage(base64);
  };

  return (
    <div>
      <label htmlFor={name}>
        {language === "ua" ? 'ЗАВАНТАЖИТИ ЗОБРАЖЕННЯ' : 'ЗАГРУЗИТЬ ИЗОБРАЖЕНИЕ'}
      </label>
      <input 
        type="file" 
        name={name}
        id={name}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className='add-product-uploading'>
          {language === "ua" ? 'Завантаження продукту...' : 'Загрузка продукта...'}
        </div>
      )}
      {url && (
        <div className='add-product-url'>
          <p>{language === "ua" ? 'Зображення успішно завантажено' : 'Изображение успешно загружено'}</p>
          <img src={url} alt="uploaded-image" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
