import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../../LanguageContext';
import { useEditProfileMutation } from '../../../redux/features/auth/authApi';
import avatarImg from '../../../assets/avatarImg.jpg';
import { setUser } from '../../../redux/features/auth/authSlice';
import "./UserProfile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, {isLoading, isError, error, isSuccess}] = useEditProfileMutation();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    email: '',
    address: '',
    phone: '',
    userId: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || '',
        profileImage: user?.profileImage || '',
        email: user?.email || '',
        address: user?.address || '',
        phone: user?.phone || '',
        userId: user._id || ''
      })
    }
  }, [user]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      userId: formData.userId
    };
    try {
      const response = await editProfile(updatedUser).unwrap();
      dispatch(setUser(response.user));
      localStorage.setItem('user', JSON.stringify(response.user));
    } catch (error) {
      console.error("Failed To Update Profile", error);
      alert("Failed To Update Profile. Please Try Again!");
    };
    setIsModalOpen(false);
  };

  return (
    <div className='user-profile'>
      <div className='user-profile-info'>
        <div>
          <img src={formData.profileImage || avatarImg} alt="" className='form-data-info' />
        </div>
        <div className='user-profile-data'>
          <h3>
            { language === "ua" ? 'Ім\'я користувача: ' : language === "en" ? 'Username: ' : 'Имя пользователя: ' } {formData?.username || 'N/A'}
          </h3>
          <p>
            { language === "ua" ? 'Електронна пошта: ' : language === "en" ? 'Email: ' : 'Электронная почта: ' } {formData?.email || 'N/A'}
          </p>
          <p>
            { language === "ua" ? 'Адреса: ' : language === "en" ? 'Address: ' : 'Адрес: ' } {formData?.address || 'N/A'}
          </p>
          <p>
            { language === "ua" ? 'Телефон: ' : language === "en" ? 'Phone: ' : 'Телефон: ' } {formData?.phone || 'N/A'}
          </p>
          <button onClick={() => setIsModalOpen(true)} className='user-profile-button'>
            { language === "ua" ? 'Редагувати' : language === "en" ? 'Edit' : 'Редактировать' }
          </button>
        </div>
      </div>
      {
        isModalOpen && (
          <div className='user-profile-modal'>
            <div className='user-profile-modal-more'>
              <button onClick={() => setIsModalOpen(false)} className='user-profile-modal-button'>
                <i className='ri-close-line user-profile-modal-nice'></i>
              </button>
              <h2 className='user-edit-profile'>
                { language === "ua" ? 'Редагувати профіль: ' : language === "en" ? 'Edit Profile: ' : 'Редактировать профиль: ' }
              </h2>
              <form onSubmit={handleSubmit}>
                <div className='user-profile-edit'>
                  <label 
                    htmlFor="username"
                    className="user-profile-form-info"
                  >
                    { language === "ua" ? 'Ім\'я користувача' : language === "en" ? 'Username' : 'Имя пользователя' }
                  </label>
                  <input 
                    type="text"
                    name='username'
                    value={formData?.username}
                    onChange={handleChange}
                    placeholder={ language === "ua" ? 'Ім\'я користувача' : language === "en" ? 'Username' : 'Имя пользователя' }
                    className='user-profile-form-input'
                    required
                  />
                </div>
                <div className='user-profile-edit'>
                  <label 
                    htmlFor="profileImage"
                    className="user-profile-form-info"
                  >
                    { language === "ua" ? 'URL зображення профілю' : language === "en" ? 'Profile Image URL' : 'URL изображения профиля' }
                  </label>
                  <input 
                    type="text"
                    name='profileImage'
                    value={formData?.profileImage}
                    onChange={handleChange}
                    placeholder={ language === "ua" ? 'URL зображення профілю' : language === "en" ? 'Profile Image URL' : 'URL изображения профиля' }
                    className='user-profile-form-input'
                    required
                  />
                </div>
                <div className='user-profile-edit'>
                  <label 
                    htmlFor="email"
                    className="user-profile-form-info"
                  >
                    { language === "ua" ? 'Електронна пошта' : language === "en" ? 'Email' : 'Электронная почта' }
                  </label>
                  <input 
                    type="text"
                    name='email'
                    value={formData?.email}
                    onChange={handleChange}
                    placeholder={ language === "ua" ? 'Електронна пошта' : language === "en" ? 'Email' : 'Электронная почта' }
                    className='user-profile-form-input'
                  />
                </div>
                <div className='user-profile-edit'>
                  <label 
                    htmlFor="address"
                    className="user-profile-form-info"
                  >
                    { language === "ua" ? 'Адреса' : language === "en" ? 'Address' : 'Адрес' }
                  </label>
                  <input 
                    type="text"
                    name='address'
                    value={formData?.address}
                    onChange={handleChange}
                    placeholder={ language === "ua" ? 'Адреса' : language === "en" ? 'Address' : 'Адрес' }
                    className='user-profile-form-input'
                    required
                  />
                </div>
                <div className='user-profile-edit'>
                  <label 
                    htmlFor="phone"
                    className="user-profile-form-info"
                  >
                    { language === "ua" ? 'Телефон' : language === "en" ? 'Phone' : 'Телефон' }
                  </label>
                  <input 
                    type="text"
                    name='phone'
                    value={formData?.phone}
                    onChange={handleChange}
                    placeholder={ language === "ua" ? 'Телефон' : language === "en" ? 'Phone' : 'Телефон' }
                    className='user-profile-form-input'
                    required
                  />
                </div>
                <button 
                  className={`user-save-changes ${isLoading ? 'user-save-changes-element' : ''}`}
                  type='submit'
                  disabled={isLoading}  
                >
                  { isLoading ? ( language === "ua" ? 'Збереження...' : language === "en" ? 'Saving...' : 'Сохранение...') : (language === "ua" ? 'Зберегти зміни' : language === "en" ? 'Save Changes' : 'Сохранить изменения')}
                </button>
                {isError && <p className='user-save-changes-error'>{ language === "ua" ? 'Не вдалося оновити профіль. Спробуйте ще раз!' : language === "en" ? 'Failed to update profile. Please try again!' : 'Не удалось обновить профиль. Пожалуйста, попробуйте снова!' }</p>}
                {isSuccess && <p className='user-save-changes-success'>{ language === "ua" ? 'Профіль успішно оновлено!' : language === "en" ? 'Profile updated successfully!' : 'Профиль успешно обновлен!' }</p>}
              </form>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UserProfile;
