import React, { useState , useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../../../LanguageContext';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';
import "./AddProduct.css";
import { getBaseUrl } from '../../../../utils/baseURL';

const sizesList = [35, 36, 37, 38, 39, 40, 41, 42];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: '',
    category_ua: '',
    category_ru: '',
    category_en: '',
    season_ua: '',
    season_ru: '',
    season_en: '',
    color_ua: '',
    color_ru: '',
    color_en: '',
    price: '',
    articule: '',
    description_ua: '',
    description_ru: '',
    description_en: '',
    sizes: []  
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
  const [AddProduct, { isLoading, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const fetchSeasonUa = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsUa/get-seasons-ua`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      console.log("Fetched seasons UA:", data);

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setSeasonList(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchSeasonUa();
  }, []);

  const fetchSeasonRu = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsRu/get-seasons-ru`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      console.log("Fetched seasons RU:", data);

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setSeasonListRu(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchSeasonRu();
  }, []);

  const fetchColorsUa = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsUa/get-colors-ua`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setColorList(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchColorsUa();
  }, []);

  const fetchColorsRu = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsRu/get-colors-ru`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setColorListRu(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchColorsRu();
  }, []);

  const fetchColorsEn = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/colorsEn/get-colors-en`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");
      };

      setColorListEn(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : language === "ru"
          ? "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
          : "SOMETHING WENT WRONG WHILE LOADING"
      );
    }
  };

  useEffect(() => {
    fetchColorsEn();
  }, []);

  const fetchCategoriesUa = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/categoriesUa/get-categories-ua`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setCategoryList(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchCategoriesUa();
  }, []);

  const fetchCategoriesRu = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/categoriesRu/get-categories-ru`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : "Ошибка загрузки");
      };

      setCategoryListRu(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
      );
    }
  };

  useEffect(() => {
    fetchCategoriesRu();
  }, []);

  const fetchCategoriesEn = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/categoriesEn/get-categories-en`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");
      };

      setCategoryListEn(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : language === "ru"
          ? "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
          : "SOMETHING WENT WRONG WHILE LOADING"
      );
    }
  };

  useEffect(() => {
    fetchCategoriesEn();
  }, []);

  const fetchSeasonsEn = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/seasonsEn/get-seasons-en`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(language === "ua" ? "Помилка завантаження" : language === "ru" ? "Ошибка загрузки" : "Loading Error");
      };

      setSeasonListEn(data);
    } catch (error) {
      setMessage(language === "ua" 
        ? "ЩОСЬ НЕ ТАК ПІД ЧАС ЗАВАНТАЖЕННЯ" 
        : language === "ru"
          ? "ЧТО-ТО НЕ ТАК ПРИ ЗАГРУЗКЕ"
          : "SOMETHING WENT WRONG WHILE LOADING"
      );
    }
  };

  useEffect(() => {
    fetchSeasonsEn();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (size) => {
    const updatedSizes = product.sizes.includes(size)
      ? product.sizes.filter(s => s !== size)  
      : [...product.sizes, size];  
    setProduct({
      ...product,
      sizes: updatedSizes
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!product.name || !product.articule || !product.season_ua || !product.season_ru || !product.season_en || 
        !product.category_ua || !product.category_ru || !product.category_en || !product.price || 
        !product.description_ua || !product.description_ru || !product.description_en || 
        !product.color_ua || !product.color_ru || !product.color_en || product.sizes.length === 0) {
      alert("Please Fill All The Required Fields");
      return;
    };

    console.log("Product to be submitted:", product);
    console.log("Main image:", image);
    console.log("Other images:", otherImages);

    try {
      await AddProduct({
        ...product,
        image,
        otherImages,
        author: user?._id
      }).unwrap();
      alert("Product Added Successfully");
      setProduct({
        name: '',
        category_ua: '',
        category_ru: '',
        category_en: '',
        season_ua: '',
        season_ru: '',
        season_en: '',
        color_ua: '',
        color_ru: '',
        color_en: '',
        price: '',
        articule: '',
        description_ua: '',
        description_ru: '',
        description_en: '',
        sizes: [],
      });
      setImage('');
      setOtherImages(['', '', '', '']);
      navigate("/ua/dashboard");
    } catch (error) {
      console.log("Failed To Submit Product", error);
    };
  };

  return (
    <div className='add-product-info'>
      <h2>
        { language === "ua" ? 'ДОДАТИ НОВИЙ ПРОДУКТ' : language === "ru" ? 'ДОБАВИТЬ НОВЫЙ ПРОДУКТ' : 'ADD NEW PRODUCT' }
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput 
          label={ language === "ua" ? "Назва продукту" : language === "ru" ? "Название продукта" : "Product Name" }
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder={ language === "ua" ? 'Назва продукту' : language === "ru" ? 'Название продукта' : 'Product Name' }
        />
        <SelectInput 
          label={ language === "ua" ? "Категорія UA" : language === "ru" ? "Категория UA" : "Category UA" }
          name="category_ua"
          value={product.category_ua}
          onChange={handleChange}
          options={categoryList}
        />
        <SelectInput 
          label={ language === "ua" ? "Категорія RU" : language === "ru" ? "Категория RU" : "Category RU" }
          name="category_ru"
          value={product.category_ru}
          onChange={handleChange}
          options={categoryListRu}
        />
        <SelectInput 
          label={ language === "ua" ? "Категорія EN" : language === "ru" ? "Категория EN" : "Category EN" }
          name="category_en"
          value={product.category_en}
          onChange={handleChange}
          options={categoryListEn}
        />
        <SelectInput 
          label={ language === "ua" ? "СЕЗОН UA" : language === "ru" ? "СЕЗОН UA" : "SEASON UA" }
          name="season_ua"
          value={product.season_ua}
          onChange={handleChange}
          options={seasonList}
        />
        <SelectInput 
          label={ language === "ua" ? "СЕЗОН RU" : language === "ru" ? "СЕЗОН RU" : "SEASON RU" }
          name="season_ru"
          value={product.season_ru}
          onChange={handleChange}
          options={seasonListRu}
        />
        <SelectInput 
          label={ language === "ua" ? "СЕЗОН EN" : language === "ru" ? "СЕЗОН EN" : "SEASON EN" }
          name="season_en"
          value={product.season_en}
          onChange={handleChange}
          options={seasonListEn}
        />
        <SelectInput 
          label={ language === "ua" ? "Кольори UA" : language === "ru" ? "Цвета UA" : "Colors UA" }
          name="color_ua"
          value={product.color_ua}
          onChange={handleChange}
          options={colorList}
        />
        <SelectInput 
          label={ language === "ua" ? "Кольори RU" : language === "ru" ? "Цвета RU" : "Colors RU" }
          name="color_ru"
          value={product.color_ru}
          onChange={handleChange}
          options={colorListRu}
        />
        <SelectInput 
          label={ language === "ua" ? "Кольори EN" : language === "ru" ? "Цвета EN" : "Colors EN" }
          name="color_en"
          value={product.color_en}
          onChange={handleChange}
          options={colorListEn}
        />
        <TextInput 
          label={ language === "ua" ? "Ціна" : language === "ru" ? "Цена" : "Price" }
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        />
        <TextInput 
          label={ language === "ua" ? "Опис продукту (UA)" : language === "ru" ? "Описание продукта (UA)" : "Product Description (UA)" }
          name="description_ua"
          value={product.description_ua}
          onChange={handleChange}
          type="text"
          placeholder={ language === "ua" ? 'Опис продукту' : language === "ru" ? 'Описание продукта' : 'Product Description' }
        />
        <TextInput 
          label={ language === "ua" ? "Опис продукту (RU)" : language === "ru" ? "Описание продукта (RU)" : "Product Description (RU)" }
          name="description_ru"
          value={product.description_ru}
          onChange={handleChange}
          type="text"
          placeholder={ language === "ua" ? 'Опис продукту' : language === "ru" ? 'Описание продукта' : 'Product Description' }
        />
        <TextInput 
          label={ language === "ua" ? "Опис продукту (EN)" : language === "ru" ? "Описание продукта (EN)" : "Product Description (EN)" }
          name="description_en"
          value={product.description_en}
          onChange={handleChange}
          type="text"
          placeholder={ language === "ua" ? 'Опис продукту' : language === "ru" ? 'Описание продукта' : 'Product Description' }
        />
        <TextInput 
          label={ language === "ua" ? "Артикул" : language === "ru" ? "Артикул" : "Article" }
          name="articule"
          value={product.articule}
          onChange={handleChange}
          type="text"
          placeholder={ language === "ua" ? 'Артикул' : language === "ru" ? 'Артикул' : 'Article' }
        />
        <UploadImage 
          name="image"
          setImage={setImage}
          isMainImage={true}
        />
        {otherImages.map((image, index) => (
          <UploadImage
            key={index}
            name={`otherImage_${index}`}
            setOtherImages={setOtherImages}
            index={index}
            isMainImage={false}
          />
        ))}
        <div>
          <label>{ language === "ua" ? "Розміри" : language === "ru" ? "Размеры" : "Sizes" }</label>
          <div className="sizes-container">
            {sizesList.map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  checked={product.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className='add-product-btn'>
          { language === "ua" ? "Додати продукт" : language === "ru" ? "Добавить продукт" : "Add Product" }
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
