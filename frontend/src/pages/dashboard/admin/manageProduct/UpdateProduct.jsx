import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../../LanguageContext';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../addProduct/UploadImage';
import { getBaseUrl } from '../../../../utils/baseURL';

const sizesList = [35, 36, 37, 38, 39, 40, 41, 42];

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category_ua: '',
    category_ru: '',
    category_en: '',
    color_ua: '',
    color_ru: '',
    color_en: '',
    price: '',
    description_ua: '',
    description_ru: '',
    description_en: '',
    sizes: [],
  });
  const [image, setImage] = useState('');
  const [otherImages, setOtherImages] = useState(['', '', '', '']);
  const [colorList, setColorList] = useState([]);
  const [colorListRu, setColorListRu] = useState([]);
  const [colorListEn, setColorListEn] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryListRu, setCategoryListRu] = useState([]);
  const [categoryListEn, setCategoryListEn] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [seasonListRu, setSeasonListRu] = useState([]);
  const [seasonListEn, setSeasonListEn] = useState([]);
  const { language } = useLanguage();

  const fetchColorsUa = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsUa/get-colors-ua`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");

      setColorList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchColorsRu = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsRu/get-colors-ru`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");

      setColorListRu(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchColorsEn = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsEn/get-colors-en`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");

      setColorListEn(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoriesUa = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/categoriesUa/get-categories-ua`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");

      setCategoryList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoriesRu = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/categoriesRu/get-categories-ru`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");

      setCategoryListRu(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoriesEn = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/categoriesEn/get-categories-en`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");

      setCategoryListEn(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeasonsEn = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsEn/get-seasons-en`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");

      setSeasonListEn(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchColorsUa();
    fetchColorsRu();
    fetchColorsEn();
    fetchCategoriesUa();
    fetchCategoriesRu();
    fetchCategoriesEn();
    fetchSeasonsEn();
  }, [language]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${getBaseUrl()}/api/products/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network Response Was Not Ok!');
        };
        const data = await response.json();
        console.log('Fetched product data:', data);
        setProductData(data.product);
        setFormData({
          name: data.product.name || '',
          category_ua: data.product.category_ua || '',
          category_ru: data.product.category_ru || '',
          category_en: data.product.category_en || '',
          color_ua: data.product.color_ua || '',
          color_ru: data.product.color_ru || '',
          color_en: data.product.color_en || '',
          price: data.product.price || '',
          description_ua: data.product.description_ua || '',
          description_ru: data.product.description_ru || '',
          description_en: data.product.description_en || '',
          sizes: data.product.sizes || [],
        });
        setImage(data.product.image || '');
        setOtherImages(data.product.otherImages || ['', '', '', '']);
      } catch (error) {
        console.error('Error Fetching Product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (size) => {
    const updatedSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    setFormData({
      ...formData,
      sizes: updatedSizes,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.category_ua || !formData.category_ru || !formData.category_en || 
        !formData.price || !formData.description_ua || !formData.description_ru || !formData.description_en || 
        !formData.color_ua || !formData.color_ru || !formData.color_en || formData.sizes.length === 0) {
      alert("Please fill all the required fields");
      return;
    };

    try {
      const updatedProduct = {
        ...formData,
        image,
        otherImages,
      };

      console.log("Updated Product before sending:", updatedProduct);

      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);
      if (!token) {
        alert('You are not authenticated!');
        navigate("/ua/login"); 
        return;
      };

      const response = await fetch(`${getBaseUrl()}/api/products/update-product/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      };

      const responseData = await response.json();
      console.log('Response from backend:', responseData);

      alert("Product updated successfully");
      setProductData(responseData.product);
      navigate("/ua/dashboard/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
    };
  };

  return (
    <div className="update-product-info">
      <h2>{ language === "ua" ? "Оновити продукт" : language === "ru" ? "Обновить продукт" : "Update Product" }</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label={language === "ua" ? "Назва продукту" : language === "ru" ? "Название продукта" : "Product Name"}
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder={language === "ua" ? "Назва продукту" : language === "ru" ? "Название продукта" : "Product Name"}
        />
        <SelectInput
          label={language === "ua" ? "Категорія UA" : language === "ru" ? "Категория UA" : "Category UA"}
          name="category_ua"
          value={formData.category_ua}
          onChange={handleChange}
          options={categoryList}
        />
        <SelectInput
          label={language === "ua" ? "Категорія RU" : language === "ru" ? "Категория RU" : "Category RU"}
          name="category_ru"
          value={formData.category_ru}
          onChange={handleChange}
          options={categoryListRu}
        />
        <SelectInput
          label={language === "ua" ? "Категорія EN" : language === "ru" ? "Категория EN" : "Category EN"}
          name="category_en"
          value={formData.category_en}
          onChange={handleChange}
          options={categoryListEn}
        />
        <SelectInput
          label={language === "ua" ? "Кольори UA" : language === "ru" ? "Цвета UA" : "Colors UA"}
          name="color_ua"
          value={formData.color_ua}
          onChange={handleChange}
          options={colorList}
        />
        <SelectInput
          label={language === "ua" ? "Кольори RU" : language === "ru" ? "Цвета RU" : "Colors RU"}
          name="color_ru"
          value={formData.color_ru}
          onChange={handleChange}
          options={colorListRu}
        />
        <SelectInput
          label={language === "ua" ? "Кольори EN" : language === "ru" ? "Цвета EN" : "Colors EN"}
          name="color_en"
          value={formData.color_en}
          onChange={handleChange}
          options={colorListEn}
        />
        <TextInput
          label={language === "ua" ? "Ціна" : language === "ru" ? "Цена" : "Price"}
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        />
        <TextInput
          label={language === "ua" ? "Опис продукту (UA)" : language === "ru" ? "Описание продукта (UA)" : "Product Description (UA)"}
          name="description_ua"
          value={formData.description_ua}
          onChange={handleChange}
          type="text"
          placeholder={language === "ua" ? "Опис продукту" : language === "ru" ? "Описание продукта" : "Product Description"}
        />
        <TextInput
          label={language === "ua" ? "Опис продукту (RU)" : language === "ru" ? "Описание продукта (RU)" : "Product Description (RU)"}
          name="description_ru"
          value={formData.description_ru}
          onChange={handleChange}
          type="text"
          placeholder={language === "ua" ? "Опис продукту" : language === "ru" ? "Описание продукта" : "Product Description"}
        />
        <TextInput
          label={language === "ua" ? "Опис продукту (EN)" : language === "ru" ? "Описание продукта (EN)" : "Product Description (EN)"}
          name="description_en"
          value={formData.description_en}
          onChange={handleChange}
          type="text"
          placeholder={language === "ua" ? "Опис продукту" : language === "ru" ? "Описание продукта" : "Product Description"}
        />
        <UploadImage
          name="image"
          setImage={setImage}
          image={image}
          isMainImage={true}
        />
        {otherImages.map((image, index) => (
          <UploadImage
            key={index}
            name={`otherImage_${index}`}
            setOtherImages={setOtherImages}
            index={index}
            image={image}
            isMainImage={false}
          />
        ))}
        <div>
          <label>{language === "ua" ? "Розміри" : language === "ru" ? "Размеры" : "Sizes"}</label>
          <div className="sizes-container">
            {sizesList.map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="update-product-btn">
          {language === "ua" ? "Оновити продукт" : language === "ru" ? "Обновить продукт" : "Update Product"}
        </button>
      </form>
    </div>
  )
}

export default UpdateProduct
